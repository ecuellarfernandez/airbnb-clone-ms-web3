package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.jpa;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.ListingImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JpaListingImageRepository extends JpaRepository<ListingImage, UUID> {
    List<ListingImage> findByListingId(UUID listingId);
    Optional<ListingImage> findByPublicId(String publicId);
    void deleteByPublicId(String publicId);
    @Modifying
    @Query("DELETE FROM ListingImage li WHERE li.listingId = :listingId")
    void deleteAllByListingId(UUID listingId);

}

