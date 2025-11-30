from application_layer.queries.ValidateCreditCardDataQuery import ValidateCreditCardDataQuery
from domain_layer.commands.command_interface import CommandInterface
from domain_layer.events.event_data import EventData
from payments.models.payments_model import Payment

from domain_layer.enums.event_enums import Events
from domain_layer.enums.topic_enums import Topics

from infrastructure_layer.services.event_producer import ProducerService

class CreatePaymentForReservationCommand(CommandInterface):
    def __init__(self, payment_data : dict, user_id: int) -> Payment:
        self.payment_data = payment_data
        self.user_id = user_id

    def execute(self) -> Payment:
        payment_obj = Payment(
            reservation_id=self.payment_data.get("reservation_id", 0),
            amount=self.payment_data.get("amount", 0.0),
            receipt_hash=hash(self.payment_data),
            user_id=self.payment_data.get("user_id", 0),
        )

        payment_obj.save();
        card_data = self.payment_data.get("card", {})
        card_data["number"] = card_data.get("number", "")
        card_data["expiry"] = card_data.get("expiry", "")
        card_data["cvv"] = card_data.get("cvv", "")

        is_card_valid = ValidateCreditCardDataQuery(
            card_data["number"],
            card_data["expiry"],
            card_data["cvv"]
        ).execute()

        if (is_card_valid):
            payment_obj.status = "SUCCESS"
        else:
            payment_obj.status = "REJECTED"

        payment_obj.save()

        if (payment_obj.status != "SUCCESS"):
            event_obj = EventData(
                topic_name=Topics.PAYMENT_EVENTS.value,
                event_name=Events.PAYMENT_FAILED.value,
                event_value=payment_obj.__dict__
            )
            # send event
            try:
                ProducerService.send_message(
                    event_obj.topic_name,
                    "",
                    event_obj.event_value
                )
            except Exception as e:
                print(f"Failed to send event: {e}")
            # send event
        else:
            event_obj = EventData(
                topic_name=Topics.PAYMENT_EVENTS.value,
                event_name=Events.PAYMENT_FAILED.value,
                event_value=payment_obj.__dict__
            )
            # send event
            try:
                ProducerService.send_message(
                    event_obj.topic_name,
                    "",
                    event_obj.event_value
                )
            except Exception as e:
                print(f"Failed to send event: {e}")

        return payment_obj



