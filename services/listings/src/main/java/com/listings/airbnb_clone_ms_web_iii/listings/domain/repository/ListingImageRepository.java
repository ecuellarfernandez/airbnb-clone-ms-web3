package com.listings.airbnb_clone_ms_web_iii.listings.domain.repository;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.ListingImage;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ListingImageRepository {
    List<ListingImage> saveAll(List<ListingImage> listingImages);
    ListingImage save(ListingImage listingImage);
    void deleteById(UUID id);
    void deleteAllByListingId(UUID listingId);
    List<ListingImage> findByListingId(UUID listingId);
    Optional<ListingImage> findByPublicId(String publicId);
    void deleteByPublicId(String publicId);
}
