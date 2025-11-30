package com.listings.airbnb_clone_ms_web_iii.listings.domain.repository;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.ListingImage;

import java.util.List;
import java.util.UUID;

public interface ListingImageRepository {
    List<ListingImage> saveAll(List<ListingImage> listingImages);
    ListingImage save(ListingImage listingImage);
    void deleteById(UUID id);
    List<ListingImage> findByListingId(UUID listingId);
}
