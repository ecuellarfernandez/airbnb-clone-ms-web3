from rest_framework.routers import DefaultRouter

from ..views.audit_log_views import AuditLogViewSet

audit_log_router = DefaultRouter()

audit_log_router.register(r"audit-logs", AuditLogViewSet, basename="audit-logs")