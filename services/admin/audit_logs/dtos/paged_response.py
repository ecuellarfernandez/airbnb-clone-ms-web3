class PagedResponse[T]:
    def __init__(self, success: bool = False, message: str = "", data: list[T] = None, total_pages: int = 0, current_page: int = 0):
        self.success = success
        self.message = message
        self.data = data if data is not None else []
        self.total_items = len(self.data)
        self.total_pages = total_pages
        self.current_page = current_page