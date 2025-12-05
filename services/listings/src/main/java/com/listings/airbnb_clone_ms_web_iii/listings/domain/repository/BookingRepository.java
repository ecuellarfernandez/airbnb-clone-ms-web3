package com.listings.airbnb_clone_ms_web_iii.listings.domain.repository;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Booking;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookingRepository {

    Booking save(Booking booking);

    Optional<Booking> findById(UUID id);

    List<Booking> findByGuestId(Integer guestId);

    List<Booking> findByListingId(UUID listingId);

    // baybis en aquí se usa para validar que no hayan reservas activas que se crucen
    List<Booking> findActiveBookingsByListingAndRange(
            UUID listingId,
            LocalDate startDate,
            LocalDate endDate
    );

    Page<Booking> findByHostId(Integer hostId , org.springframework.data.domain.Pageable pageable);

}
