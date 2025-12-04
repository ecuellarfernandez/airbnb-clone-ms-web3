package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.commands;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingSummaryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.queries.GetBookingsByListingQuery;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.BookingServicePort;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GetBookingsByListingQueryHandler implements Command.Handler<GetBookingsByListingQuery, List<BookingSummaryDTO>>{

    private final BookingServicePort bookingService;

    public GetBookingsByListingQueryHandler(BookingServicePort bookingService) {
        this.bookingService = bookingService;
    }

    @Override
    public List<BookingSummaryDTO> handle(GetBookingsByListingQuery query) {
        return bookingService.findByListingId(query.getListingId());
    }

}
