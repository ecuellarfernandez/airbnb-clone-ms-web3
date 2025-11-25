
import subprocess
import os
import sys
import signal
import threading


tech_stack = {
    "django": {
        "scripts" : [
            "python manage.py runserver", 
            "python manage.py run_kafka_consumer"
        ],
        "venv_path" : "venv",
        "venv_creation_command" : "python -m venv venv",
        "venv_activation_command" : "venv/Scripts/activate"
    }
}

class Microservice:
    def __init__(self, name, folder=None, tech="django", port=None):
        self.name = name
        self.folder = folder
        self.process = None
        self.tech = tech
        self.port = port

microservices = [
    Microservice("Identity", folder="./services/identity", tech="springboot"),
    Microservice("Payments", folder="./services/payments", tech="django"),
    Microservice("Admin", folder="./services/admin", tech="django")
]


processes = []

def stream_output(proc, name):
    """Read subprocess stdout line-by-line and print with a prefix."""
    try:
        if proc.stdout is None:
            return
        # Read lines until EOF
        for line in iter(proc.stdout.readline, ''):
            if not line:
                break
            print(f"[{name}] {line.rstrip()}", flush=True)
    except Exception:
        pass
    finally:
        try:
            proc.stdout.close()
        except Exception:
            pass


def check_and_setup_venv(service, tech_info):
    venv_path = os.path.join(service.folder, tech_info["venv_path"])
    if not os.path.exists(venv_path):
        print(f"Creating virtual environment for {service.name}...")
        subprocess.run(tech_info["venv_creation_command"], shell=True, cwd=service.folder)
    # Return the path to the venv's Python executable so we can run scripts directly.
    venv_python = os.path.join(venv_path, "Scripts", "python.exe")
    return venv_python

def signal_handler(sig, frame):
    print("Shutting down services...")
    for process in processes:
        try:
            process.terminate()
        except Exception:
            pass
    # Notify the main thread (or waiter) to exit
    try:
        stop_event.set()
    except Exception:
        pass
    # Exit process
    sys.exit(0)

for service in microservices:
    if service.tech in tech_stack:
        if service.tech == "django":
            tech_info = tech_stack[service.tech]
            venv_python = check_and_setup_venv(service, tech_info)
            for script in tech_info["scripts"]:
                # If the script starts with 'python', replace it with the venv python executable.
                if script.strip().startswith("python "):
                    parts = script.strip().split()
                    # parts[0] == 'python', rest are args (e.g. ['manage.py', 'runserver'])
                    cmd = [venv_python] + parts[1:]
                else:
                    # Fallback: run the script via shell (rare in our current config)
                    cmd = script

                print(f"Executing command: {cmd}");
                print(f"Starting {service.name} with command: {cmd}")

                # Start process and stream its stdout/stderr
                if isinstance(cmd, list):
                    process = subprocess.Popen(
                        cmd,
                        cwd=service.folder,
                        stdout=subprocess.PIPE,
                        stderr=subprocess.STDOUT,
                        text=True
                    )
                else:
                    process = subprocess.Popen(
                        cmd,
                        shell=True,
                        cwd=service.folder,
                        stdout=subprocess.PIPE,
                        stderr=subprocess.STDOUT,
                        text=True
                    )

                t = threading.Thread(target=stream_output, args=(process, service.name), daemon=True)
                t.start()
                processes.append(process)

signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

# Cross-platform waiter: signal.pause() is not available on Windows.
# Use a threading.Event to block until a signal handler sets it.
stop_event = threading.Event()

print("Services Up. Press Ctrl+C to stop.")
try:
    # Block here until stop_event is set by the signal handler
    stop_event.wait()
except KeyboardInterrupt:
    # Fallback in case KeyboardInterrupt is raised directly
    for process in processes:
        try:
            process.terminate()
        except Exception:
            pass
    signal_handler(signal.SIGINT, None)

