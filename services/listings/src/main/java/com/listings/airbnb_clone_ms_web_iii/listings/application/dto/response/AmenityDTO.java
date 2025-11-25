package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response;

import java.util.UUID;

public class AmenityDTO {
    private UUID id;
    private String title;
    private String description;
    private String icon;

    public AmenityDTO() {
    }

    public AmenityDTO(UUID id, String title, String description, String icon) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.icon = icon;
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
}
