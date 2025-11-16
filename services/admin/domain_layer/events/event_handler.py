
from abc import ABC, abstractmethod

from domain_layer.events.event_data import EventData


class EventHandlerInterface(ABC):
    @abstractmethod
    def execute(self, event_data : EventData):
        """Handles an incoming event based on its topic and value."""
        pass