package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingSummaryDTO;

public class GetBookingsByHostQuery implements Command<BookingSummaryDTO> {
    public final Integer hostId;

    public GetBookingsByHostQuery(Integer hostId) {
        this.hostId = hostId;
    }
}
