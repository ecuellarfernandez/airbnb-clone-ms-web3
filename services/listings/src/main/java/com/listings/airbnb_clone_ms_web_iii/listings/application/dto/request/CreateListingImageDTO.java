package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class CreateListingImageDTO {

    @NotNull(message = "Media URL is required")
    private String mediaUrl;

    private String publicId;

    private Boolean isPrimary = false;

    private Integer displayOrder;

    public CreateListingImageDTO() {
    }

    public CreateListingImageDTO(UUID mediaId, String mediaUrl, String publicId, Boolean isPrimary, Integer displayOrder) {
        this.mediaUrl = mediaUrl;
        this.publicId = publicId;
        this.isPrimary = isPrimary != null ? isPrimary : false;
        this.displayOrder = displayOrder;
    }

    public static CreateListingImageDTOBuilder builder() {
        return new CreateListingImageDTOBuilder();
    }

    public String getMediaUrl() {
        return mediaUrl;
    }

    public void setMediaUrl(String mediaUrl) {
        this.mediaUrl = mediaUrl;
    }

    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
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

    // Alias methods for JSON compatibility
    public String getUrl() {
        return mediaUrl;
    }

    public void setUrl(String url) {
        this.mediaUrl = url;
    }

    public Boolean getIsCover() {
        return isPrimary;
    }

    public void setIsCover(Boolean isCover) {
        this.isPrimary = isCover;
    }

    public static class CreateListingImageDTOBuilder {
        private UUID mediaId;
        private String mediaUrl;
        private String publicId;
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

        public CreateListingImageDTOBuilder publicId(String publicId) {
            this.publicId = publicId;
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
            return new CreateListingImageDTO(mediaId, mediaUrl, publicId, isPrimary, displayOrder);
        }
    }
}
