

class EventData:
    def __init__(self, topic_name : str, event_name : str, event_value : dict):
        self.topic_name = topic_name
        self.event_name = event_name
        self.data = event_value