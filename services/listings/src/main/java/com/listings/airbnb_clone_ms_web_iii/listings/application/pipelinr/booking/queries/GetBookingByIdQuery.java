package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingDetailDTO;

import java.util.UUID;

public class GetBookingByIdQuery implements Command<BookingDetailDTO> {

    private final UUID bookingId;

    public GetBookingByIdQuery(UUID bookingId) {
        this.bookingId = bookingId;
    }

    public UUID getBookingId() {
        return bookingId;
    }

}
