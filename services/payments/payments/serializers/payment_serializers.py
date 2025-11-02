
from rest_framework.serializers import ModelSerializer

from payments.models import Payment


class PaymentSerializer(ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'reservation_id', 'amount', 'status', 'receipt_hash', 'created_at']
        read_only_fields = ['created_at']