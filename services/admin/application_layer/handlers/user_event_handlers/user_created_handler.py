from audit_logs.models import AuditLog
from domain_layer.events.event_data import EventData
from domain_layer.events.event_handler import EventHandlerInterface

import json

class UserCreatedHandler(EventHandlerInterface):

    def execute(self, event_value : dict):
        data = event_value.get("data", {})
        user_id = data.get('userId')
        timestamp = data.get('timestamp')

        audit_log = AuditLog(
            action="CREATE",
            user_id=user_id,
            description=f"User created with ID: {user_id} at {timestamp}",
            entity_name="Users",
            new_value=json.dumps(data)
        )

        audit_log.save()

        print(f"[EVENT HANDLER] Processed USER_CREATED for user_id: {user_id}")

