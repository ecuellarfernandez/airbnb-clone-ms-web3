package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Configuración centralizada para la paginación.
 * Permite configurar límites y valores por defecto desde application.yml
 */
@Configuration
@ConfigurationProperties(prefix = "pagination")
public class PaginationConfig {

    /**
     * Tamaño de página por defecto
     */
    private int defaultPageSize = 10;

    /**
     * Tamaño máximo de página permitido
     */
    private int maxPageSize = 20;

    /**
     * Página inicial por defecto (0-based)
     */
    private int defaultPage = 0;

    /**
     * Campo de ordenamiento por defecto
     */
    private String defaultSortBy = "createdAt";

    /**
     * Dirección de ordenamiento por defecto
     */
    private String defaultSortDirection = "DESC";

    // Getters y Setters

    public int getDefaultPageSize() {
        return defaultPageSize;
    }

    public void setDefaultPageSize(int defaultPageSize) {
        this.defaultPageSize = defaultPageSize;
    }

    public int getMaxPageSize() {
        return maxPageSize;
    }

    public void setMaxPageSize(int maxPageSize) {
        this.maxPageSize = maxPageSize;
    }

    public int getDefaultPage() {
        return defaultPage;
    }

    public void setDefaultPage(int defaultPage) {
        this.defaultPage = defaultPage;
    }

    public String getDefaultSortBy() {
        return defaultSortBy;
    }

    public void setDefaultSortBy(String defaultSortBy) {
        this.defaultSortBy = defaultSortBy;
    }

    public String getDefaultSortDirection() {
        return defaultSortDirection;
    }

    public void setDefaultSortDirection(String defaultSortDirection) {
        this.defaultSortDirection = defaultSortDirection;
    }
}

