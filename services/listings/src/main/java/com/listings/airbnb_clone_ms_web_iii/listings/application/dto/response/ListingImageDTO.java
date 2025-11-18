package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response;

import java.util.UUID;

public class ListingImageDTO {
    private UUID id;
    private UUID mediaId;
    private String mediaUrl;
    private Boolean isPrimary;
    private Integer displayOrder;

    public ListingImageDTO() {
    }

    public ListingImageDTO(UUID id, UUID mediaId, String mediaUrl, Boolean isPrimary, Integer displayOrder) {
        this.id = id;
        this.mediaId = mediaId;
        this.mediaUrl = mediaUrl;
        this.isPrimary = isPrimary;
        this.displayOrder = displayOrder;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getMediaId() {
        return mediaId;
    }

    public void setMediaId(UUID mediaId) {
        this.mediaId = mediaId;
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
}
