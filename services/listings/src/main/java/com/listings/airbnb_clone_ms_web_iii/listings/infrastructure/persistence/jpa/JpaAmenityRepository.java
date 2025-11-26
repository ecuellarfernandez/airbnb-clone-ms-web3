package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.jpa;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface JpaAmenityRepository extends JpaRepository<Amenity, UUID> {
}
