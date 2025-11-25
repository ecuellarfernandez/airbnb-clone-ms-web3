
import subprocess
import os
import sys
import signal


tech_stack = {
    "django": {
        "start_command" : "python manage.py runserver",
        "kafka_consumer" : "python manage.py run_kafka_consumer"
    }
}

class Microservice:
    def __init__(self, name, command=None, folder=None, tech="django", port=None):
        self.name = name
        self.command = command
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

def signal_handler(sig, frame):
    print("Shutting down services...")
    for process in processes:
        process.terminate()
    sys.exit(0)

for service in microservices:
    if service.tech in tech_stack:
        start_command = tech_stack[service.tech]["start_command"]
        process = subprocess.Popen(start_command, shell=True, cwd=service.folder)
        processes.append(process)

signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)
print("Services Up. Press Ctrl+C to stop.")
signal.pause()

