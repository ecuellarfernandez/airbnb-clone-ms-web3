-- Tabla principal de tipo de categoría
CREATE TABLE category_type (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

-- Tabla de categorías (pertenece a un tipo)
CREATE TABLE category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    category_type_id UUID NOT NULL,
    CONSTRAINT fk_category_type FOREIGN KEY (category_type_id)
        REFERENCES category_type(id) ON DELETE CASCADE
);

-- Tabla de comodidades
CREATE TABLE amenity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255)
);

-- Tabla principal de listings
CREATE TABLE listing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price NUMERIC(12,2) NOT NULL,
    capacity INTEGER NOT NULL,
    host_id UUID NOT NULL,
    main_photo_url VARCHAR(255) NOT NULL,
    latitude NUMERIC(10, 8),
    longitude NUMERIC(11, 8)
);

-- Tabla para fotos adicionales del listing (relación @ElementCollection)
CREATE TABLE listing_photos (
    listing_id UUID NOT NULL,
    photo_url VARCHAR(255) NOT NULL,
    CONSTRAINT fk_listing_photos FOREIGN KEY (listing_id)
        REFERENCES listing(id) ON DELETE CASCADE
);

-- Tabla de relación muchos-a-muchos: Listing <-> Category
CREATE TABLE listing_has_category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL,
    category_id UUID NOT NULL,
    CONSTRAINT fk_listing_category_listing FOREIGN KEY (listing_id)
        REFERENCES listing(id) ON DELETE CASCADE,
    CONSTRAINT fk_listing_category_category FOREIGN KEY (category_id)
        REFERENCES category(id) ON DELETE CASCADE
);

-- Tabla de relación muchos-a-muchos: Listing <-> Amenity
CREATE TABLE listing_has_amenity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL,
    amenity_id UUID NOT NULL,
    CONSTRAINT fk_listing_amenity_listing FOREIGN KEY (listing_id)
        REFERENCES listing(id) ON DELETE CASCADE,
    CONSTRAINT fk_listing_amenity_amenity FOREIGN KEY (amenity_id)
        REFERENCES amenity(id) ON DELETE CASCADE
);

-- Índices opcionales para mejorar rendimiento en consultas frecuentes
CREATE INDEX idx_listing_host ON listing(host_id);
CREATE INDEX idx_category_type ON category(category_type_id);
CREATE INDEX idx_listing_has_category_listing ON listing_has_category(listing_id);
CREATE INDEX idx_listing_has_category_category ON listing_has_category(category_id);
CREATE INDEX idx_listing_has_amenity_listing ON listing_has_amenity(listing_id);
CREATE INDEX idx_listing_has_amenity_amenity ON listing_has_amenity(amenity_id);
