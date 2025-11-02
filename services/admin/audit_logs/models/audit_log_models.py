
from django.db import models
from enum import Enum


actions = [
    ('CREATE', 'Create'),
    ('UPDATE', 'Update'),
    ('DELETE', 'Delete'),
    ('LOGIN', 'Login'),
    ('LOGOUT', 'Logout'),
    ('VIEW', 'View'),
    ('OTHER', 'Other'),
]

class AuditLog(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField()
    action = models.CharField(max_length=100, choices=actions, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    entity_name = models.CharField(max_length=100, null=False, blank=False)
    entity_id = models.IntegerField(null=True, blank=True)
    action_timestamp = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    new_value = models.JSONField(null=True, blank=True)
    old_value = models.JSONField(null=True, blank=True)

    class Meta:
        db_table = 'audit_logs'