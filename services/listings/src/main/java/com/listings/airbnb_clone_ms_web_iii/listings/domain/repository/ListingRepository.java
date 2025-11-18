package com.listings.airbnb_clone_ms_web_iii.listings.domain.repository;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Listing;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Puerto de salida para persistencia de Listings.
 */
public interface ListingRepository {

    Listing save(Listing listing);

    Optional<Listing> findById(UUID id);

    List<Listing> findAll();

    void deleteById(UUID id);

    boolean existsById(UUID id);

    List<Listing> findByHostId(UUID hostId);

    List<Listing> findAllActive();

    List<Listing> findActiveByCity(String city);

    List<Listing> findActiveByCountry(String country);

    Optional<Listing> findByIdWithRelations(UUID id);

    List<Listing> findByFilters(
            String city,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Integer minCapacity,
            UUID categoryId
    );
}
