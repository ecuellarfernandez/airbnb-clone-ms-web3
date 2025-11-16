from application_layer.handlers.role_event_handlers.claim_added_handler import ClaimAddedHandler
from application_layer.handlers.user_event_handlers.user_created_handler import UserCreatedHandler

from domain_layer.enums.event_enums import Events
from domain_layer.enums.topic_enums import Topics

def global_event_registration(event_processor):
    """
        AQUI SE REGISTARAN TODOS LOS EVENTOS ANTES DE PODER USARLOS
    """

    # Registro de eventos de usuario
    event_processor.event_router.register_event(
        Topics.USER_EVENTS.value,
        Events.USER_CREATED.value,
        UserCreatedHandler()
    )

    # Registro de eventos de rol
    event_processor.event_router.register_event(
        Topics.ROLE_EVENTS.value,
        Events.CLAIM_ADDED.value,
        ClaimAddedHandler()
    )