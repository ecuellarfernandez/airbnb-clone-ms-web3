package com.listings.airbnb_clone_ms_web_iii.listings.domain.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

// Aggregate Root
@Entity
@Table(name = "listing")
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "host_id", nullable = false)
    private Integer hostId;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 1000, nullable = false)
    private String description;

    @Embedded
    private Location location;

    @Embedded
    @AttributeOverride(name = "amount", column = @Column(name = "price_amount", nullable = false))
    @AttributeOverride(name = "currency", column = @Column(name = "price_currency", nullable = false))
    private Price price;

    @Column(nullable = false)
    private Integer capacity;

    @Column
    private Integer bedrooms = 0;

    @Column
    private Integer bathrooms = 0;

    // Relacion con imagenes uno a muchos
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "listing_id")
    private List<ListingImage> images = new ArrayList<>();

    // Relacion con categorias muchos a muchos
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "listing_has_category",
            joinColumns = @JoinColumn(name = "listing_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories = new HashSet<>();

    // Relacion con amenities muchos a muchos
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "listing_has_amenity",
            joinColumns = @JoinColumn(name = "listing_id"),
            inverseJoinColumns = @JoinColumn(name = "amenity_id")
    )
    private Set<Amenity> amenities = new HashSet<>();

    @Column(name = "is_active")
    private Boolean isActive = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Listing() {
    }

    public Listing(UUID id, Integer hostId, String title, String description, Location location, Price price, Integer capacity, Integer bedrooms, Integer bathrooms, List<ListingImage> images, Set<Category> categories, Set<Amenity> amenities, Boolean isActive, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.hostId = hostId;
        this.title = title;
        this.description = description;
        this.location = location;
        this.price = price;
        this.capacity = capacity;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.images = images;
        this.categories = categories;
        this.amenities = amenities;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // ===== Logica de dominio

    // Gestion de imagenes
    public void addImage(ListingImage image) {
        this.images.add(image);
        if (this.id != null) {
            image.setListingId(this.id);
        }
    }

    public void setPrimaryImage(UUID imageId) {
        this.images.forEach(img -> img.setIsPrimary(false));

        this.images.stream()
                .filter(img -> img.getId().equals(imageId))
                .findFirst()
                .ifPresent(img -> img.setIsPrimary(true));
    }

    public ListingImage getPrimaryImage() {
        return this.images.stream()
                .filter(ListingImage::getIsPrimary)
                .findFirst()
                .orElse(this.images.isEmpty() ? null : this.images.get(0));
    }

    public String getPrimaryImageUrl(){
        ListingImage primaryImage = getPrimaryImage();
        return primaryImage != null ? primaryImage.getMediaUrl() : null;
    }

    // Gestion de categorias
    public void addCategory(Category category) {
        this.categories.add(category);
    }

    public void removeCategory(Category category) {
        this.categories.remove(category);
    }

    // Gestión de amenities
    public void addAmenity(Amenity amenity) {
        this.amenities.add(amenity);
    }

    public void removeAmenity(Amenity amenity) {
        this.amenities.remove(amenity);
    }

    // Activacion/desactivacion
    public void activate() {
        if (this.images.isEmpty()) {
            throw new IllegalStateException("Cannot activate listing without images");
        }
        if (this.categories.isEmpty()) {
            throw new IllegalStateException("Cannot activate listing without categories");
        }
        this.isActive = true;
    }

    public void deactivate() {
        this.isActive = false;
    }

    //getter y setter
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Price getPrice() {
        return price;
    }

    public void setPrice(Price price) {
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

    public List<ListingImage> getImages() {
        return images;
    }

    public void setImages(List<ListingImage> images) {
        this.images = images;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Set<Amenity> getAmenities() {
        return amenities;
    }

    public void setAmenities(Set<Amenity> amenities) {
        this.amenities = amenities;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // builder
    public static ListingBuilder builder() {
        return new ListingBuilder();
    }

    public static class ListingBuilder {
        private UUID id;
        private Integer hostId;
        private String title;
        private String description;
        private Location location;
        private Price price;
        private Integer capacity;
        private Integer bedrooms = 0;
        private Integer bathrooms = 0;
        private List<ListingImage> images = new ArrayList<>();
        private Set<Category> categories = new HashSet<>();
        private Set<Amenity> amenities = new HashSet<>();
        private Boolean isActive = false;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public ListingBuilder id(UUID id) {
            this.id = id;
            return this;
        }

        public ListingBuilder hostId(Integer hostId) {
            this.hostId = hostId;
            return this;
        }

        public ListingBuilder title(String title) {
            this.title = title;
            return this;
        }

        public ListingBuilder description(String description) {
            this.description = description;
            return this;
        }

        public ListingBuilder location(Location location) {
            this.location = location;
            return this;
        }

        public ListingBuilder price(Price price) {
            this.price = price;
            return this;
        }

        public ListingBuilder capacity(Integer capacity) {
            this.capacity = capacity;
            return this;
        }

        public ListingBuilder bedrooms(Integer bedrooms) {
            this.bedrooms = bedrooms;
            return this;
        }

        public ListingBuilder bathrooms(Integer bathrooms) {
            this.bathrooms = bathrooms;
            return this;
        }

        public ListingBuilder images(List<ListingImage> images) {
            this.images = images == null ? new ArrayList<>() : images;
            return this;
        }

        public ListingBuilder addImage(ListingImage image) {
            if (this.images == null) this.images = new ArrayList<>();
            this.images.add(image);
            return this;
        }

        public ListingBuilder categories(Set<Category> categories) {
            this.categories = categories == null ? new HashSet<>() : categories;
            return this;
        }

        public ListingBuilder addCategory(Category category) {
            if (this.categories == null) this.categories = new HashSet<>();
            this.categories.add(category);
            return this;
        }

        public ListingBuilder amenities(Set<Amenity> amenities) {
            this.amenities = amenities == null ? new HashSet<>() : amenities;
            return this;
        }

        public ListingBuilder addAmenity(Amenity amenity) {
            if (this.amenities == null) this.amenities = new HashSet<>();
            this.amenities.add(amenity);
            return this;
        }

        public ListingBuilder isActive(Boolean isActive) {
            this.isActive = isActive;
            return this;
        }

        public ListingBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public ListingBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public ListingBuilder from(Listing listing) {
            if (listing == null) return this;
            this.id = listing.getId();
            this.hostId = listing.getHostId();
            this.title = listing.getTitle();
            this.description = listing.getDescription();
            this.location = listing.getLocation();
            this.price = listing.getPrice();
            this.capacity = listing.getCapacity();
            this.bedrooms = listing.getBedrooms();
            this.bathrooms = listing.getBathrooms();
            this.images = listing.getImages() == null ? new ArrayList<>() : new ArrayList<>(listing.getImages());
            this.categories = listing.getCategories() == null ? new HashSet<>() : new HashSet<>(listing.getCategories());
            this.amenities = listing.getAmenities() == null ? new HashSet<>() : new HashSet<>(listing.getAmenities());
            this.isActive = listing.getActive();
            this.createdAt = listing.getCreatedAt();
            this.updatedAt = listing.getUpdatedAt();
            return this;
        }

        public Listing build() {
            return new Listing(
                    id,
                    hostId,
                    title,
                    description,
                    location,
                    price,
                    capacity,
                    bedrooms,
                    bathrooms,
                    images,
                    categories,
                    amenities,
                    isActive,
                    createdAt,
                    updatedAt
            );
        }
    }
}

