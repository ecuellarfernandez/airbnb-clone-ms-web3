from typing import TypeVar, Generic

T = TypeVar('T')

class StandardResponse(Generic[T]):
    def __init__(self, success: bool = False, message: str = "", data : T = None):
        self.success = success
        self.message = message
        self.data = data
