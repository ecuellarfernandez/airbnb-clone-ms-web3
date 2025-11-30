
from abc import ABC, abstractmethod

class CommandInterface(ABC):
    @abstractmethod
    def execute(self):
        """Execute the command."""
        pass