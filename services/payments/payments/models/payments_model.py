
from django.db import models

status_options = [
    ('PENDING', 'Pending'),
    ('PROCESSED', 'Processed'),
    ('SUCCESS', 'Success'),
    ('FAILED', 'Failed'),
    ('CANCELLED', 'Cancelled'),
    ('REJECTED', 'Rejected'),
]

class Payment(models.Model):
    id = models.AutoField(primary_key=True)
    reservation_id = models.TextField(blank=False)
    amount = models.FloatField()
    status = models.CharField(choices=status_options, default='PENDING', blank=False)
    receipt_hash = models.CharField(blank=False, max_length=256)
    user_id = models.IntegerField(default=0, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'payments'