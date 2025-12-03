package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.commands;

import an.awesome.pipelinr.Command;
import an.awesome.pipelinr.Voidy;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.BookingServicePort;
import org.springframework.stereotype.Component;

@Component
public class RejectBookingFromPaymentCommandHandler  implements Command.Handler<RejectBookingFromPaymentCommand, Voidy>{

    private final BookingServicePort bookingService;

    public RejectBookingFromPaymentCommandHandler(BookingServicePort bookingService) {
        this.bookingService = bookingService;
    }

    @Override
    public Voidy handle(RejectBookingFromPaymentCommand command) {
        // guestId = null porque esta cancelación viene del sistema (Payments), no del usuario
        bookingService.cancel(command.getBookingId(), null);
        return new Voidy();
    }

}
