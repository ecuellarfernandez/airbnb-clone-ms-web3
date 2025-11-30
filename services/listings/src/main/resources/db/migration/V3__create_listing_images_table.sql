-- ===========================================
-- TABLA DE IMÁGENES DEL LISTING
-- ===========================================

CREATE TABLE listing_image (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL,

    media_url VARCHAR(500),

    -- Metadatos de la imagen
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INTEGER,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Foreign Key con cascade delete
    CONSTRAINT fk_listing_image_listing
        FOREIGN KEY (listing_id)
        REFERENCES listing(id)
        ON DELETE CASCADE
);

-- Índices
CREATE INDEX idx_listing_image_listing_id ON listing_image(listing_id);
CREATE INDEX idx_listing_image_primary ON listing_image(listing_id, is_primary);
CREATE INDEX idx_listing_image_order ON listing_image(listing_id, display_order);

-- Comentarios
COMMENT ON TABLE listing_image IS 'Imágenes asociadas a cada listing';
COMMENT ON COLUMN listing_image.media_url IS 'URL completa de la imagen (cache del media service)';
COMMENT ON COLUMN listing_image.is_primary IS 'Imagen principal que se muestra en listings summary';
COMMENT ON COLUMN listing_image.display_order IS 'Orden de visualización (1, 2, 3...)';
