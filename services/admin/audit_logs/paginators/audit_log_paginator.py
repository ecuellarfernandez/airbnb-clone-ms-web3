from rest_framework.pagination import PageNumberPagination

from audit_logs.dtos.paged_response import PagedResponse

from rest_framework.response import Response


class AuditLogResponsePaginator(PageNumberPagination):
    page_size_query_param = 'page_size'
    max_page_size = 100
    page_query_param = 'current_page'

    def get_paginated_response(self, data):
        pagedResponse =  PagedResponse(
            success=True,
            message="Audit Logs retrieved.",
            data=data,
            current_page=self.page.number,
            total_pages=self.page.paginator.num_pages
        )
        return Response(pagedResponse)