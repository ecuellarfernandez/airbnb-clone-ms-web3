package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.commands;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.CreateBookingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingDetailDTO;

import java.util.UUID;

public class CreateBookingCommand implements Command<BookingDetailDTO> {

    private final Integer guestId;
    private final CreateBookingDTO dto;

    public CreateBookingCommand(Integer guestId, CreateBookingDTO dto) {
        this.guestId = guestId;
        this.dto = dto;
    }

    public Integer getGuestId() {
        return guestId;
    }

    public CreateBookingDTO getDto() {
        return dto;
    }

}
