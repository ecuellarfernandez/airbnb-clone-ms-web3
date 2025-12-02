from audit_logs.models import AuditLog
from audit_logs.models.actions_constants import UPDATE
from domain_layer.events.event_handler import EventHandlerInterface


class PaymentCompletedHandler(EventHandlerInterface):

    def execute(self, event_value: dict):
        data = event_value.get("data", {}) or event_value.get("event_value", {})

        payment_id = data.get('id')
        reservation_id = data.get('reservation_id')
        amount = data.get('amount')
        user_id = data.get('user_id')
        timestamp = data.get('created_at');

        audit_log = AuditLog(
            action=UPDATE,
            user_id=user_id,
            description=f"Payment completed for reservation {reservation_id} with amount {amount}",
            entity_name="Payments",
            entity_id=payment_id,
            new_value=str(data),
            action_timestamp=timestamp
        )

        audit_log.save()

        print(f"[EVENT HANDLER] Processed PAYMENT_COMPLETED for payment_id: {payment_id}, "
              f"amount: {amount}, user_id: {user_id} at {timestamp}")