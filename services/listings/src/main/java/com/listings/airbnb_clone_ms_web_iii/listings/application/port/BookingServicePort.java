package com.listings.airbnb_clone_ms_web_iii.listings.application.port;

import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.CreateBookingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingSummaryDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface BookingServicePort {

    BookingDetailDTO create(UUID guestId, CreateBookingDTO dto);

    BookingDetailDTO findById(UUID id);

    List<BookingSummaryDTO> findByGuestId(UUID guestId);

    List<BookingSummaryDTO> findByListingId(UUID listingId);

    void cancel(UUID bookingId, UUID guestId);

    // Opcional: list bookings for a listing + date range
    List<BookingSummaryDTO> findByListingAndRange(UUID listingId, LocalDate start, LocalDate end);

}
