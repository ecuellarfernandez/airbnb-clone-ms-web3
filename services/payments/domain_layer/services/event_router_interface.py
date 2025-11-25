
from abc import ABC, abstractmethod

from domain_layer.events.event_data import EventData

class EventRouterInterface(ABC):

    @abstractmethod
    def register_event(self, topic_name : str, event_name : str, handler_function):
        """Registers an event handler for a specific topic and event name."""
        pass

    @abstractmethod
    def dispatch_event(self, event_data : EventData):
        """Dispatches the event to the appropriate handler based on the topic and event name."""
        pass