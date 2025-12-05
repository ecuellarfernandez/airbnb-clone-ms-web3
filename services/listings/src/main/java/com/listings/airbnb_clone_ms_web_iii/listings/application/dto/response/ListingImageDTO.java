package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response;

public class ListingImageDTO {
    private String id;
    private String mediaId;
    private String mediaUrl;
    private String publicId;
    private Boolean isPrimary;
    private Integer displayOrder;

    public ListingImageDTO() {
    }

    public ListingImageDTO(String id, String mediaId, String mediaUrl, String publicId, Boolean isPrimary, Integer displayOrder) {
        this.id = id;
        this.mediaId = mediaId;
        this.mediaUrl = mediaUrl;
        this.publicId = publicId;
        this.isPrimary = isPrimary;
        this.displayOrder = displayOrder;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMediaId() {
        return mediaId;
    }

    public void setMediaId(String mediaId) {
        this.mediaId = mediaId;
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
}
