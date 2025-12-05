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

-- Insertar tipos por defecto con UUIDs fijos
INSERT INTO category_type (id, name, description) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'Property Type', 'Type of accommodation'),
    ('550e8400-e29b-41d4-a716-446655440002', 'Space Type', 'Type of space available');

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

-- Insertar categorías por defecto con UUIDs fijos
INSERT INTO category (id, name, category_type_id, icon) VALUES
    ('650e8400-e29b-41d4-a716-446655440001', 'House', '550e8400-e29b-41d4-a716-446655440001', 'house'),
    ('650e8400-e29b-41d4-a716-446655440002', 'Apartment', '550e8400-e29b-41d4-a716-446655440001', 'apartment'),
    ('650e8400-e29b-41d4-a716-446655440003', 'Villa', '550e8400-e29b-41d4-a716-446655440001', 'villa'),
    ('650e8400-e29b-41d4-a716-446655440004', 'Cabin', '550e8400-e29b-41d4-a716-446655440001', 'cabin'),
    ('650e8400-e29b-41d4-a716-446655440005', 'Entire place', '550e8400-e29b-41d4-a716-446655440002', 'entire'),
    ('650e8400-e29b-41d4-a716-446655440006', 'Private room', '550e8400-e29b-41d4-a716-446655440002', 'private'),
    ('650e8400-e29b-41d4-a716-446655440007', 'Shared room', '550e8400-e29b-41d4-a716-446655440002', 'shared');

-- Tabla de comodidades (amenities)
CREATE TABLE amenity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    icon VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insertar amenities por defecto con UUIDs fijos
INSERT INTO amenity (id, title, icon, description) VALUES
    ('750e8400-e29b-41d4-a716-446655440001', 'WiFi', 'wifi', 'Wireless internet connection'),
    ('750e8400-e29b-41d4-a716-446655440002', 'Pool', 'pool', 'Swimming pool'),
    ('750e8400-e29b-41d4-a716-446655440003', 'Kitchen', 'kitchen', 'Full kitchen'),
    ('750e8400-e29b-41d4-a716-446655440004', 'Free Parking', 'parking', 'Free parking on premises'),
    ('750e8400-e29b-41d4-a716-446655440005', 'Air Conditioning', 'ac', 'Air conditioning'),
    ('750e8400-e29b-41d4-a716-446655440006', 'Heating', 'heating', 'Central heating'),
    ('750e8400-e29b-41d4-a716-446655440007', 'TV', 'tv', 'Television'),
    ('750e8400-e29b-41d4-a716-446655440008', 'Washer', 'washer', 'Washing machine'),
    ('750e8400-e29b-41d4-a716-446655440009', 'Dryer', 'dryer', 'Clothes dryer'),
    ('750e8400-e29b-41d4-a716-446655440010', 'Gym', 'gym', 'Fitness center'),
    ('750e8400-e29b-41d4-a716-446655440011', 'Hot Tub', 'hot-tub', 'Hot tub or jacuzzi'),
    ('750e8400-e29b-41d4-a716-446655440012', 'Pet Friendly', 'pet', 'Pets allowed'),
    ('750e8400-e29b-41d4-a716-446655440013', 'Smoke Alarm', 'alarm', 'Smoke alarm'),
    ('750e8400-e29b-41d4-a716-446655440014', 'First Aid Kit', 'first-aid', 'First aid kit'),
    ('750e8400-e29b-41d4-a716-446655440015', 'Fire Extinguisher', 'fire-ext', 'Fire extinguisher');

-- Comentarios
COMMENT ON TABLE category_type IS 'Tipos de categorías para clasificar listings';
COMMENT ON TABLE category IS 'Categorías específicas (ej: House, Apartment, etc.)';
COMMENT ON TABLE amenity IS 'Catálogo de comodidades disponibles';
