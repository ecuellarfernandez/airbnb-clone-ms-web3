package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.commands;

import an.awesome.pipelinr.Command;
import an.awesome.pipelinr.Voidy;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.BookingServicePort;
import org.springframework.stereotype.Component;

@Component
public class CancelBookingCommandHandler implements Command.Handler<CancelBookingCommand, Voidy> {

    private final BookingServicePort bookingService;

    public CancelBookingCommandHandler(BookingServicePort bookingService) {
        this.bookingService = bookingService;
    }

    @Override
    public Voidy handle(CancelBookingCommand command) {
        bookingService.cancel(command.getBookingId(), command.getGuestId());
        return new Voidy();
    }

}
