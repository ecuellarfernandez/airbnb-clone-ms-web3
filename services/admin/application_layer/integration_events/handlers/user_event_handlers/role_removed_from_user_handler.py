import json

from audit_logs.models import AuditLog
from audit_logs.models.actions_constants import UPDATE
from domain_layer.events.event_handler import EventHandlerInterface


class RoleRemovedFromUserHandler(EventHandlerInterface):

    def execute(self, event_value : dict):
        data = event_value.get("data", {})
        user_id = event_value.get('userId')
        timestamp = event_value.get('timestamp')

        entity_id = data.get("id")

        audit_log = AuditLog(
            action=UPDATE,
            user_id=user_id,
            description=f"Role removed to user {user_id}",
            entity_name="UserRoles",
            entity_id=entity_id,
            new_value=str(data),
            action_timestamp=timestamp
        )

        audit_log.save()

        print(f"[EVENT HANDLER] Processed ROLE_ADDED_TO_USER for user_id: {user_id} at {timestamp}")