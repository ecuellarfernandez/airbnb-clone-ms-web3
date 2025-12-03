from application_layer.integration_events.handlers.listing_event_handlers.listing_activated_handler import \
    ListingActivatedHandler
from application_layer.integration_events.handlers.listing_event_handlers.listing_created_handler import \
    ListingCreatedHandler
from application_layer.integration_events.handlers.listing_event_handlers.listing_deactivated_handler import \
    ListingDeactivatedHandler
from application_layer.integration_events.handlers.listing_event_handlers.listing_deleted_handler import \
    ListingDeletedHandler
from application_layer.integration_events.handlers.payment_event_handlers.payment_completed_handler import \
    PaymentCompletedHandler
from application_layer.integration_events.handlers.payment_event_handlers.payment_failed_handler import \
    PaymentFailedHandler
from application_layer.integration_events.handlers.role_event_handlers.claim_added_handler import ClaimAddedHandler
from application_layer.integration_events.handlers.user_event_handlers.role_added_to_user_handler import \
    RoleAddedToUserHandler
from application_layer.integration_events.handlers.user_event_handlers.role_removed_from_user_handler import \
    RoleRemovedFromUserHandler
from application_layer.integration_events.handlers.user_event_handlers.user_created_handler import UserCreatedHandler

from domain_layer.enums.event_enums import Events
from domain_layer.enums.topic_enums import Topics

def global_event_registration(event_processor):
    """
        AQUI SE REGISTARAN TODOS LOS EVENTOS ANTES DE PODER USARLOS
    """

    """ 
        Registro de eventos de usuario
    """
    event_processor.event_router.register_event(
        Topics.USER_EVENTS.value,
        Events.USER_CREATED.value,
        UserCreatedHandler()
    )

    event_processor.event_router.register_event(
        Topics.USER_EVENTS.value,
        Events.ROLE_ADDED_TO_USER.value,
        RoleAddedToUserHandler()
    )

    event_processor.event_router.register_event(
        Topics.USER_EVENTS.value,
        Events.ROLE_REMOVED_FROM_USER.value,
        RoleRemovedFromUserHandler()
    )

    """
        REGISTRO DE EVENTOS DE ROLES
    """
    event_processor.event_router.register_event(
        Topics.ROLE_EVENTS.value,
        Events.CLAIM_ADDED.value,
        ClaimAddedHandler()
    )


    """
        REGISTRO DE EVENTOS DE PAYMENTS
    """
    event_processor.event_router.register_event(
        Topics.PAYMENT_EVENTS.value,
        Events.PAYMENT_COMPLETED.value,
        PaymentCompletedHandler()
    )

    event_processor.event_router.register_event(
        Topics.PAYMENT_EVENTS.value,
        Events.PAYMENT_FAILED.value,
        PaymentFailedHandler()
    )

    """
        REGISTRO DE EVENTOS DE LISTINGS
    """
    event_processor.event_router.register_event(
        Topics.LISTING_EVENTS.value,
        Events.LISTING_CREATED.value,
        ListingCreatedHandler()
    )

    event_processor.event_router.register_event(
        Topics.LISTING_EVENTS.value,
        Events.LISTING_ACTIVATED.value,
        ListingActivatedHandler()
    )

    event_processor.event_router.register_event(
        Topics.LISTING_EVENTS.value,
        Events.LISTING_DEACTIVATED.value,
        ListingDeactivatedHandler()
    )

    event_processor.event_router.register_event(
        Topics.LISTING_EVENTS.value,
        Events.LISTING_DELETED.value,
        ListingDeletedHandler()
    )
