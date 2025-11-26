package com.listings.airbnb_clone_ms_web_iii.listings.domain.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "amenity")
public class Amenity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 100)
    private String title;

    @Column(length = 255)
    private String description;

    @Column(length = 50)
    private String icon;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Amenity() {}

    public Amenity(UUID id, String title, String description, String icon, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.createdAt = createdAt;
    }

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

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static AmenityBuilder builder(){
        return new AmenityBuilder();
    }

    public static class AmenityBuilder {
        private UUID id;
        private String title;
        private String description;
        private String icon;
        private LocalDateTime createdAt;

        public AmenityBuilder id(UUID id) {
            this.id = id;
            return this;
        }

        public AmenityBuilder title(String title) {
            this.title = title;
            return this;
        }

        public AmenityBuilder description(String description) {
            this.description = description;
            return this;
        }

        public AmenityBuilder icon(String icon) {
            this.icon = icon;
            return this;
        }

        public AmenityBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public AmenityBuilder from(Amenity amenity) {
            if(amenity == null){
                return this;
            }
            this.id = amenity.getId();
            this.title = amenity.getTitle();
            this.description = amenity.getDescription();
            this.icon = amenity.getIcon();
            this.createdAt = amenity.getCreatedAt();
            return this;
        }

        public Amenity build() {
            return new Amenity(
                    id,
                    title,
                    description,
                    icon,
                    createdAt
            );
        }
    }
}
