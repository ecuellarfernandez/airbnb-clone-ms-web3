package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.adapter;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.HostAvailability;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.HostAvailabilityRepository;
import com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.jpa.JpaHostAvailabilityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class HostAvailabilityRepositoryAdapter implements HostAvailabilityRepository {

    private final JpaHostAvailabilityRepository jpaRepository;

    @Override
    public HostAvailability save(HostAvailability availability) {
        log.debug("Saving host availability for listing: {}, date: {}",
                availability.getListingId(), availability.getDate());
        return jpaRepository.save(availability);
    }

    @Override
    public Optional<HostAvailability> findById(UUID id) {
        log.debug("Finding host availability by ID: {}", id);
        return jpaRepository.findById(id);
    }

    @Override
    public Optional<HostAvailability> findByListingIdAndDate(UUID listingId, LocalDate date) {
        log.debug("Finding host availability for listing: {} on date: {}", listingId, date);
        return jpaRepository.findByListingIdAndDate(listingId, date);
    }

    @Override
    public List<HostAvailability> findByListingIdAndDateRange(
            UUID listingId,
            LocalDate startDate,
            LocalDate endDate
    ) {
        log.debug("Finding host availability for listing: {} between {} and {}",
                listingId, startDate, endDate);
        return jpaRepository.findByListingIdAndDateRange(listingId, startDate, endDate);
    }

    @Override
    public List<HostAvailability> findBlockedDatesByListingAndRange(
            UUID listingId,
            LocalDate startDate,
            LocalDate endDate
    ) {
        log.debug("Finding blocked dates for listing: {} between {} and {}",
                listingId, startDate, endDate);
        return jpaRepository.findBlockedDatesByListingAndRange(listingId, startDate, endDate);
    }

    @Override
    public void deleteById(UUID id) {
        log.debug("Deleting host availability with ID: {}", id);
        jpaRepository.deleteById(id);
    }
}
