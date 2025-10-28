
from rest_framework.serializers import Serializer
from ..dtos.paged_response import PagedResponse
from ..dtos.standard_response import StandardResponse

class PagedResponseSerializer(Serializer):
    class Meta:
        model = PagedResponse
        fields = ['success', 'message', 'data', 'total_items', 'total_pages', 'current_page']


class StandardResponseSerializer(Serializer):
    class Meta:
        model = StandardResponse
        fields = ['success', 'message', 'data']