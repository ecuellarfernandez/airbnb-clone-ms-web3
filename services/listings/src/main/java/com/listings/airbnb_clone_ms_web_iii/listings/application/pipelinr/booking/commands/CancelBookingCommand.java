package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.commands;

import an.awesome.pipelinr.Command;
import an.awesome.pipelinr.Voidy;

import java.util.UUID;

public class CancelBookingCommand implements Command<Voidy> {

    private final UUID bookingId;
    private final Integer guestId;

    public CancelBookingCommand(UUID bookingId, Integer guestId) {
        this.bookingId = bookingId;
        this.guestId = guestId;
    }

    public UUID getBookingId() {
        return bookingId;
    }

    public Integer getGuestId() {
        return guestId;
    }

}
