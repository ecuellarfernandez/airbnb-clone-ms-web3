

class PagedResponse[T]:
    def __init__(self, success: bool = False, message: str = "", data: list[T] = [], total_pages: int = 0, current_page: int = 0):
        self.success = success
        self.message = message
        self.data = data
        self.total_items = len(data) if data is not None else 0
        self.total_pages = total_pages
        self.current_page = current_page