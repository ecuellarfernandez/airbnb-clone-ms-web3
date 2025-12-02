package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingSummaryDTO;

import java.util.List;
import java.util.UUID;

public class GetBookingsByGuestQuery implements Command<List<BookingSummaryDTO>>{

    private final Integer guestId;

    public GetBookingsByGuestQuery(Integer guestId) {
        this.guestId = guestId;
    }

    public Integer getGuestId() {
        return guestId;
    }

}
