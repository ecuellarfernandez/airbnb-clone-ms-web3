import typing

from domain_layer.events.event_data import EventData
from domain_layer.events.event_handler import EventHandlerInterface
from domain_layer.services.event_router_interface import EventRouterInterface

from typing import Dict

"""
    RouterConfig Type Definition
    { topic_name : { event_name : EventHandler } }
"""
RouterConfig = Dict[str, Dict[str, EventHandlerInterface]]

class EventRouter(EventRouterInterface):

    registry: RouterConfig = {}

    @classmethod
    def register_event(self, topic_name : str, event_name : str, handler : EventHandlerInterface):
        if topic_name not in self.registry:
            self.registry[topic_name] = {}

        self.registry[topic_name][event_name] = handler
        print(f"[EVENT ROUTER] Registered handler for topic: {topic_name}, event: {event_name}")

    @classmethod
    def dispatch_event(self, event_data : EventData):
        print("TO IMPLEMENT: EventRouter.dispatch_event")