
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import render
import datetime

from rest_framework.routers import DefaultRouter

from application_layer.commands.SendTestEventCommand import SendTestEventCommand

def send_test_event_view(request : HttpRequest):
    if request.method == "POST":
        test_event_data = {
            "message": "This is a test event",
            "timestamp": str(datetime.datetime.now())
        }

        send_test_event_command = SendTestEventCommand()
        success = send_test_event_command.execute(test_event_data)

        if success:
            return JsonResponse({"status": "success", "message": "Test event sent successfully"})
        else:
            return JsonResponse({"status": "error", "message": "Failed to send test event"}, status=500)
    else:
        return JsonResponse({"status": "error", "message": "Invalid request method"}, status=400)