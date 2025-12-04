
import threading
import json
from kafka import KafkaConsumer
from django.conf import settings

from infrastructure_layer.event_processor import event_processor

class KafkaConsumerThread(threading.Thread):
    """Thread to run Kafka consumer. Start with: python manage.py run_kafka_consumer"""

    def __init__(self):
        super().__init__()
        self.stop_event = threading.Event()
        self.config = settings.KAFKA_CONFIG

    def run(self):
        print(f"[KAFKA] Consumer starting, listening to topics: {self.config['TOPICS_TO_LISTEN']}")

        try:
            consumer = KafkaConsumer(
                *self.config['TOPICS_TO_LISTEN'],
                bootstrap_servers=self.config['BOOTSTRAP_SERVERS'],
                group_id=self.config['CONSUMER_GROUP_ID'],
                auto_offset_reset='earliest',
                value_deserializer=lambda m: json.loads(m.decode('utf-8'))
            )
        except Exception as e:
            print(f"[KAFKA] Error initializing consumer: {e}")
            return

        print(f"[KAFKA] Listening on topics: {self.config['TOPICS_TO_LISTEN']}")

        while not self.stop_event.is_set():
            messages = consumer.poll(timeout_ms=1000)

            if not messages:
                continue

            for topic_partition, records in messages.items():
                print(f"[KAFKA] Received {len(records)} messages from {topic_partition.topic}")
                for message in records:
                    self._process_message(message)

        consumer.close()
        print("[KAFKA] Consumer stopped.")

    def _process_message(self, message):
        topic_name = message.topic
        event_value = message.value
        event_name = event_value.get('eventType')

        print("-" * 50)
        print(f"[KAFKA] Topic: {topic_name}")
        print(f"[KAFKA] Event Name (Type): {event_name}")
        print(f"[KAFKA] Raw Value: {event_value}")
        print("-" * 50)
        try:
            event_processor.handle_event(topic_name=topic_name, event_name=event_name, event_value=event_value)
        except Exception as e:
            print(f"[KAFKA] while processing event {event_name}: {e}")

    def stop(self):
        """Sets the event flag to signal the thread to stop."""
        self.stop_event.set()
