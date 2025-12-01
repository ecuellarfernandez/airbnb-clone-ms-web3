
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import render
import datetime

from rest_framework.routers import DefaultRouter

from application_layer.commands.SendTestEventCommand import SendTestEventCommand
from domain_layer.events.event_data import EventData

from domain_layer.enums.event_enums import Events
from domain_layer.enums.topic_enums import Topics


def send_test_event_view(request : HttpRequest):
    if request.method == "POST":
        test_event_data = EventData(
            topic_name=Topics.PAYMENT_EVENTS.value,
            event_name=Events.TEST_EVENT.value,
            event_value={
                "message" : "THis is a test message from Payments",
                "timestamp" : str(datetime.datetime.now()),
            }
        )

        send_test_event_command = SendTestEventCommand()
        success = send_test_event_command.execute(test_event_data.__dict__)

        if success:
            return JsonResponse({"status": "success", "message": "Test event sent successfully"})
        else:
            return JsonResponse({"status": "error", "message": "Failed to send test event"}, status=500)
    else:
        return JsonResponse({"status": "error", "message": "Invalid request method"}, status=400)