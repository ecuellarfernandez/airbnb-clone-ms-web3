package com.listings.airbnb_clone_ms_web_iii.listings.amenity.repository;

import com.listings.airbnb_clone_ms_web_iii.listings.amenity.model.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AmenityRepository extends JpaRepository<Amenity, UUID> {
}
