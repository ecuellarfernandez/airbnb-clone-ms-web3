package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.adapter;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.ListingImage;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.ListingImageRepository;
import com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.jpa.JpaListingImageRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class ListingImageRepositoryAdapter implements ListingImageRepository {

    private final JpaListingImageRepository jpaRepository;

    public ListingImageRepositoryAdapter(JpaListingImageRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public List<ListingImage> saveAll(List<ListingImage> listingImages) {
        return jpaRepository.saveAll(listingImages);
    }

    @Override
    public ListingImage save(ListingImage listingImage) {
        return jpaRepository.save(listingImage);
    }

    @Override
    public void deleteById(UUID id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public void deleteAllByListingId(UUID listingId){
        List<ListingImage> images = jpaRepository.findByListingId(listingId);
        for (ListingImage image : images) {
            jpaRepository.deleteById(image.getId());
        }
    }

    @Override
    public List<ListingImage> findByListingId(UUID listingId) {
        return jpaRepository.findByListingId(listingId);
    }

    @Override
    public Optional<ListingImage> findByPublicId(String publicId) {
        return jpaRepository.findByPublicId(publicId);
    }

    @Override
    public void deleteByPublicId(String publicId) {
        jpaRepository.deleteByPublicId(publicId);
    }
}

