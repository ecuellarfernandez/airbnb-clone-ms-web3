package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public class UpdateListingDTO {

    @Size(min = 10, max = 100)
    private String title;

    @Size(min = 50, max = 1000)
    private String description;

    @Valid
    private LocationDTO location;

    @DecimalMin(value = "0.01")
    private BigDecimal priceAmount;

    private String priceCurrency;

    @Min(value = 1)
    @Max(value = 50)
    private Integer capacity;

    @Min(value = 0)
    private Integer bedrooms;

    @Min(value = 0)
    private Integer bathrooms;

    private Set<UUID> categoryIds;

    private Set<UUID> amenityIds;

    private List<CreateListingImageDTO> images;

    private Boolean isActive;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO location) {
        this.location = location;
    }

    public BigDecimal getPriceAmount() {
        return priceAmount;
    }

    public void setPriceAmount(BigDecimal priceAmount) {
        this.priceAmount = priceAmount;
    }

    public String getPriceCurrency() {
        return priceCurrency;
    }

    public void setPriceCurrency(String priceCurrency) {
        this.priceCurrency = priceCurrency;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(Integer bedrooms) {
        this.bedrooms = bedrooms;
    }

    public Integer getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(Integer bathrooms) {
        this.bathrooms = bathrooms;
    }

    public Set<UUID> getCategoryIds() {
        return categoryIds;
    }

    public void setCategoryIds(Set<UUID> categoryIds) {
        this.categoryIds = categoryIds;
    }

    public Set<UUID> getAmenityIds() {
        return amenityIds;
    }

    public void setAmenityIds(Set<UUID> amenityIds) {
        this.amenityIds = amenityIds;
    }

    public List<CreateListingImageDTO> getImages() {
        return images;
    }

    public void setImages(List<CreateListingImageDTO> images) {
        this.images = images;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
