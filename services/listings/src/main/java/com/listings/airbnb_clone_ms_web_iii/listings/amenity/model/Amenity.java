package com.listings.airbnb_clone_ms_web_iii.listings.amenity.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class Amenity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 255, nullable = true)
    private String description;

    public Amenity() {}

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
}
