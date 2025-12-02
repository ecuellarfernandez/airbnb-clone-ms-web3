package com.listings.airbnb_clone_ms_web_iii.listings.domain.classifiers.kafka.producible;

/**
 * Eventos producibles de Kafka para el microservicio de Listings
 */
public class ProducibleEvents {

    // Test event
    public static final String TEST_EVENT = "TEST_EVENT";

    // Listing CRUD events
    public static final String LISTING_CREATED = "LISTING_CREATED";
    public static final String LISTING_UPDATED = "LISTING_UPDATED";
    public static final String LISTING_DELETED = "LISTING_DELETED";

    // Listing state events
    public static final String LISTING_ACTIVATED = "LISTING_ACTIVATED";
    public static final String LISTING_DEACTIVATED = "LISTING_DEACTIVATED";

    private ProducibleEvents() {
        // Private constructor to prevent instantiation
    }
}