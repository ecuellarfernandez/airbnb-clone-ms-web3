from kafka import KafkaProducer
import json
import time
import sys

# IMPORTANT: The advertised listener address for your native Windows application
BOOTSTRAP_SERVERS = ['localhost:9092']
TOPIC_NAME = 'test_topic_django'  # The topic your Django service will use


def run_producer():
    """Connects to the Kafka Broker and sends a single test message."""
    producer = None
    try:
        # Initialize the Producer.
        # We serialize the Python dict to a JSON string and encode it as UTF-8 bytes
        producer = KafkaProducer(
            bootstrap_servers=BOOTSTRAP_SERVERS,
            value_serializer=lambda v: json.dumps(v).encode('utf-8'),
            api_version=(2, 0, 0),  # Stable API version
            request_timeout_ms=5000  # Quick timeout for connection attempts
        )

        print(f"Attempting to connect to Kafka at {BOOTSTRAP_SERVERS}...")

        # Message data to send
        message_data = {
            'service': 'Django Test Producer (Native Windows)',
            'timestamp': time.time(),
            'content': f'Test message number {int(time.time() % 100)}'
        }

        # Send the message
        future = producer.send(
            TOPIC_NAME,
            message_data
        )

        # Wait for the message acknowledgement (up to 10 seconds)
        record_metadata = future.get(timeout=10)

        print("-" * 40)
        print(" Message sent successfully!")
        print(f"Payload: {json.dumps(message_data)}")
        print(
            f"Destination: {record_metadata.topic} / Partition {record_metadata.partition} @ Offset {record_metadata.offset}")
        print("-" * 40)

    except Exception as e:
        print("-" * 40)
        print(f" FATAL ERROR CONNECTING/SENDING:")
        print(f"   {type(e).__name__}: {e}")
        print(f"   Please ensure the Kafka container is running via 'docker-compose up -d'.")
        print("-" * 40)
        sys.exit(1)

    finally:
        if producer is not None:
            producer.close()


if __name__ == "__main__":
    run_producer()