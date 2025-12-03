package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public class CreateListingDTO {

    @NotNull(message = "Host ID is required")
    private Integer hostId;

    @NotBlank(message = "Title is required")
    @Size(min = 10, max = 100, message = "Title must be between 10 and 100 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 50, max = 1000, message = "Description must be between 50 and 1000 characters")
    private String description;

    @Valid
    @NotNull(message = "Location is required")
    private LocationDTO location;

    @Valid
    @NotNull(message = "Price is required")
    private PriceDTO price;

    @NotNull(message = "Capacity is required")
    @Min(value = 1, message = "Capacity must be at least 1")
    @Max(value = 50, message = "Capacity cannot exceed 50")
    private Integer capacity;

    @Min(value = 0, message = "Bedrooms cannot be negative")
    private Integer bedrooms = 0;

    @Min(value = 0, message = "Bathrooms cannot be negative")
    private Integer bathrooms = 0;

    @NotEmpty(message = "At least one category is required")
    private Set<UUID> categoryIds;

    private Set<UUID> amenityIds;

    @NotEmpty(message = "At least one image is required")
    private List<CreateListingImageDTO> images;

    public CreateListingDTO() {}

    public CreateListingDTO(Integer hostId, String title, String description, LocationDTO location, PriceDTO price, Integer capacity, Integer bedrooms, Integer bathrooms, Set<UUID> categoryIds, Set<UUID> amenityIds, List<CreateListingImageDTO> images) {
        this.hostId = hostId;
        this.title = title;
        this.description = description;
        this.location = location;
        this.price = price;
        this.capacity = capacity;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.categoryIds = categoryIds;
        this.amenityIds = amenityIds;
        this.images = images;
    }

    public Integer getHostId() {
        return hostId;
    }

    public void setHostId(Integer hostId) {
        this.hostId = hostId;
    }

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

    public PriceDTO getPrice() {
        return price;
    }

    public void setPrice(PriceDTO price) {
        this.price = price;
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

    public static CreateListingDTOBuilder builder() {
        return new CreateListingDTOBuilder();
    };

    public static class CreateListingDTOBuilder {
        private Integer hostId;
        private String title;
        private String description;
        private LocationDTO location;
        private PriceDTO price;
        private Integer capacity;
        private Integer bedrooms;
        private Integer bathrooms;
        private Set<UUID> categoryIds;
        private Set<UUID> amenityIds;
        private List<CreateListingImageDTO> images;

        public  CreateListingDTOBuilder hostId(Integer hostId) {
            this.hostId = hostId;
            return this;
        }

        public  CreateListingDTOBuilder title(String title) {
            this.title = title;
            return this;
        }

        public  CreateListingDTOBuilder description(String description) {
            this.description = description;
            return this;
        }

        public  CreateListingDTOBuilder location(LocationDTO location) {
            this.location = location;
            return this;
        }

        public  CreateListingDTOBuilder price(PriceDTO price) {
            this.price = price;
            return this;
        }

        public  CreateListingDTOBuilder capacity(Integer capacity) {
            this.capacity = capacity;
            return this;
        }

        public  CreateListingDTOBuilder bedrooms(Integer bedrooms) {
            this.bedrooms = bedrooms;
            return this;
        }

        public  CreateListingDTOBuilder bathrooms(Integer bathrooms) {
            this.bathrooms = bathrooms;
            return this;
        }

        public  CreateListingDTOBuilder categoryIds(Set<UUID> categoryIds) {
            this.categoryIds = categoryIds;
            return this;
        }

        public  CreateListingDTOBuilder amenityIds(Set<UUID> amenityIds) {
            this.amenityIds = amenityIds;
            return this;
        }

        public  CreateListingDTOBuilder images(List<CreateListingImageDTO> images) {
            this.images = images;
            return this;
        }

        public CreateListingDTO build() {
            return new CreateListingDTO(hostId, title, description, location, price, capacity, bedrooms, bathrooms, categoryIds, amenityIds, images);
        }

    }

}
