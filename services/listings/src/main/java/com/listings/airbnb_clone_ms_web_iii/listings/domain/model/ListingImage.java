package com.listings.airbnb_clone_ms_web_iii.listings.domain.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "listing_image")
public class ListingImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "listing_id", nullable = false)
    private UUID listingId;

    @Column(name = "media_url", length = 500)
    private String mediaUrl;

    @Column(name = "is_primary", nullable = false)
    private Boolean isPrimary = false;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public ListingImage() {
    }

    public ListingImage(UUID id, UUID listingId, String mediaUrl, Boolean isPrimary, Integer displayOrder, LocalDateTime createdAt) {
        this.id = id;
        this.listingId = listingId;
        this.mediaUrl = mediaUrl;
        this.isPrimary = isPrimary != null ? isPrimary : false;
        this.displayOrder = displayOrder;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public static ListingImageBuilder builder() {
        return new ListingImageBuilder();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getListingId() {
        return listingId;
    }

    public void setListingId(UUID listingId) {
        this.listingId = listingId;
    }

    public String getMediaUrl() {
        return mediaUrl;
    }

    public void setMediaUrl(String mediaUrl) {
        this.mediaUrl = mediaUrl;
    }

    public Boolean getIsPrimary() {
        return isPrimary;
    }

    public void setIsPrimary(Boolean isPrimary) {
        this.isPrimary = isPrimary;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static class ListingImageBuilder {
        private UUID id;
        private UUID listingId;
        private String mediaUrl;
        private Boolean isPrimary = false;
        private Integer displayOrder;
        private LocalDateTime createdAt;

        public ListingImageBuilder id(UUID id) {
            this.id = id;
            return this;
        }

        public ListingImageBuilder listingId(UUID listingId) {
            this.listingId = listingId;
            return this;
        }

        public ListingImageBuilder mediaUrl(String mediaUrl) {
            this.mediaUrl = mediaUrl;
            return this;
        }

        public ListingImageBuilder isPrimary(Boolean isPrimary) {
            this.isPrimary = isPrimary;
            return this;
        }

        public ListingImageBuilder displayOrder(Integer displayOrder) {
            this.displayOrder = displayOrder;
            return this;
        }

        public ListingImageBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public ListingImage build() {
            return new ListingImage(id, listingId, mediaUrl, isPrimary, displayOrder, createdAt);
        }
    }
}
