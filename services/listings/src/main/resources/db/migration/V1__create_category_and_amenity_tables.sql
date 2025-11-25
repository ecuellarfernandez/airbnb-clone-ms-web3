-- ===========================================
-- TABLAS DE CATÁLOGOS (datos maestros)
-- ===========================================

-- Tabla de tipos de categoría (simplificada)
CREATE TABLE category_type (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insertar tipos por defecto
INSERT INTO category_type (name, description) VALUES
    ('Property Type', 'Type of accommodation'),
    ('Space Type', 'Type of space available');

-- Tabla de categorías
CREATE TABLE category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    category_type_id UUID NOT NULL,
    icon VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_category_type
        FOREIGN KEY (category_type_id)
        REFERENCES category_type(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_category_name_type
        UNIQUE (name, category_type_id)
);

-- Índice
CREATE INDEX idx_category_type ON category(category_type_id);

-- Insertar categorías por defecto
INSERT INTO category (name, category_type_id, icon)
SELECT 'House', id, 'house' FROM category_type WHERE name = 'Property Type'
UNION ALL
SELECT 'Apartment', id, 'apartment' FROM category_type WHERE name = 'Property Type'
UNION ALL
SELECT 'Villa', id, 'villa' FROM category_type WHERE name = 'Property Type'
UNION ALL
SELECT 'Cabin', id, 'cabin' FROM category_type WHERE name = 'Property Type'
UNION ALL
SELECT 'Entire place', id, 'entire' FROM category_type WHERE name = 'Space Type'
UNION ALL
SELECT 'Private room', id, 'private' FROM category_type WHERE name = 'Space Type'
UNION ALL
SELECT 'Shared room', id, 'shared' FROM category_type WHERE name = 'Space Type';

-- Tabla de comodidades (amenities)
CREATE TABLE amenity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    icon VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insertar amenities por defecto
INSERT INTO amenity (title, icon, description) VALUES
    ('WiFi', 'wifi', 'Wireless internet connection'),
    ('Pool', 'pool', 'Swimming pool'),
    ('Kitchen', 'kitchen', 'Full kitchen'),
    ('Free Parking', 'parking', 'Free parking on premises'),
    ('Air Conditioning', 'ac', 'Air conditioning'),
    ('Heating', 'heating', 'Central heating'),
    ('TV', 'tv', 'Television'),
    ('Washer', 'washer', 'Washing machine'),
    ('Dryer', 'dryer', 'Clothes dryer'),
    ('Gym', 'gym', 'Fitness center'),
    ('Hot Tub', 'hot-tub', 'Hot tub or jacuzzi'),
    ('Pet Friendly', 'pet', 'Pets allowed'),
    ('Smoke Alarm', 'alarm', 'Smoke alarm'),
    ('First Aid Kit', 'first-aid', 'First aid kit'),
    ('Fire Extinguisher', 'fire-ext', 'Fire extinguisher');

-- Comentarios
COMMENT ON TABLE category_type IS 'Tipos de categorías para clasificar listings';
COMMENT ON TABLE category IS 'Categorías específicas (ej: House, Apartment, etc.)';
COMMENT ON TABLE amenity IS 'Catálogo de comodidades disponibles';
