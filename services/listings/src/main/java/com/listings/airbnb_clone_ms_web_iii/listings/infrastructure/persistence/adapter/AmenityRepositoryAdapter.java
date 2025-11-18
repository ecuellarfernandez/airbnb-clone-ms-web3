package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.adapter;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Amenity;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.AmenityRepository;
import com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.jpa.JpaAmenityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class AmenityRepositoryAdapter implements AmenityRepository {

    private final JpaAmenityRepository jpaRepository;

    @Override
    public Optional<Amenity> findById(UUID id) {
        log.debug("Finding amenity by ID: {}", id);
        return jpaRepository.findById(id);
    }

    @Override
    public List<Amenity> findAll() {
        log.debug("Finding all amenities");
        return jpaRepository.findAll();
    }

    @Override
    public Set<Amenity> findAllByIds(Set<UUID> ids) {
        log.debug("Finding amenities by IDs: {}", ids);
        return new HashSet<>(jpaRepository.findAllById(ids));
    }
}
