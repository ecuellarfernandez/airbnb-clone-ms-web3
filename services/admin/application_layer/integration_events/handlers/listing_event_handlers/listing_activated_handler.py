

from audit_logs.models import AuditLog
from domain_layer.events.event_handler import EventHandlerInterface
from audit_logs.models.actions_constants import UPDATE


class ListingActivatedHandler(EventHandlerInterface):

    def execute(self, event_value: dict):
        data = event_value.get("data", "-no-id-")
        user_id = event_value.get('user_id') or event_value.get('userId', 0)
        timestamp = event_value.get('timestamp')

        audit_log = AuditLog(
            action=UPDATE,
            user_id=user_id,
            description=f"Listing {data} activated'",
            entity_name="Listings",
            entity_id=data,
            new_value=str(data),
            action_timestamp=timestamp
        )

        audit_log.save()

        print(f"[EVENT HANDLER] Processed LISTING_ACTIVATED for listing_id: {data}, "
              f"user_id: {user_id} at {timestamp}")