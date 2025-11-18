package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.adapter;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Listing;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.ListingRepository;
import com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.jpa.JpaListingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Adaptador que implementa el puerto de dominio ListingRepository
 * utilizando Spring Data JPA como tecnología de persistencia.
 *
 * Este adaptador traduce las llamadas del dominio a operaciones JPA.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class ListingRepositoryAdapter implements ListingRepository {

    private final JpaListingRepository jpaRepository;

    @Override
    public Listing save(Listing listing) {
        log.debug("Saving listing with ID: {}", listing.getId());
        return jpaRepository.save(listing);
    }

    @Override
    public Optional<Listing> findById(UUID id) {
        log.debug("Finding listing by ID: {}", id);
        return jpaRepository.findById(id);
    }

    @Override
    public List<Listing> findAll() {
        log.debug("Finding all listings");
        return jpaRepository.findAll();
    }

    @Override
    public void deleteById(UUID id) {
        log.debug("Deleting listing with ID: {}", id);
        jpaRepository.deleteById(id);
    }

    @Override
    public boolean existsById(UUID id) {
        return jpaRepository.existsById(id);
    }

    @Override
    public List<Listing> findByHostId(UUID hostId) {
        log.debug("Finding listings by host ID: {}", hostId);
        return jpaRepository.findByHostId(hostId);
    }

    @Override
    public List<Listing> findAllActive() {
        log.debug("Finding all active listings");
        return jpaRepository.findByIsActiveTrue();
    }

    @Override
    public List<Listing> findActiveByCity(String city) {
        log.debug("Finding active listings by city: {}", city);
        return jpaRepository.findActiveByCityIgnoreCase(city);
    }

    @Override
    public List<Listing> findActiveByCountry(String country) {
        log.debug("Finding active listings by country: {}", country);
        return jpaRepository.findActiveByCountryIgnoreCase(country);
    }

    @Override
    public Optional<Listing> findByIdWithRelations(UUID id) {
        log.debug("Finding listing with relations by ID: {}", id);
        return jpaRepository.findByIdWithRelations(id);
    }

    @Override
    public List<Listing> findByFilters(
            String city,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Integer minCapacity,
            UUID categoryId
    ) {
        log.debug("Finding listings with filters - city: {}, minPrice: {}, maxPrice: {}, capacity: {}, category: {}",
                city, minPrice, maxPrice, minCapacity, categoryId);

        return jpaRepository.findByFilters(city, minPrice, maxPrice, minCapacity, categoryId);
    }
}
