import json

from audit_logs.models import AuditLog

class EventHandler:

    def __init__(self):
        self.event_processors = {
            'USER_CREATED' : self._handle_user_created,
            'CLAIM_ADDED' : self._handle_claim_added
        }

    def handle_event(self, topic_name, event_value):
        event_type = event_value.get('eventType')
        processor = self.event_processors.get(event_type)
        if processor:
            processor(event_value)
            print(f"[EVENT HANDLER] Handled event type: {event_type} from topic: {topic_name}")
        else:
            print(f"[EVENT HANDLER] No processor for event type: {event_type}")
            return

    def _handle_user_created(self, event_value):
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

    def _handle_claim_added(self, event_value):
        data = event_value.get("data", {})
        claim_id = data.get('claimId')
        user_id = data.get('userId')
        role_id = data.get('roleId')

        audit_log = AuditLog(
            action="OTHER",
            user_id=user_id,
            description=f"Claim added with ID: {claim_id} to Role ID: {role_id}",
            entity_name="Roles",
            new_value=json.dumps(event_value)
        )

        audit_log.save()
        print(f"[EVENT HANDLER] Processed CLAIM_ADDED for claim_id: {claim_id}")


event_handler = EventHandler()