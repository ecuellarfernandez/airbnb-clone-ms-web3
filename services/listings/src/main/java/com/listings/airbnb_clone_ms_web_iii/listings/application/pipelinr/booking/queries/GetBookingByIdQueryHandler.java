package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.BookingServicePort;
import org.springframework.stereotype.Component;

@Component
public class GetBookingByIdQueryHandler implements Command.Handler<GetBookingByIdQuery, BookingDetailDTO> {

    private final BookingServicePort bookingService;

    public GetBookingByIdQueryHandler(BookingServicePort bookingService) {
        this.bookingService = bookingService;
    }

    @Override
    public BookingDetailDTO handle(GetBookingByIdQuery query) {
        return bookingService.findById(query.getBookingId());
    }

}
