package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class CreateListingImageDTO {

    @NotNull(message = "Media ID is required")
    private UUID mediaId;

    @NotNull(message = "Media URL is required")
    private String mediaUrl;

    private Boolean isPrimary = false;

    private Integer displayOrder;

    public CreateListingImageDTO() {
    }

    public CreateListingImageDTO(UUID mediaId, String mediaUrl, Boolean isPrimary, Integer displayOrder) {
        this.mediaId = mediaId;
        this.mediaUrl = mediaUrl;
        this.isPrimary = isPrimary != null ? isPrimary : false;
        this.displayOrder = displayOrder;
    }

    public static CreateListingImageDTOBuilder builder() {
        return new CreateListingImageDTOBuilder();
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

    public static class CreateListingImageDTOBuilder {
        private UUID mediaId;
        private String mediaUrl;
        private Boolean isPrimary = false;
        private Integer displayOrder;

        public CreateListingImageDTOBuilder mediaId(UUID mediaId) {
            this.mediaId = mediaId;
            return this;
        }

        public CreateListingImageDTOBuilder mediaUrl(String mediaUrl) {
            this.mediaUrl = mediaUrl;
            return this;
        }

        public CreateListingImageDTOBuilder isPrimary(Boolean isPrimary) {
            this.isPrimary = isPrimary;
            return this;
        }

        public CreateListingImageDTOBuilder displayOrder(Integer displayOrder) {
            this.displayOrder = displayOrder;
            return this;
        }

        public CreateListingImageDTO build() {
            return new CreateListingImageDTO(mediaId, mediaUrl, isPrimary, displayOrder);
        }
    }
}
