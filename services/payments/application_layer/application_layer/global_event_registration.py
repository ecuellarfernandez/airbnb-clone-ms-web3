
from domain_layer.enums.event_enums import Events
from domain_layer.enums.topic_enums import Topics

def global_event_registration(event_processor):
    """
        AQUI SE REGISTARAN TODOS LOS EVENTOS ANTES DE PODER USARLOS
    """

    # Registro de eventos de usuario
