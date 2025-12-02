from rest_framework.decorators import action
from rest_framework import status
from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.request import Request

from application_layer.commands.CreatePaymentForReservationCommand import CreatePaymentForReservationCommand
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

    @action(detail=False, methods=['post'], url_path="payment-reservation")
    def create_payment_for_reservation(self, request : Request, *args, **kwargs):
        """
        Crear payment para una reservation. ESTE ES EL METODO A USAR PARA CREAR PAGOS DE RESERVAS.
        """
        payment_data = request.data
        is_valid, error_message = self._validate_payment_data_for_reservation(payment_data)

        if not is_valid:
            resp = StandardResponse(
                success=False,
                message=f"Invalid payment data: {error_message}",
                data=None
            )
            return Response(resp.__dict__, status=status.HTTP_400_BAD_REQUEST)

        command = CreatePaymentForReservationCommand(payment_data=payment_data, user_id=payment_data.get("user_id", 0))

        try:
            payment_instance = command.execute()
        except ValueError as e:
            resp = StandardResponse(
                success=False,
                message=str(e),
                data=None
            )
            return Response(resp.__dict__, status=status.HTTP_400_BAD_REQUEST)

        acceptance_message = ""
        success = payment_instance.status == "SUCCESS"
        if payment_instance.status != "SUCCESS":
            acceptance_message = "However The payment failed"
        else:
            acceptance_message = "The payment was successful"

        resp = StandardResponse(
            success=success,
            message=f"Payment for reservation created. {acceptance_message}",
            data=self.get_serializer(payment_instance).data
        )
        return Response(resp.__dict__, status=status.HTTP_201_CREATED)


    def _validate_payment_data_for_reservation(self, payment_data: dict) -> tuple[bool, str]:
        required_fields = ["reservation_id", "amount", "user_id", "card"]
        card_required_fields = ["number", "expiry", "cvv"]

        for field in required_fields:
            if field not in payment_data:
                return False, f"Missing required field: {field}"

        card_data = payment_data.get("card", {})
        for field in card_required_fields:
            if field not in card_data:
                return False, f"Missing required card field: {field}"

        return True, ""