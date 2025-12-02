


import json

from audit_logs.models import AuditLog
from domain_layer.events.event_handler import EventHandlerInterface


class ClaimAddedHandler(EventHandlerInterface):

    def execute(self, event_value : dict):
        data = event_value.get("data", {})
        user_id = event_value.get('userId')
        claim_id = data.get('id')
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