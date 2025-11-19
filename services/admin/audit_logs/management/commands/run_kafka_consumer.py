import signal
import time

from django.core.management import BaseCommand

import sys
from application_layer.threads.kafka_consumer_thread import KafkaConsumerThread

class Command(BaseCommand):
    help = 'Run the Kafka consumer thread to process incoming messages.'

    def handle(self, *args, **options):

        consumer_thread = KafkaConsumerThread()
        consumer_thread.start()

        self.stdout.write(self.style.SUCCESS('KAFKA CONSUMER THREAD STARTED'))
        self.stdout.write('Press Ctrl+C to stop Consumer Thread')

        # 2. Set up signal handler for clean shutdown
        def signal_handler(sig, frame):
            self.stdout.write(self.style.WARNING('\nStopping Kafka Consumer thread...'))
            consumer_thread.stop()
            consumer_thread.join()  # Wait for the thread to finish cleanly
            sys.exit(0)

        signal.signal(signal.SIGINT, signal_handler)

        while True:
            time.sleep(1)

