package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.adapter;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Amenity;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.AmenityRepository;
import com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.jpa.JpaAmenityRepository;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Component
public class AmenityRepositoryAdapter implements AmenityRepository {

    private final JpaAmenityRepository jpaRepository;

    public AmenityRepositoryAdapter(JpaAmenityRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Optional<Amenity> findById(UUID id) {
        return jpaRepository.findById(id);
    }

    @Override
    public List<Amenity> findAll() {
        return jpaRepository.findAll();
    }

    @Override
    public Set<Amenity> findAllByIds(Set<UUID> ids) {
        return new HashSet<>(jpaRepository.findAllById(ids));
    }
}
