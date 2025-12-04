package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.adapter;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Listing;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.ListingRepository;
import com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.jpa.JpaListingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
public class ListingRepositoryAdapter implements ListingRepository {

    private final JpaListingRepository jpaRepository;

    public ListingRepositoryAdapter(JpaListingRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Listing save(Listing listing) {
        return jpaRepository.save(listing);
    }

    @Override
    public Optional<Listing> findById(UUID id) {
        return jpaRepository.findById(id);
    }

    @Override
    public List<Listing> findAll() {
        return jpaRepository.findAll();
    }

    @Override
    public void deleteById(UUID id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public boolean existsById(UUID id) {
        return jpaRepository.existsById(id);
    }

    @Override
    public Page<Listing> findByHostId(Integer hostId, Pageable pageable) {
        return jpaRepository.findByHostId(hostId, pageable);
    }

    @Override
    public Page<Listing> findAllActive(Pageable pageable) {
        return jpaRepository.findByIsActiveTrue(pageable);
    }

    @Override
    public List<Listing> findActiveByCity(String city) {
        return jpaRepository.findActiveByCityIgnoreCase(city);
    }

    @Override
    public List<Listing> findActiveByCountry(String country) {
        return jpaRepository.findActiveByCountryIgnoreCase(country);
    }

    @Override
    public Optional<Listing> findByIdWithRelations(UUID id) {
        return jpaRepository.findByIdWithRelations(id);
    }

    @Override
    public Page<Listing> findByFilters(
            String city,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Integer minCapacity,
            UUID categoryId,
            Pageable pageable
    ) {
        return jpaRepository.findByFilters(city, minPrice, maxPrice, minCapacity, categoryId, pageable);
    }

    @Override
    public Page<Listing> findAllForAdmin(String city, BigDecimal minPrice, BigDecimal maxPrice, Integer minCapacity, UUID categoryId, Pageable pageable) {
        return jpaRepository.findAllForAdmin(city, minPrice, maxPrice, minCapacity, categoryId, pageable);
    }
}
