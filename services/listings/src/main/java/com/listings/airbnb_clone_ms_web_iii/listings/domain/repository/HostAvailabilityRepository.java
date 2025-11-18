package com.listings.airbnb_clone_ms_web_iii.listings.domain.repository;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.HostAvailability;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface HostAvailabilityRepository {

    HostAvailability save(HostAvailability availability);

    Optional<HostAvailability> findById(UUID id);

    Optional<HostAvailability> findByListingIdAndDate(UUID listingId, LocalDate date);

    List<HostAvailability> findByListingIdAndDateRange(
            UUID listingId,
            LocalDate startDate,
            LocalDate endDate
    );

    List<HostAvailability> findBlockedDatesByListingAndRange(
            UUID listingId,
            LocalDate startDate,
            LocalDate endDate
    );

    void deleteById(UUID id);
}
