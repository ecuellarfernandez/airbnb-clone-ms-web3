package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

public class CategoryDTO {
    private UUID id;
    private String name;
    private String icon;
    private String categoryTypeName;

    public CategoryDTO() {
    }

    public CategoryDTO(UUID id, String name, String icon, String categoryTypeName) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.categoryTypeName = categoryTypeName;
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

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getCategoryTypeName() {
        return categoryTypeName;
    }

    public void setCategoryTypeName(String categoryTypeName) {
        this.categoryTypeName = categoryTypeName;
    }
}
