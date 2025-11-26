-- ===========================================
-- TABLA PRINCIPAL DE LISTINGS
-- ===========================================

CREATE TABLE listing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Información básica
    title VARCHAR(100) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    host_id UUID NOT NULL,

    -- Ubicación (Value Object: Location)
    city VARCHAR(100),
    country VARCHAR(100),
    address VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),

    -- Precio (Value Object: Price)
    price_amount DECIMAL(10, 2) NOT NULL,
    price_currency VARCHAR(3) DEFAULT 'USD',

    -- Detalles del alojamiento
    capacity INTEGER NOT NULL,
    bedrooms INTEGER DEFAULT 0,
    bathrooms INTEGER DEFAULT 0,

    -- Estado
    is_active BOOLEAN DEFAULT FALSE,

    -- Auditoría
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    CONSTRAINT chk_capacity CHECK (capacity > 0),
    CONSTRAINT chk_bedrooms CHECK (bedrooms >= 0),
    CONSTRAINT chk_bathrooms CHECK (bathrooms >= 0),
    CONSTRAINT chk_price CHECK (price_amount > 0)
);

-- Índices para optimizar búsquedas
CREATE INDEX idx_listing_host ON listing(host_id);
CREATE INDEX idx_listing_city ON listing(city);
CREATE INDEX idx_listing_country ON listing(country);
CREATE INDEX idx_listing_is_active ON listing(is_active);
CREATE INDEX idx_listing_price ON listing(price_amount);
CREATE INDEX idx_listing_created_at ON listing(created_at DESC);

-- Comentarios
COMMENT ON TABLE listing IS 'Alojamientos publicados por anfitriones';
COMMENT ON COLUMN listing.host_id IS 'Referencia al usuario anfitrión en identity service';
COMMENT ON COLUMN listing.is_active IS 'true = publicado, false = borrador';
COMMENT ON COLUMN listing.price_currency IS 'Código ISO de moneda (USD, EUR, MXN, etc.)';
