package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.adapter;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.HostAvailability;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.HostAvailabilityRepository;
import com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.jpa.JpaHostAvailabilityRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class HostAvailabilityRepositoryAdapter implements HostAvailabilityRepository {

    private final JpaHostAvailabilityRepository jpaRepository;

    public HostAvailabilityRepositoryAdapter(JpaHostAvailabilityRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public HostAvailability save(HostAvailability availability) {
        return jpaRepository.save(availability);
    }

    @Override
    public Optional<HostAvailability> findById(UUID id) {
        return jpaRepository.findById(id);
    }

    @Override
    public Optional<HostAvailability> findByListingIdAndDate(UUID listingId, LocalDate date) {
        return jpaRepository.findByListingIdAndDate(listingId, date);
    }

    @Override
    public List<HostAvailability> findByListingIdAndDateRange(
            UUID listingId,
            LocalDate startDate,
            LocalDate endDate
    ) {
        return jpaRepository.findByListingIdAndDateRange(listingId, startDate, endDate);
    }

    @Override
    public List<HostAvailability> findBlockedDatesByListingAndRange(
            UUID listingId,
            LocalDate startDate,
            LocalDate endDate
    ) {
        return jpaRepository.findBlockedDatesByListingAndRange(listingId, startDate, endDate);
    }

    @Override
    public void deleteById(UUID id) {
        jpaRepository.deleteById(id);
    }
}
