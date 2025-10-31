

from ..models import AuditLog
from rest_framework import serializers

class AuditLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditLog
        fields = ['id', 'user_id', 'action', 'description', 'entity_name', 'entity_id', 'action_timestamp', 'ip_address', 'new_value', 'old_value']
        read_only_fields = ['id', 'action_timestamp']