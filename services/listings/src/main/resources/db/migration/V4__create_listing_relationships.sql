-- ===========================================
-- TABLAS DE RELACIÓN (Many-to-Many)
-- ===========================================

-- Relación Listing <-> Category
CREATE TABLE listing_has_category (
    listing_id UUID NOT NULL,
    category_id UUID NOT NULL,

    PRIMARY KEY (listing_id, category_id),

    CONSTRAINT fk_listing_category_listing
        FOREIGN KEY (listing_id)
        REFERENCES listing(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_listing_category_category
        FOREIGN KEY (category_id)
        REFERENCES category(id)
        ON DELETE CASCADE
);

-- Relación Listing <-> Amenity
CREATE TABLE listing_has_amenity (
    listing_id UUID NOT NULL,
    amenity_id UUID NOT NULL,

    PRIMARY KEY (listing_id, amenity_id),

    CONSTRAINT fk_listing_amenity_listing
        FOREIGN KEY (listing_id)
        REFERENCES listing(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_listing_amenity_amenity
        FOREIGN KEY (amenity_id)
        REFERENCES amenity(id)
        ON DELETE CASCADE
);

-- Índices para optimizar joins
CREATE INDEX idx_listing_has_category_listing ON listing_has_category(listing_id);
CREATE INDEX idx_listing_has_category_category ON listing_has_category(category_id);
CREATE INDEX idx_listing_has_amenity_listing ON listing_has_amenity(listing_id);
CREATE INDEX idx_listing_has_amenity_amenity ON listing_has_amenity(amenity_id);

-- Comentarios
COMMENT ON TABLE listing_has_category IS 'Relación N-M entre listings y categorías';
COMMENT ON TABLE listing_has_amenity IS 'Relación N-M entre listings y amenities';
