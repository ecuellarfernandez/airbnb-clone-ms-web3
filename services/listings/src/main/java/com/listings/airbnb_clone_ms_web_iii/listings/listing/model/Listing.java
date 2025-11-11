package com.listings.airbnb_clone_ms_web_iii.listings.listing.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class Listing {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 255, nullable = false)
    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private UUID hostId;

    @Column(nullable = false)
    private String mainPhotoUrl;

    @Column
    private Double latitude;

    @Column
    private Double longitude;

    // Provisional
    @ElementCollection
    @CollectionTable(name = "listing_photos", joinColumns = @JoinColumn(name = "listing_id"))
    @Column(nullable = false)
    private List<String> photosUrl;

    public Listing() {}

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public UUID getHostId() {
        return hostId;
    }

    public void setHostId(UUID hostId) {
        this.hostId = hostId;
    }
}
