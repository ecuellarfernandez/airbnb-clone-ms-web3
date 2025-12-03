package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingSummaryDTO;

import java.util.List;
import java.util.UUID;


public class GetBookingsByListingQuery implements Command<List<BookingSummaryDTO>> {

    private final UUID listingId;

    public GetBookingsByListingQuery(UUID listingId) {
        this.listingId = listingId;
    }

    public UUID getListingId() {
        return listingId;
    }

}
