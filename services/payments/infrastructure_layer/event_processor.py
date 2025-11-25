import json

from infrastructure_layer.services.event_router import EventRouter
from application_layer.application_layer.global_event_registration import global_event_registration


class EventProcessor:

    def __init__(self):
        self.event_router = EventRouter()

    def handle_event(self, topic_name : str, event_name : str, event_value : dict):
        print(f"[EVENT PROCESSOR] Starting event handling: '{event_name}' from topic '{topic_name}'")
        if topic_name not in self.event_router.registry:
            print (f"[EVENT PROCESSOR] No handlers registered for topic '{topic_name}'")
        handler = self.event_router.registry[topic_name][event_name]
        if handler is not None:
            print(f"[EVENT PROCESSOR] processing event '{event_name}' from topic '{topic_name}' to handler '{handler.__class__.__name__}'")
            handler.execute(event_value)


event_processor = EventProcessor()
global_event_registration(event_processor)