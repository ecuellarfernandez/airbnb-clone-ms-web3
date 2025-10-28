from django.utils.timezone import override
from rest_framework.decorators import action

from ..dtos.standard_response import StandardResponse
from ..models import AuditLog
from ..serializers import audit_log_serializers, dtos_serializer

from rest_framework import permissions, viewsets, status
from rest_framework.response import Response

from ..serializers.audit_log_serializers import AuditLogSerializer


class AuditLogViewSet(viewsets.ModelViewSet):

    queryset = AuditLog.objects.all().order_by('-action_timestamp')
    serializer_class = AuditLogSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.request.query_params.get('user_id', None)
        action = self.request.query_params.get('action', None)
        entity_name = self.request.query_params.get('entity_name', None)

        queryset = queryset.filter(user_id=self.request.user.id).filter(action=action).filter(entity_name=entity_name)

        return queryset

    def perform_create(self, serializer):
        resp = StandardResponse()
        try:
            audit_log_data = serializer.save()
            AuditLog.save(audit_log_data)

            resp.data = audit_log_data
        except:
            resp.success = False
            resp.message = "Error creating Audit Log"

        return resp

    #endpoint personalizado
    @action(detail=False, methods=['get'])
    def get_by_id(self, request):
        log_id = request.query_params.get('id', None)
        if log_id is not None:
            response : StandardResponse[AuditLog] = StandardResponse[AuditLog]()
            try:
                audit_log = AuditLog.objects.get(id=log_id)
                serializer = self.get_serializer(audit_log)

                response.data = serializer.data

                return Response(self.get_serializer(response).data)
            except AuditLog.DoesNotExist:
                response.message = 'Audit Log does not exist'
                response.status_code = status.HTTP_404_NOT_FOUND
                response.success = False
                return Response(response, status=404)
        else:
            return Response({'detail': 'ID parameter is required.'}, status=400)
