

from rest_framework.pagination import PageNumberPagination

from payments.dtos.paged_response import PagedResponse


class PaymentsPagination(PageNumberPagination):
    page_size_query_param = 'page_size'
    max_page_size = 100
    page_query_param = 'current_page'

    def get_paginated_response(self, data):
        pagedResponse = PagedResponse(
            success=True,
            data=data,
            message="Payments retrieved",
            current_page=self.page.number,
            total_pages=self.page.paginator.num_pages
        )