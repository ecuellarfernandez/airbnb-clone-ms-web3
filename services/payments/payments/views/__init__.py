
from .payments_views import PaymentsViewSet

from rest_framework.routers import DefaultRouter

payments_router = DefaultRouter()

payments_router.register(r'payments', PaymentsViewSet)