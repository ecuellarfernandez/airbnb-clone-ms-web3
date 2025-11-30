from kafka import KafkaProducer
import json
import logging

from django.conf import settings

logger = logging.getLogger(__name__)


class ProducerService:
    _producer = None

    @classmethod
    def get_producer(cls):
        """Initializes and returns the KafkaProducer instance, loading config from Django settings."""
        if cls._producer is None:

            # --- DYNAMIC CONFIG LOAD ---
            # 1. Check if KAFKA_CONFIG and BOOTSTRAP_SERVERS are set in settings.
            kafka_config = getattr(settings, 'KAFKA_CONFIG', {})
            bootstrap_servers = kafka_config.get('BOOTSTRAP_SERVERS')

            if not bootstrap_servers:
                logger.error(
                    "Kafka bootstrap servers not found in Django settings. KAFKA_CONFIG['BOOTSTRAP_SERVERS'] must be defined.")
                return None

            # If the setting is a single string (like 'host:port'), ensure it's in a list format
            if isinstance(bootstrap_servers, str):
                server_list = [bootstrap_servers]
            else:
                server_list = bootstrap_servers
            # --- END DYNAMIC CONFIG LOAD ---

            try:
                cls._producer = KafkaProducer(
                    # Define how to serialize the message value (e.g., JSON)
                    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
                    # Use the dynamically loaded server list
                    bootstrap_servers=server_list,
                    # Optional: wait for broker response (acks=1)
                    acks=1
                )
                logger.info("Kafka Producer initialized successfully.")
            except Exception as e:
                logger.error(f"Failed to initialize Kafka Producer with servers {server_list}: {e}")
                cls._producer = None
        return cls._producer

    @classmethod
    def send_message(cls, topic, key, value):
        """Sends a message to the specified Kafka topic."""
        producer = cls.get_producer()
        if not producer:
            logger.error("Message not sent: Kafka Producer is not available.")
            return

        try:
            # Key must be bytes for Kafka
            key_bytes = key.encode('utf-8')

            # Send the message asynchronously
            future = producer.send(
                topic=topic,
                key=key_bytes,
                value=value
            )

            # Block until the message is sent (optional, but good for critical events)
            record_metadata = future.get(timeout=10)

            logger.info(
                f"Message sent to topic: {record_metadata.topic}, "
                f"partition: {record_metadata.partition}, "
                f"offset: {record_metadata.offset}"
            )
            return True
        except Exception as e:
            logger.error(f"Failed to send message to Kafka topic '{topic}': {e}")
            return False

    @classmethod
    def close(cls):
        """Flushes and closes the producer."""
        if cls._producer:
            cls._producer.flush()
            cls._producer.close()
            cls._producer = None
            logger.info("Kafka Producer closed.")