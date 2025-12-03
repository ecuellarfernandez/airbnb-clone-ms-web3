package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.commands;

import an.awesome.pipelinr.Command;
import an.awesome.pipelinr.Voidy;
import java.util.UUID;


public class ConfirmBookingFromPaymentCommand implements Command<Voidy> {

    private final UUID bookingId;

    public ConfirmBookingFromPaymentCommand(UUID bookingId) {
        this.bookingId = bookingId;
    }

    public UUID getBookingId() {
        return bookingId;
    }
}
