
from audit_logs.models import AuditLog
from domain_layer.events.event_handler import EventHandlerInterface
from audit_logs.models.actions_constants import CREATE

class ListingCreatedHandler(EventHandlerInterface):

    def execute(self, event_value: dict):
        data = event_value.get("data", {}) or event_value.get("event_value", {})
        user_id = event_value.get('user_id') or event_value.get('userId', 0)
        timestamp = event_value.get('timestamp')

        listing_id = data.get('id')
        host_id  = data.get('host_id', "-")
        title = data.get('title')

        audit_log = AuditLog(
            action=CREATE,
            user_id=user_id,
            description=f"Listing created with title '{title} by host {host_id}'",
            entity_name="Listings",
            entity_id=listing_id,
            new_value=str(data),
            action_timestamp=timestamp
        )

        audit_log.save()

        print(f"[EVENT HANDLER] Processed LISTING_CREATED for listing_id: {listing_id}, "
              f"title: '{title}', user_id: {user_id} at {timestamp}")