package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.services;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Category;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Listing;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.ListingImage;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.services.ListingDomainServiceInt;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

/**
 * Domain Service para logica de negocio de Listings que:
 * 1. Involucra multiples entidades
 * 2. No pertenece naturalmente a ninguna entidad especifica
 * 3. Contiene reglas de negocio complejas del dominio
 */
@Service
public class ListingDomainService implements ListingDomainServiceInt {

    /**
     * Valida que un listing cumpla con todas las reglas de negocio
     * para poder ser activado y publicado.
     *
     * @param listing El listing a validar
     * @throws IllegalStateException si el listing no cumple los requisitos
     */
    public void validateListingForActivation(Listing listing) {
        // Regla 1: Debe tener al menos una imagen
        if (listing.getImages() == null || listing.getImages().isEmpty()) {
            throw new IllegalStateException("Cannot activate listing without images");
        }

        // Regla 2: Debe tener exactamente una imagen principal
        long primaryImagesCount = listing.getImages().stream()
                .filter(ListingImage::getIsPrimary)
                .count();

        if (primaryImagesCount == 0) {
            throw new IllegalStateException("Cannot activate listing without a primary image");
        }

        if (primaryImagesCount > 1) {
            throw new IllegalStateException("Cannot activate listing with multiple primary images");
        }

        // Regla 3: Debe tener al menos una categoria
        if (listing.getCategories() == null || listing.getCategories().isEmpty()) {
            throw new IllegalStateException("Cannot activate listing without categories");
        }

        // Regla 4: Validar que tenga informacion de ubicacion completa
        if (listing.getLocation() == null ||
                listing.getLocation().getCity() == null ||
                listing.getLocation().getCountry() == null) {
            throw new IllegalStateException("Cannot activate listing without complete location information");
        }

        // Regla 5: El precio debe ser mayor a un mínimo (ej: $10)
        BigDecimal minimumPrice = new BigDecimal("10.00");
        if (listing.getPrice().getAmount().compareTo(minimumPrice) < 0) {
            throw new IllegalStateException(
                    String.format("Cannot activate listing with price below minimum of %s %s",
                            minimumPrice, listing.getPrice().getCurrency())
            );
        }
    }

    /**
     * Calcula el precio total para una estadía basado en el precio por noche
     * y el numero de noches. Aplica descuentos si aplica.
     *
     *
     * @param pricePerNight Precio por noche
     * @param numberOfNights Numero de noches
     * @return Precio total calculado con descuentos aplicados
     */
    public BigDecimal calculateTotalPrice(BigDecimal pricePerNight, int numberOfNights) {
        if (numberOfNights <= 0) {
            throw new IllegalArgumentException("Number of nights must be positive");
        }

        BigDecimal baseTotal = pricePerNight.multiply(BigDecimal.valueOf(numberOfNights));

        // Regla de negocio: Descuento por estadías largas
        // 7+ noches: 10% descuento
        // 30+ noches: 20% descuento
        BigDecimal discount = BigDecimal.ZERO;

        if (numberOfNights >= 30) {
            discount = new BigDecimal("0.20"); // 20%
        } else if (numberOfNights >= 7) {
            discount = new BigDecimal("0.10"); // 10%
        }

        BigDecimal discountAmount = baseTotal.multiply(discount);
        BigDecimal finalTotal = baseTotal.subtract(discountAmount);

        return finalTotal.setScale(2, BigDecimal.ROUND_HALF_UP);
    }

    /**
     * Determina si un listing debe ser destacado/featured basado en
     * múltiples criterios de calidad.
     *
     * @param listing El listing a evaluar
     * @return true si debe ser destacado
     */
    public boolean shouldBeFeatured(Listing listing) {
        int score = 0;

        // Criterio 1: Multiples imagenes (max 3 puntos)
        if (listing.getImages() != null) {
            int imageCount = listing.getImages().size();
            if (imageCount >= 5) score += 3;
            else if (imageCount >= 3) score += 2;
            else if (imageCount >= 1) score += 1;
        }

        // Criterio 2: Multiples amenities (max 2 puntos)
        if (listing.getAmenities() != null) {
            int amenityCount = listing.getAmenities().size();
            if (amenityCount >= 5) score += 2;
            else if (amenityCount >= 3) score += 1;
        }

        // Criterio 3: Descripcion detallada (1 punto)
        if (listing.getDescription() != null && listing.getDescription().length() > 200) {
            score += 1;
        }

        // Criterio 4: Ubicacion con coordenadas (1 punto)
        if (listing.getLocation() != null &&
                listing.getLocation().getLatitude() != null &&
                listing.getLocation().getLongitude() != null) {
            score += 1;
        }

        // Umbral: 5+ puntos para ser destacado
        boolean isFeatured = score >= 5;

        return isFeatured;
    }

    /**
     * Valida que las categorias asignadas a un listing sean compatibles.
     * Por ejemplo, no se puede tener "Entire Place" y "Shared Room" al mismo tiempo.
     *
     * @param categories Lista de categorías a validar
     * @throws IllegalStateException si hay categorías incompatibles
     */
    public void validateCategoryCompatibility(List<Category> categories) {
        if (categories == null || categories.isEmpty()) {
            return;
        }

        // Regla: Un listing no puede tener categorías de tipo "Space Type" que sean mutuamente excluyentes
        List<String> spaceTypeCategories = categories.stream()
                .filter(c -> c.getCategoryType() != null &&
                        "Space Type".equals(c.getCategoryType().getName()))
                .map(Category::getName)
                .toList();

        if (spaceTypeCategories.size() > 1) {
            throw new IllegalStateException(
                    "Listing cannot have multiple space type categories. Found: " + spaceTypeCategories
            );
        }
    }
}
