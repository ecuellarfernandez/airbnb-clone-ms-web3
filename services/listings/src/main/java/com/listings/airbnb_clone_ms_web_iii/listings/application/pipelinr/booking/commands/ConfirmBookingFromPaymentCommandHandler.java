package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.commands;

import an.awesome.pipelinr.Command;
import an.awesome.pipelinr.Voidy;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.BookingServicePort;
import org.springframework.stereotype.Component;

@Component
public class ConfirmBookingFromPaymentCommandHandler implements Command.Handler<ConfirmBookingFromPaymentCommand, Voidy> {

    private final BookingServicePort bookingService;

    public ConfirmBookingFromPaymentCommandHandler(BookingServicePort bookingService) {
        this.bookingService = bookingService;
    }

    @Override
    public  Voidy handle(ConfirmBookingFromPaymentCommand command) {
        bookingService.confirm(command.getBookingId());
        return new Voidy();
    }

}
