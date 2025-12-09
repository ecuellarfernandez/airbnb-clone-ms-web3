from rest_framework import permissions, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.db.models import Q

from application_layer.decorators.security.security_decorators import needs_roles
from ..models import AuditLog
from ..paginators.audit_log_paginator import AuditLogResponsePaginator
from ..serializers.audit_log_serializers import AuditLogSerializer
from ..dtos.paged_response import PagedResponse
from ..dtos.standard_response import StandardResponse

class AuditLogViewSet(viewsets.ModelViewSet):
    queryset = AuditLog.objects.all().order_by('-action_timestamp')
    serializer_class = AuditLogSerializer
    permission_classes = [permissions.AllowAny]

    pagination_class = AuditLogResponsePaginator

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        data_serializer = self.get_serializer(instance)

        # Manually wrap the serialized data
        resp = StandardResponse(
            success=True,
            message="Audit Log retrieved.",
            data=data_serializer.data
        )
        return Response(resp.__dict__, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        # Wrap the created object's serialized data
        resp = StandardResponse(
            success=True,
            message="Audit Log created.",
            data=self.get_serializer(instance).data
        )
        return Response(resp.__dict__, status=status.HTTP_201_CREATED)

    @needs_roles(['ADMIN'])
    @action(detail=False, methods=['get'])
    def get_by_id(self, request):
        log_id = request.query_params.get('id', None)
        if log_id is not None:
            try:
                audit_log = AuditLog.objects.get(id=log_id)
                serializer = self.get_serializer(audit_log)

                # Wrap success response
                response = StandardResponse(data=serializer.data, success=True, message="Log found.")
                return Response(response.__dict__)
            except AuditLog.DoesNotExist:
                # Wrap error response (Single object not found)
                response = StandardResponse(message='Audit Log does not exist', success=False)
                return Response(response.__dict__, status=status.HTTP_404_NOT_FOUND)
        else:
            response = StandardResponse(message='ID parameter is required.', success=False)
            return Response(response.__dict__, status=status.HTTP_400_BAD_REQUEST)


    @needs_roles(["ADMIN"])
    def list(self, request, *args, **kwargs):
        search_term = request.query_params.get('search', None)
        queryset = self.get_queryset()
        if search_term:
            combined_q = Q(description__icontains=search_term) | Q(action__icontains=search_term) | Q(entity_name__icontains=search_term) | Q(entity_id__icontains=search_term)
            queryset = queryset.filter(
                combined_q
            )

        page = self.paginate_queryset(queryset)

        paged_response = PagedResponse(
            success=True,
            message="Paged Audit Logs retrieved.",
            data=self.get_serializer(page, many=True).data,
            current_page=self.paginator.page.number,
            total_pages=self.paginator.page.paginator.num_pages
        )

        return Response(paged_response.__dict__)