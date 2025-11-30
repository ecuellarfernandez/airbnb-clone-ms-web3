import subprocess
import os
import sys
import signal
import threading

# --- Configuration ---
tech_stack = {
    "django": {
        "scripts" : [
            "python manage.py runserver", 
            "python manage.py run_kafka_consumer"
        ],
        "venv_path" : "venv",
        "venv_creation_command" : "python -m venv venv",
        "install_command" : "pip install -r requirements.txt"
    }
}

class Microservice:
    def __init__(self, name, folder=None, tech="django", port=None):
        self.name = name
        self.folder = folder
        self.process = None
        self.tech = tech
        self.port = port

# NOTE: Identity (springboot) will be skipped as it's not in tech_stack
microservices = [
    Microservice("Identity", folder="./services/identity", tech="springboot"),
    Microservice("Payments", folder="./services/payments", tech="django"),
    Microservice("Admin", folder="./services/admin", tech="django")
]

# --- Global State ---
processes = []
#tells when the main thread shall be killed
stop_event = threading.Event()

# Signal para terminar los procesos
if os.name == 'nt':
    CTRL_SIGNAL = signal.CTRL_C_EVENT
    print("The signal es: ", CTRL_SIGNAL)
else:
    CTRL_SIGNAL = signal.CTRL_C_EVENT


# --- Functions ---

def stream_output(proc, name):
    """Read subprocess stdout line-by-line and print with a prefix."""
    threading.current_thread().name = f"StreamThread-{name}"
    try:
        while True:
            line = proc.stdout.readline()
            if not line:
                break
            # Using sys.stdout.write for minimal latency
            sys.stdout.write(f"[{name}] {line.rstrip()}\n")
            sys.stdout.flush()
    except Exception as e:
        # Expected exception when the process/pipe is closed during shutdown
        if "Bad file descriptor" not in str(e):
             print(f"[{name} Stream Error] {e}")
    finally:
        try:
            proc.stdout.close()
        except Exception:
            pass


def check_and_setup_venv(service, tech_info):
    """Checks for VENV and creates it if missing. Returns venv Python path."""
    venv_path = os.path.join(service.folder, tech_info["venv_path"])

    # 1. Check/Create VENV folder
    if not os.path.exists(venv_path):
        print(f"Creating virtual environment for {service.name} in {venv_path}...")
        try:
            # shell=True is needed here for the "python -m venv" command to work reliably
            subprocess.run(
                tech_info["venv_creation_command"], 
                shell=True, 
                cwd=service.folder, 
                check=True # Raise an exception if the command fails
            )
            print(f"VENV created for {service.name}.")
        except subprocess.CalledProcessError as e:
            print(f"ERROR: VENV creation failed for {service.name}. Error: {e}")
            sys.exit(1)

    # 2. Return the VENV Python executable path (Windows specific: Scripts/python.exe)
    venv_python = os.path.join(venv_path, "Scripts", "python.exe")
    if not os.path.exists(venv_python):
        print(f"ERROR: VENV Python executable not found at {venv_python}. Exiting.")
        sys.exit(1)

    
    install_cmd_parts = tech_info["install_command"].split()

    venv_pip = os.path.join(venv_path, "Scripts", "pip.exe")
    install_cmd = [venv_pip] + install_cmd_parts[1:]

    print(f"[DEBUG] Installing dependencies for {service.name}...")
    
    try:
        subprocess.run(
            install_cmd, 
            cwd=service.folder, 
            check=True, 
            capture_output=True, # Capture output to keep terminal clean
            text=True
        )
        print(f"Dependencies installed successfully for {service.name}.")
    except subprocess.CalledProcessError as e:
        print(f"ERROR: Dependency installation failed for {service.name}.")
        print(f"Command: {' '.join(install_cmd)}")
        print(f"STDOUT: {e.stdout}")
        print(f"STDERR: {e.stderr}")
        sys.exit(1)
        
    return venv_python

def signal_handler(sig, frame):
    """Handles SIGINT/SIGTERM for graceful shutdown."""
    if stop_event.is_set():
        #If Ctrl + C already pressde
        return

    print("\n\n*** Shutting down services... ***")
    
    for process in processes:
        if process.poll() is None: 
            print(f"Terminating PID {process.pid}...")
            try:
                #soft kill
                process.terminate() 
            except ProcessLookupError:
                pass # Process is already gone
            except Exception as e:
                print(f"Warning: process.terminate() failed ({e}). Falling back to os.kill.")
                try:
                    os.kill(process.pid, CTRL_SIGNAL)
                except Exception as e_kill:
                    print(f"Warning: Could not os.kill PID {process.pid}: {e_kill}")
    # Wait for processes to exit after termination signal
    for process in processes:
        try:
            process.wait(timeout=5) # Wait up to 5 seconds
        except subprocess.TimeoutExpired:
            print(f"PID {process.pid} did not terminate in time. Killing...")
            process.kill()
        except Exception:
            pass # Process already died or lookup error

    # Notify the main thread to exit
    stop_event.set()
    sys.exit(0)


# --- Main Execution ---

if __name__ == "__main__":
    # Register signal handler
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

    for service in microservices:
        if service.tech in tech_stack:
            tech_info = tech_stack[service.tech]
            
            # 1. Prepare VENV and get Python executable path
            venv_python = check_and_setup_venv(service, tech_info)
            
            # 2. Execute all related scripts for this service
            for script in tech_info["scripts"]:
                # Construct a descriptive name for the running process
                script_name = script.split()[1] if len(script.split()) > 1 else script
                proc_name = f"{service.name}-{script_name}"
                
                # Command construction: [venv_python, 'manage.py', 'runserver', ...]
                parts = script.strip().split()
                cmd = [venv_python] + parts[1:]

                print(f"\n[{proc_name}] Starting with command: {' '.join(cmd)}")

                try:
                    process = subprocess.Popen(
                        cmd,
                        cwd=service.folder,
                        stdout=subprocess.PIPE,
                        stderr=subprocess.STDOUT, # Merge stdout and stderr
                        text=True,
                        # Crucial for robust shutdown on Windows
                        creationflags=subprocess.CREATE_NEW_PROCESS_GROUP
                    )
                    
                    # Start background thread to stream output
                    t = threading.Thread(target=stream_output, args=(process, proc_name), daemon=True)
                    t.start()
                    processes.append(process)

                except Exception as e:
                    print(f"ERROR: Failed to start {proc_name}. Check paths and commands. Error: {e}")
                    continue 

        else:
            print(f"Skipping {service.name}: Tech stack '{service.tech}' not configured.")


    # --- Waiter ---
    print("\n" + "="*50)
    print("All configured services are running.")
    print("Press **Ctrl+C** to stop all services gracefully.")
    print("="*50)

    try:

        while not stop_event.is_set():
            stop_event.wait(timeout=0.1) 
            
    except KeyboardInterrupt:
        # This handles the interrupt if it is successfully delivered while polling
        signal_handler(signal.SIGINT, None)
    finally:
        # Final cleanup safety net
        if not stop_event.is_set():
            signal_handler(signal.SIGINT, None)