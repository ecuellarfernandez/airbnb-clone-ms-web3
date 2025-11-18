package com.listings.airbnb_clone_ms_web_iii.listings.domain.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "category",
        uniqueConstraints = @UniqueConstraint(columnNames = {"name", "category_type_id"}))
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_type_id", nullable = false)
    private CategoryType categoryType;

    @Column(length = 50)
    private String icon;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Category() {
    }

    public Category(UUID id, String name, CategoryType categoryType, String icon, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.categoryType = categoryType;
        this.icon = icon;
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

    public CategoryType getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(CategoryType categoryType) {
        this.categoryType = categoryType;
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

    public static CategoryBuilder builder(){
        return new CategoryBuilder();
    }

    public static class CategoryBuilder {
        private UUID id;
        private String name;
        private CategoryType categoryType;
        private String icon;
        private LocalDateTime createdAt;

        public CategoryBuilder id(UUID id) {
            this.id = id;
            return this;
        }

        public CategoryBuilder name(String name) {
            this.name = name;
            return this;
        }

        public CategoryBuilder CategoryType(CategoryType categoryType) {
            this.categoryType = categoryType;
            return this;
        }

        public CategoryBuilder icon(String icon) {
            this.icon = icon;
            return this;
        }

        public CategoryBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public CategoryBuilder from(Category category) {
            if(category == null) return this;
            this.id = category.getId();
            this.name = category.getName();
            this.categoryType = category.getCategoryType();
            this.icon = category.getIcon();
            this.createdAt = category.getCreatedAt();
            return this;
        }

        public Category build(){
            return new Category(
                    id,
                    name,
                    categoryType,
                    icon,
                    createdAt
            );
        }
    }
}
