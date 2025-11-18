package com.listings.airbnb_clone_ms_web_iii.listings.presentation.exception;

/**
 * Exception lanzada cuando no se encuentra un listing.
 */
public class ListingNotFoundException extends RuntimeException {

    public ListingNotFoundException(String message) {
        super(message);
    }

    public ListingNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
