package com.listings.airbnb_clone_ms_web_iii.listings.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.*;

// Aggregate Root
@Entity
@Table(name = "listing")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "host_id", nullable = false)
    private UUID hostId;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 1000, nullable = false)
    private String description;

    @Embedded
    private Location location;

    @Embedded
    private Price price;

    @Column(nullable = false)
    private Integer capacity;

    @Column
    @Builder.Default
    private Integer bedrooms = 0;

    @Column
    @Builder.Default
    private Integer bathrooms = 0;

    // Relacion con imagenes uno a muchos
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "listing_id")
    @Builder.Default
    private List<ListingImage> images = new ArrayList<>();

    // Relacion con categorias muchos a muchos
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "listing_has_category",
            joinColumns = @JoinColumn(name = "listing_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    @Builder.Default
    private Set<Category> categories = new HashSet<>();

    // Relacion con amenities muchos a muchos
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "listing_has_amenity",
            joinColumns = @JoinColumn(name = "listing_id"),
            inverseJoinColumns = @JoinColumn(name = "amenity_id")
    )
    @Builder.Default
    private Set<Amenity> amenities = new HashSet<>();

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

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
}
