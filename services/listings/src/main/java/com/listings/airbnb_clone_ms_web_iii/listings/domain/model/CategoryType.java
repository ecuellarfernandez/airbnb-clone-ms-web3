package com.listings.airbnb_clone_ms_web_iii.listings.domain.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "category_type")
public class CategoryType {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(length = 255)
    private String description;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public CategoryType() {
    }

    public CategoryType(UUID id, String name, String description, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static CategoryTypeBuilder builder() {
        return new CategoryTypeBuilder();
    }

    public static class CategoryTypeBuilder{
        private UUID id;
        private String name;
        private String description;
        private LocalDateTime createdAt;

        public CategoryTypeBuilder id(UUID id) {
            this.id = id;
            return this;
        }

        public CategoryTypeBuilder name(String name) {
            this.name = name;
            return this;
        }

        public CategoryTypeBuilder description(String description) {
            this.description = description;
            return this;
        }

        public CategoryTypeBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public CategoryTypeBuilder from(CategoryType categoryType) {
            if(categoryType == null) return this;
            this.id = categoryType.id;
            this.name = categoryType.name;
            this.description = categoryType.description;
            this.createdAt = categoryType.createdAt;
            return this;
        }

        public CategoryType build() {
            return new CategoryType(id,name,description,createdAt);
        }
    }
}
