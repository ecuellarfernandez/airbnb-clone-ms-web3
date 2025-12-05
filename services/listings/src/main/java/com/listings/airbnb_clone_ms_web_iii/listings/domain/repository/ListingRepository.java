package com.listings.airbnb_clone_ms_web_iii.listings.domain.repository;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Listing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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

    Page<Listing> findByHostId(Integer hostId, Pageable pageable);

    Page<Listing> findAllActive(Pageable pageable);

    List<Listing> findActiveByCity(String city);

    List<Listing> findActiveByCountry(String country);

    Optional<Listing> findByIdWithRelations(UUID id);

    Page<Listing> findByFilters(
            String city,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Integer minCapacity,
            UUID categoryId,
            Pageable pageable
    );

    Page<Listing> findAllForAdmin(
            String city,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Integer minCapacity,
            UUID categoryId,
            Pageable pageable
    );
}
