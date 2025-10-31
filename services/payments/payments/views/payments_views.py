from rest_framework import status
from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.response import Response

from payments.dtos.paged_response import PagedResponse
from payments.dtos.standard_response import StandardResponse
from payments.models import Payment
from payments.paginators.payment_paginator import PaymentsPagination
from payments.serializers.payment_serializers import PaymentSerializer


class PaymentsViewSet(ModelViewSet):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()
    pagination_class = PaymentsPagination

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        data_serializer = self.get_serializer(instance)

        resp = StandardResponse(
            success=True,
            message="Payment retrieved.",
            data=data_serializer.data
        )

        return Response(resp.__dict__, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        resp = StandardResponse(
            success=True,
            message="Payment created.",
            data=self.get_serializer(instance).data
        )
        return Response(resp.__dict__, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        search_term = request.query_params.get('search', None)
        queryset = self.get_queryset()
        if search_term:
            queryset = queryset.filter(status__icontains=search_term)

        page = self.paginate_queryset(queryset)

        paged_response = PagedResponse(
            success=True,
            message="Paged Payments retrieved.",
            data=self.get_serializer(page, many=True).data,
            current_page=self.paginator.page.number,
            total_pages=self.paginator.page.paginator.num_pages
        )

        return Response(paged_response.__dict__)