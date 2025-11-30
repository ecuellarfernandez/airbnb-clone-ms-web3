package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.commands;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.CreateBookingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingDetailDTO;

import java.util.UUID;

public class CreateBookingCommand implements Command<BookingDetailDTO> {

    private final UUID guestId;
    private final CreateBookingDTO dto;

    public CreateBookingCommand(UUID guestId, CreateBookingDTO dto) {
        this.guestId = guestId;
        this.dto = dto;
    }

    public UUID getGuestId() {
        return guestId;
    }

    public CreateBookingDTO getDto() {
        return dto;
    }

}
