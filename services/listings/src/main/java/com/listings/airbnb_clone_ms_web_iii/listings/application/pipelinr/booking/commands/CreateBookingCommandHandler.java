package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.commands;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.BookingServicePort;
import org.springframework.stereotype.Component;

@Component
public class CreateBookingCommandHandler implements Command.Handler<CreateBookingCommand, BookingDetailDTO> {

    private final BookingServicePort bookingService;

    public CreateBookingCommandHandler(BookingServicePort bookingService) {
        this.bookingService = bookingService;
    }

    @Override
    public BookingDetailDTO handle(CreateBookingCommand command) {
        return bookingService.create(command.getGuestId(), command.getDto());
    }

}
