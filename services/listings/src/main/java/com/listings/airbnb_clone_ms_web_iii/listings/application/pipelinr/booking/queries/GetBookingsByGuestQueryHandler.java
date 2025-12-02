package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingSummaryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.BookingServicePort;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GetBookingsByGuestQueryHandler implements Command.Handler<GetBookingsByGuestQuery, List<BookingSummaryDTO>> {

    private final BookingServicePort bookingService;

    public GetBookingsByGuestQueryHandler(BookingServicePort bookingService) {
        this.bookingService = bookingService;
    }

    @Override
    public List<BookingSummaryDTO> handle(GetBookingsByGuestQuery query) {
        return bookingService.findByGuestId(query.getGuestId());
    }

}
