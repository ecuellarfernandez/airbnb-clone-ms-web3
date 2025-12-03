package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.adapter;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Booking;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.BookingRepository;
import com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.jpa.JpaBookingRepository;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class BookingRepositoryAdapter implements BookingRepository {

    private final JpaBookingRepository jpaRepository;

    public BookingRepositoryAdapter(JpaBookingRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Booking save(Booking booking) {
        return jpaRepository.save(booking);
    }

    @Override
    public Optional<Booking> findById(UUID id) {
        return jpaRepository.findById(id);
    }

    @Override
    public List<Booking> findByGuestId(Integer guestId) {
        return jpaRepository.findByGuestId(guestId);
    }

    @Override
    public List<Booking> findByListingId(UUID listingId) {
        return jpaRepository.findByListingId(listingId);
    }

    @Override
    public List<Booking> findActiveBookingsByListingAndRange(UUID listingId, LocalDate startDate, LocalDate endDate) {
        return jpaRepository.findActiveBookingsByListingAndRange(listingId, startDate, endDate);
    }
}
