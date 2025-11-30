from domain_layer.commands.command_interface import CommandInterface
from domain_layer.enums.event_enums import Events
from domain_layer.enums.topic_enums import Topics

from infrastructure_layer.services.event_producer import ProducerService

class SendTestEventCommand(CommandInterface):
    def __init__(self):
        pass

    def execute(self, test_event_data):
        topic = Topics.PAYMENT_EVENTS.value
        value = test_event_data

        success = ProducerService.send_message(topic, "", value)
        return success