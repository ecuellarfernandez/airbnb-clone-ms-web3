package com.listings.airbnb_clone_ms_web_iii.listings.domain.repository;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Amenity;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface AmenityRepository {

    Optional<Amenity> findById(UUID id);

    List<Amenity> findAll();

    Set<Amenity> findAllByIds(Set<UUID> ids);
}
