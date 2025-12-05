-- ===========================================
-- DATA SEED: LISTINGS + LISTING_IMAGES + RELATIONS
-- V8__insert_listings.sql
-- Inserts con UUIDs fijos para uso en desarrollo
-- ===========================================

-- Nota: algunos campos (address, latitude, longitude) se dejan NULL o vacíos
-- host_id se fija en 1 para todos los registros de ejemplo (ajustar según tu environment)

-- LISTINGS
INSERT INTO listing (id, title, description, host_id, city, country, address, latitude, longitude, price_amount, price_currency, capacity, bedrooms, bathrooms, is_active)
VALUES
('a1111111-1111-4111-8111-111111111111', 'Modern apt in Equipetrol', 'Near restaurants and nightlife. Pool and gym.', 1, 'Santa Cruz', 'Bolivia', NULL, NULL, NULL, 100.00, 'USD', 2, 1, 1, TRUE),
('a1111111-1111-4111-8111-111111111112', 'Rustic cabin', 'Escape the noise, amazing views.', 1, 'Tarija', 'Bolivia', NULL, NULL, NULL, 160.00, 'USD', 4, 2, 2, TRUE),
('a1111111-1111-4111-8111-111111111113', 'Minimalist loft', 'Open space with lots of light.', 1, 'Santa Cruz', 'Bolivia', NULL, NULL, NULL, 110.00, 'USD', 3, 2, 1, TRUE),
('a1111111-1111-4111-8111-111111111114', 'Budget room', 'Affordable for backpackers.', 1, 'Sucre', 'Bolivia', NULL, NULL, NULL, 60.00, 'USD', 1, 0, 1, TRUE),
('a1111111-1111-4111-8111-111111111115', 'Penthouse with view', 'Panoramic terrace and jacuzzi.', 1, 'La Paz', 'Bolivia', NULL, NULL, NULL, 300.00, 'USD', 4, 3, 3, TRUE),
('a1111111-1111-4111-8111-111111111116', 'Practical studio', 'Ideal for work trips.', 1, 'Cochabamba', 'Bolivia', NULL, NULL, NULL, 85.00, 'USD', 2, 1, 1, TRUE),
('a1111111-1111-4111-8111-111111111117', 'Eco lodge in the valley', 'Surrounded by nature and hiking trails.', 1, 'Cochabamba', 'Bolivia', NULL, NULL, NULL, 200.00, 'USD', 6, 3, 2, TRUE),
('a1111111-1111-4111-8111-111111111118', 'Downtown apartment', 'Next to the main square and coffee shops.', 1, 'Santa Cruz', 'Bolivia', NULL, NULL, NULL, 130.00, 'USD', 3, 2, 1, TRUE),
('a1111111-1111-4111-8111-111111111119', 'Mountain view cabin', 'Private cabin with hot tub and fireplace.', 1, 'La Paz', 'Bolivia', NULL, NULL, NULL, 250.00, 'USD', 5, 3, 2, TRUE),
('a1111111-1111-4111-8111-111111111120', 'Artisan hostel', 'Local design, shared kitchen and terrace.', 1, 'Sucre', 'Bolivia', NULL, NULL, NULL, 70.00, 'USD', 2, 1, 1, TRUE),
('a1111111-1111-4111-8111-111111111121', 'Luxury villa with pool', 'Private pool, BBQ area, and large garden.', 1, 'Santa Cruz', 'Bolivia', NULL, NULL, NULL, 450.00, 'USD', 8, 4, 4, TRUE),
('a1111111-1111-4111-8111-111111111122', 'Tiny house in vineyard', 'Romantic getaway surrounded by vineyards.', 1, 'Tarija', 'Bolivia', NULL, NULL, NULL, 150.00, 'USD', 2, 1, 1, TRUE),
('a1111111-1111-4111-8111-111111111123', 'Colonial suite', 'Restored colonial suite with balcony view.', 1, 'Sucre', 'Bolivia', NULL, NULL, NULL, 95.00, 'USD', 3, 2, 1, TRUE),
('a1111111-1111-4111-8111-111111111124', 'Modern studio near stadium', 'Perfect for business trips, fast WiFi included.', 1, 'Cochabamba', 'Bolivia', NULL, NULL, NULL, 105.00, 'USD', 2, 1, 1, TRUE),
('a1111111-1111-4111-8111-111111111125', 'Hostal Andes', 'Simple and central, ideal for short stays.', 1, 'La Paz', 'Bolivia', NULL, NULL, NULL, 55.00, 'USD', 1, 0, 1, TRUE),
('a1111111-1111-4111-8111-111111111126', 'Boutique hotel room', 'Exclusive decor and excellent service.', 1, 'Tarija', 'Bolivia', NULL, NULL, NULL, 170.00, 'USD', 3, 2, 1, TRUE),
('a1111111-1111-4111-8111-111111111127', 'Executive suite in Las Palmas', 'Zona Las Palmas: ideal para trabajo, cerca de bancos y cafés.', 1, 'Santa Cruz', 'Bolivia', NULL, NULL, NULL, 140.00, 'USD', 2, 1, 1, TRUE),
('a1111111-1111-4111-8111-111111111128', 'Urubó house with pool', 'Urbanización tranquila en Urubó, con piscina y parrillero.', 1, 'Santa Cruz', 'Bolivia', NULL, NULL, NULL, 260.00, 'USD', 6, 3, 3, TRUE),
('a1111111-1111-4111-8111-111111111129', 'Boho loft by Plaza 24 de Septiembre', 'En el Casco Viejo, a pasos de la plaza principal.', 1, 'Santa Cruz', 'Bolivia', NULL, NULL, NULL, 120.00, 'USD', 2, 1, 1, TRUE),
('a1111111-1111-4111-8111-111111111130', 'Suite in Valle de la Concepción', 'Ruta del vino: catas y viñedos cercanos.', 1, 'Tarija', 'Bolivia', NULL, NULL, NULL, 180.00, 'USD', 2, 1, 1, TRUE),
('a1111111-1111-4111-8111-111111111131', 'Cabin by Guadalquivir River', 'Deck con vista al río y fogatero exterior.', 1, 'Tarija', 'Bolivia', NULL, NULL, NULL, 140.00, 'USD', 4, 2, 1, TRUE),
('a1111111-1111-4111-8111-111111111132', 'Adobe house in San Lorenzo', 'Arquitectura colonial con patio y parrilla.', 1, 'Tarija', 'Bolivia', NULL, NULL, NULL, 130.00, 'USD', 3, 2, 1, TRUE),
('a1111111-1111-4111-8111-111111111133', 'Boutique room near main square', 'Camina a cafés y restaurantes del centro.', 1, 'Tarija', 'Bolivia', NULL, NULL, NULL, 90.00, 'USD', 2, 1, 1, TRUE),
('a1111111-1111-4111-8111-111111111134', 'Apartment in Historic Center', 'Balcón con vista a calles coloniales; WiFi rápido.', 1, 'Sucre', 'Bolivia', NULL, NULL, NULL, 110.00, 'USD', 3, 2, 1, TRUE),
('a1111111-1111-4111-8111-111111111135', 'House with patio in La Recoleta', 'Cerca del mirador y museo de La Recoleta.', 1, 'Sucre', 'Bolivia', NULL, NULL, NULL, 150.00, 'USD', 4, 2, 2, TRUE),
('a1111111-1111-4111-8111-111111111136', 'Studio by Parque Bolívar', 'Zona tranquila para pasear y hacer picnic.', 1, 'Sucre', 'Bolivia', NULL, NULL, NULL, 85.00, 'USD', 2, 1, 1, TRUE),
('a1111111-1111-4111-8111-111111111137', 'Apartment in Sopocachi', 'Cerca del Montículo, cafés y vida cultural.', 1, 'La Paz', 'Bolivia', NULL, NULL, NULL, 140.00, 'USD', 2, 1, 1, TRUE),
('a1111111-1111-4111-8111-111111111138', 'Suite in Calacoto / San Miguel', 'Zona Sur: tiendas y restaurantes a pocos pasos.', 1, 'La Paz', 'Bolivia', NULL, NULL, NULL, 190.00, 'USD', 2, 1, 1, TRUE),
('a1111111-1111-4111-8111-111111111139', 'Cabin near Valle de la Luna', 'Mallasa: terraza con vistas a formaciones únicas.', 1, 'La Paz', 'Bolivia', NULL, NULL, NULL, 170.00, 'USD', 4, 2, 1, TRUE),
('a1111111-1111-4111-8111-111111111140', 'Backpackers on Sagárnaga Street', 'Cerca del Mercado de las Brujas y museos.', 1, 'La Paz', 'Bolivia', NULL, NULL, NULL, 60.00, 'USD', 1, 0, 1, TRUE),
('a1111111-1111-4111-8111-111111111141', 'Recoleta boulevard apartment', 'En el boulevard La Recoleta: restaurantes y pubs.', 1, 'Cochabamba', 'Bolivia', NULL, NULL, NULL, 100.00, 'USD', 2, 1, 1, TRUE),
('a1111111-1111-4111-8111-111111111142', 'Cala Cala garden house', 'Zona residencial, cerca de Av. América.', 1, 'Cochabamba', 'Bolivia', NULL, NULL, NULL, 180.00, 'USD', 5, 3, 2, TRUE),
('a1111111-1111-4111-8111-111111111143', 'Modern studio in Queru Queru', 'Edificio nuevo, cafés y comercios cercanos.', 1, 'Cochabamba', 'Bolivia', NULL, NULL, NULL, 105.00, 'USD', 2, 1, 1, TRUE),
('a1111111-1111-4111-8111-111111111144', 'Tiquipaya eco-cabin', 'Clima templado, áreas verdes y churrasquera.', 1, 'Cochabamba', 'Bolivia', NULL, NULL, NULL, 150.00, 'USD', 4, 2, 1, TRUE),
('a1111111-1111-4111-8111-111111111145', 'Modern apt in Equipetrol (dup)', 'Near restaurants and nightlife. Pool and gym.', 1, 'Santa Cruz', 'Bolivia', NULL, NULL, NULL, 100.00, 'USD', 2, 1, 1, TRUE),
('a1111111-1111-4111-8111-111111111146', 'Modern apt in Equipetrol (alt)', 'Near restaurants and nightlife. Pool and gym.', 1, 'Santa Cruz', 'Bolivia', NULL, NULL, NULL, 100.00, 'USD', 2, 1, 1, TRUE)
;

-- LISTING IMAGES
-- Para cada listing insertamos la imagen principal y las fotos adicionales cuando existan

-- Listing a111...1111 (Modern apt in Equipetrol)
INSERT INTO listing_image (id, listing_id, media_url, is_primary, display_order) VALUES
('b1111111-1111-4111-8111-111111111001', 'a1111111-1111-4111-8111-111111111111', 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111002', 'a1111111-1111-4111-8111-111111111111', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop', FALSE, 2),
('b1111111-1111-4111-8111-111111111003', 'a1111111-1111-4111-8111-111111111111', 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop', FALSE, 3),
('b1111111-1111-4111-8111-111111111004', 'a1111111-1111-4111-8111-111111111111', 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d52?q=80&w=1200&auto=format&fit=crop', FALSE, 4),
('b1111111-1111-4111-8111-111111111005', 'a1111111-1111-4111-8111-111111111111', 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop', FALSE, 5)
;

-- Listing a111...1112 (Rustic cabin)
INSERT INTO listing_image (id, listing_id, media_url, is_primary, display_order) VALUES
('b1111111-1111-4111-8111-111111111011', 'a1111111-1111-4111-8111-111111111112', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111012', 'a1111111-1111-4111-8111-111111111112', 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d52?q=80&w=1200&auto=format&fit=crop', FALSE, 2),
('b1111111-1111-4111-8111-111111111013', 'a1111111-1111-4111-8111-111111111112', 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop', FALSE, 3),
('b1111111-1111-4111-8111-111111111014', 'a1111111-1111-4111-8111-111111111112', 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=1200&auto=format&fit=crop', FALSE, 4),
('b1111111-1111-4111-8111-111111111015', 'a1111111-1111-4111-8111-111111111112', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop', FALSE, 5)
;

-- Listing a111...1113 (Minimalist loft)
INSERT INTO listing_image (id, listing_id, media_url, is_primary, display_order) VALUES
('b1111111-1111-4111-8111-111111111021', 'a1111111-1111-4111-8111-111111111113', 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111022', 'a1111111-1111-4111-8111-111111111113', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop', FALSE, 2),
('b1111111-1111-4111-8111-111111111023', 'a1111111-1111-4111-8111-111111111113', 'https://images.unsplash.com/photo-1521783593447-5702fcdac70a?q=80&w=1200&auto=format&fit=crop', FALSE, 3),
('b1111111-1111-4111-8111-111111111024', 'a1111111-1111-4111-8111-111111111113', 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop', FALSE, 4)
;

-- Listing a111...1114 (Budget room)
INSERT INTO listing_image (id, listing_id, media_url, is_primary, display_order) VALUES
('b1111111-1111-4111-8111-111111111031', 'a1111111-1111-4111-8111-111111111114', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111032', 'a1111111-1111-4111-8111-111111111114', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop', FALSE, 2),
('b1111111-1111-4111-8111-111111111033', 'a1111111-1111-4111-8111-111111111114', 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=1200&auto=format&fit=crop', FALSE, 3)
;

-- Listing a111...1115 (Penthouse with view)
INSERT INTO listing_image (id, listing_id, media_url, is_primary, display_order) VALUES
('b1111111-1111-4111-8111-111111111041', 'a1111111-1111-4111-8111-111111111115', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111042', 'a1111111-1111-4111-8111-111111111115', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop', FALSE, 2),
('b1111111-1111-4111-8111-111111111043', 'a1111111-1111-4111-8111-111111111115', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop', FALSE, 3)
;

-- Listing a111...1115 (Practical)
INSERT INTO listing_image (id, listing_id, media_url, is_primary, display_order) VALUES
('b1111111-1111-4117-8112-111111111041', 'a1111111-1111-4111-8111-111111111116', 'https://res-console.cloudinary.com/dv0z9xhqb/thumbnails/v1/image/upload/v1764901015/aW1hZ2VzX21panVjcg==/drilldown', TRUE, 1),
('b1111111-1111-4117-8112-111111111042', 'a1111111-1111-4111-8111-111111111116', 'https://res-console.cloudinary.com/dv0z9xhqb/thumbnails/v1/image/upload/v1764901015/aW1hZ2VzX21panVjcg==/drilldown', FALSE, 2),
('b1111111-1111-4117-8112-111111111043', 'a1111111-1111-4111-8111-111111111116', 'https://res-console.cloudinary.com/dv0z9xhqb/thumbnails/v1/image/upload/v1764901015/aW1hZ2VzX21panVjcg==/drilldown', FALSE, 3)
;

-- Additional LISTING IMAGES for the rest of listings (primary + extras; URLs may repeat)
INSERT INTO listing_image (id, listing_id, media_url, is_primary, display_order) VALUES
('b1111111-1111-4111-8111-111111111051', 'a1111111-1111-4111-8111-111111111116', 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111052', 'a1111111-1111-4111-8111-111111111116', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop', FALSE, 2),
('b1111111-1111-4111-8111-111111111053', 'a1111111-1111-4111-8111-111111111116', 'https://images.unsplash.com/photo-1521783593447-5702fcdac70a?q=80&w=1200&auto=format&fit=crop', FALSE, 3),

('b1111111-1111-4111-8111-111111111054', 'a1111111-1111-4111-8111-111111111117', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111055', 'a1111111-1111-4111-8111-111111111117', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111056', 'a1111111-1111-4111-8111-111111111118', 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111057', 'a1111111-1111-4111-8111-111111111118', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111058', 'a1111111-1111-4111-8111-111111111119', 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111059', 'a1111111-1111-4111-8111-111111111119', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111060', 'a1111111-1111-4111-8111-111111111120', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111061', 'a1111111-1111-4111-8111-111111111120', 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111062', 'a1111111-1111-4111-8111-111111111121', 'https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111063', 'a1111111-1111-4111-8111-111111111121', 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111064', 'a1111111-1111-4111-8111-111111111122', 'https://images.unsplash.com/photo-1534996858221-380b92700493?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111065', 'a1111111-1111-4111-8111-111111111122', 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111066', 'a1111111-1111-4111-8111-111111111123', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111067', 'a1111111-1111-4111-8111-111111111123', 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111068', 'a1111111-1111-4111-8111-111111111124', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111069', 'a1111111-1111-4111-8111-111111111124', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111070', 'a1111111-1111-4111-8111-111111111125', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop', TRUE, 1),

('b1111111-1111-4111-8111-111111111071', 'a1111111-1111-4111-8111-111111111126', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111072', 'a1111111-1111-4111-8111-111111111126', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111073', 'a1111111-1111-4111-8111-111111111127', 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111074', 'a1111111-1111-4111-8111-111111111127', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111075', 'a1111111-1111-4111-8111-111111111128', 'https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111076', 'a1111111-1111-4111-8111-111111111128', 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111077', 'a1111111-1111-4111-8111-111111111129', 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop', TRUE, 1),

('b1111111-1111-4111-8111-111111111078', 'a1111111-1111-4111-8111-111111111130', 'https://images.unsplash.com/photo-1534996858221-380b92700493?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111079', 'a1111111-1111-4111-8111-111111111130', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111080', 'a1111111-1111-4111-8111-111111111131', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111081', 'a1111111-1111-4111-8111-111111111131', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111082', 'a1111111-1111-4111-8111-111111111132', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111083', 'a1111111-1111-4111-8111-111111111132', 'https://images.unsplash.com/photo-1521783593447-5702fcdac70a?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111084', 'a1111111-1111-4111-8111-111111111133', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop', TRUE, 1),

('b1111111-1111-4111-8111-111111111085', 'a1111111-1111-4111-8111-111111111134', 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111086', 'a1111111-1111-4111-8111-111111111134', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111087', 'a1111111-1111-4111-8111-111111111135', 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111088', 'a1111111-1111-4111-8111-111111111135', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111089', 'a1111111-1111-4111-8111-111111111136', 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop', TRUE, 1),

('b1111111-1111-4111-8111-111111111090', 'a1111111-1111-4111-8111-111111111137', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop', TRUE, 1),

('b1111111-1111-4111-8111-111111111091', 'a1111111-1111-4111-8111-111111111138', 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111092', 'a1111111-1111-4111-8111-111111111138', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111093', 'a1111111-1111-4111-8111-111111111139', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop', TRUE, 1),

('b1111111-1111-4111-8111-111111111094', 'a1111111-1111-4111-8111-111111111140', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop', TRUE, 1),

('b1111111-1111-4111-8111-111111111095', 'a1111111-1111-4111-8111-111111111141', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop', TRUE, 1),

('b1111111-1111-4111-8111-111111111096', 'a1111111-1111-4111-8111-111111111142', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111097', 'a1111111-1111-4111-8111-111111111142', 'https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111098', 'a1111111-1111-4111-8111-111111111143', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop', TRUE, 1),

('b1111111-1111-4111-8111-111111111099', 'a1111111-1111-4111-8111-111111111144', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111100', 'a1111111-1111-4111-8111-111111111144', 'https://images.unsplash.com/photo-1521783593447-5702fcdac70a?q=80&w=1200&auto=format&fit=crop', FALSE, 2),

('b1111111-1111-4111-8111-111111111101', 'a1111111-1111-4111-8111-111111111145', 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop', TRUE, 1),
('b1111111-1111-4111-8111-111111111102', 'a1111111-1111-4111-8111-111111111146', 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop', TRUE, 1)
;

-- Nota: se pueden añadir relaciones con categorías usando los UUIDs de category en V1
-- Reemplazo del ejemplo por un conjunto completo de relaciones para los listings de ejemplo

-- LISTING <-> CATEGORY
INSERT INTO listing_has_category (listing_id, category_id) VALUES
('a1111111-1111-4111-8111-111111111111', '650e8400-e29b-41d4-a716-446655440002'), -- Modern apt in Equipetrol -> Apartment
('a1111111-1111-4111-8111-111111111112', '650e8400-e29b-41d4-a716-446655440004'), -- Rustic cabin -> Cabin
('a1111111-1111-4111-8111-111111111113', '650e8400-e29b-41d4-a716-446655440002'), -- Minimalist loft -> Apartment
('a1111111-1111-4111-8111-111111111114', '650e8400-e29b-41d4-a716-446655440006'), -- Budget room -> Private room
('a1111111-1111-4111-8111-111111111115', '650e8400-e29b-41d4-a716-446655440002'), -- Penthouse -> Apartment
('a1111111-1111-4111-8111-111111111116', '650e8400-e29b-41d4-a716-446655440002'), -- Practical studio -> Apartment
('a1111111-1111-4111-8111-111111111117', '650e8400-e29b-41d4-a716-446655440001'), -- Eco lodge -> House
('a1111111-1111-4111-8111-111111111118', '650e8400-e29b-41d4-a716-446655440002'), -- Downtown apartment -> Apartment
('a1111111-1111-4111-8111-111111111119', '650e8400-e29b-41d4-a716-446655440004'), -- Mountain view cabin -> Cabin
('a1111111-1111-4111-8111-111111111120', '650e8400-e29b-41d4-a716-446655440007'), -- Artisan hostel -> Shared room
('a1111111-1111-4111-8111-111111111121', '650e8400-e29b-41d4-a716-446655440003'), -- Luxury villa -> Villa
('a1111111-1111-4111-8111-111111111122', '650e8400-e29b-41d4-a716-446655440001'), -- Tiny house in vineyard -> House
('a1111111-1111-4111-8111-111111111123', '650e8400-e29b-41d4-a716-446655440002'), -- Colonial suite -> Apartment
('a1111111-1111-4111-8111-111111111124', '650e8400-e29b-41d4-a716-446655440002'), -- Modern studio near stadium -> Apartment
('a1111111-1111-4111-8111-111111111125', '650e8400-e29b-41d4-a716-446655440007'), -- Hostal Andes -> Shared room
('a1111111-1111-4111-8111-111111111126', '650e8400-e29b-41d4-a716-446655440006'), -- Boutique hotel room -> Private room
('a1111111-1111-4111-8111-111111111127', '650e8400-e29b-41d4-a716-446655440002'), -- Executive suite -> Apartment
('a1111111-1111-4111-8111-111111111128', '650e8400-e29b-41d4-a716-446655440001'), -- Urubó house -> House
('a1111111-1111-4111-8111-111111111129', '650e8400-e29b-41d4-a716-446655440002'), -- Boho loft -> Apartment
('a1111111-1111-4111-8111-111111111130', '650e8400-e29b-41d4-a716-446655440003'), -- Suite in Valle -> Villa
('a1111111-1111-4111-8111-111111111131', '650e8400-e29b-41d4-a716-446655440004'), -- Cabin by Guadalquivir -> Cabin
('a1111111-1111-4111-8111-111111111132', '650e8400-e29b-41d4-a716-446655440001'), -- Adobe house -> House
('a1111111-1111-4111-8111-111111111133', '650e8400-e29b-41d4-a716-446655440006'), -- Boutique room near main square -> Private room
('a1111111-1111-4111-8111-111111111134', '650e8400-e29b-41d4-a716-446655440002'), -- Apartment in Historic Center -> Apartment
('a1111111-1111-4111-8111-111111111135', '650e8400-e29b-41d4-a716-446655440001'), -- House with patio -> House
('a1111111-1111-4111-8111-111111111136', '650e8400-e29b-41d4-a716-446655440002'), -- Studio by Parque Bolívar -> Apartment
('a1111111-1111-4111-8111-111111111137', '650e8400-e29b-41d4-a716-446655440002'), -- Apartment in Sopocachi -> Apartment
('a1111111-1111-4111-8111-111111111138', '650e8400-e29b-41d4-a716-446655440002'), -- Suite in Calacoto -> Apartment
('a1111111-1111-4111-8111-111111111139', '650e8400-e29b-41d4-a716-446655440004'), -- Cabin near Valle de la Luna -> Cabin
('a1111111-1111-4111-8111-111111111140', '650e8400-e29b-41d4-a716-446655440007'), -- Backpackers -> Shared room
('a1111111-1111-4111-8111-111111111141', '650e8400-e29b-41d4-a716-446655440002'), -- Recoleta boulevard apartment -> Apartment
('a1111111-1111-4111-8111-111111111142', '650e8400-e29b-41d4-a716-446655440001'), -- Cala Cala garden house -> House
('a1111111-1111-4111-8111-111111111143', '650e8400-e29b-41d4-a716-446655440002'), -- Modern studio in Queru Queru -> Apartment
('a1111111-1111-4111-8111-111111111144', '650e8400-e29b-41d4-a716-446655440004'), -- Tiquipaya eco-cabin -> Cabin
('a1111111-1111-4111-8111-111111111145', '650e8400-e29b-41d4-a716-446655440002'), -- Modern apt (dup) -> Apartment
('a1111111-1111-4111-8111-111111111146', '650e8400-e29b-41d4-a716-446655440002') -- Modern apt (alt) -> Apartment
;

-- LISTING <-> AMENITY
INSERT INTO listing_has_amenity (listing_id, amenity_id) VALUES
-- Modern apt in Equipetrol
('a1111111-1111-4111-8111-111111111111', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111111', '750e8400-e29b-41d4-a716-446655440002'),
('a1111111-1111-4111-8111-111111111111', '750e8400-e29b-41d4-a716-446655440003'),
('a1111111-1111-4111-8111-111111111111', '750e8400-e29b-41d4-a716-446655440005'),
-- Rustic cabin
('a1111111-1111-4111-8111-111111111112', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111112', '750e8400-e29b-41d4-a716-446655440011'),
('a1111111-1111-4111-8111-111111111112', '750e8400-e29b-41d4-a716-446655440012'),
-- Minimalist loft
('a1111111-1111-4111-8111-111111111113', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111113', '750e8400-e29b-41d4-a716-446655440003'),
('a1111111-1111-4111-8111-111111111113', '750e8400-e29b-41d4-a716-446655440008'),
-- Budget room
('a1111111-1111-4111-8111-111111111114', '750e8400-e29b-41d4-a716-446655440001'),
-- Penthouse with view
('a1111111-1111-4111-8111-111111111115', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111115', '750e8400-e29b-41d4-a716-446655440011'),
('a1111111-1111-4111-8111-111111111115', '750e8400-e29b-41d4-a716-446655440002'),
-- Practical studio
('a1111111-1111-4111-8111-111111111116', '750e8400-e29b-41d4-a716-446655440001'),
-- Eco lodge in the valley
('a1111111-1111-4111-8111-111111111117', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111117', '750e8400-e29b-41d4-a716-446655440004'),
('a1111111-1111-4111-8111-111111111117', '750e8400-e29b-41d4-a716-446655440006'),
-- Downtown apartment
('a1111111-1111-4111-8111-111111111118', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111118', '750e8400-e29b-41d4-a716-446655440007'),
-- Mountain view cabin
('a1111111-1111-4111-8111-111111111119', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111119', '750e8400-e29b-41d4-a716-446655440011'),
-- Artisan hostel
('a1111111-1111-4111-8111-111111111120', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111120', '750e8400-e29b-41d4-a716-446655440003'),
-- Luxury villa with pool
('a1111111-1111-4111-8111-111111111121', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111121', '750e8400-e29b-41d4-a716-446655440002'),
('a1111111-1111-4111-8111-111111111121', '750e8400-e29b-41d4-a716-446655440003'),
-- Tiny house in vineyard
('a1111111-1111-4111-8111-111111111122', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111122', '750e8400-e29b-41d4-a716-446655440004'),
-- Colonial suite
('a1111111-1111-4111-8111-111111111123', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111123', '750e8400-e29b-41d4-a716-446655440005'),
-- Modern studio near stadium
('a1111111-1111-4111-8111-111111111124', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111124', '750e8400-e29b-41d4-a716-446655440005'),
-- Hostal Andes
('a1111111-1111-4111-8111-111111111125', '750e8400-e29b-41d4-a716-446655440001'),
-- Boutique hotel room
('a1111111-1111-4111-8111-111111111126', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111126', '750e8400-e29b-41d4-a716-446655440007'),
-- Executive suite in Las Palmas
('a1111111-1111-4111-8111-111111111127', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111127', '750e8400-e29b-41d4-a716-446655440005'),
-- Urubó house with pool
('a1111111-1111-4111-8111-111111111128', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111128', '750e8400-e29b-41d4-a716-446655440002'),
('a1111111-1111-4111-8111-111111111128', '750e8400-e29b-41d4-a716-446655440004'),
-- Boho loft
('a1111111-1111-4111-8111-111111111129', '750e8400-e29b-41d4-a716-446655440001'),
-- Suite in Valle de la Concepción
('a1111111-1111-4111-8111-111111111130', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111130', '750e8400-e29b-41d4-a716-446655440003'),
-- Cabin by Guadalquivir River
('a1111111-1111-4111-8111-111111111131', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111131', '750e8400-e29b-41d4-a716-446655440011'),
-- Adobe house in San Lorenzo
('a1111111-1111-4111-8111-111111111132', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111132', '750e8400-e29b-41d4-a716-446655440003'),
-- Boutique room near main square
('a1111111-1111-4111-8111-111111111133', '750e8400-e29b-41d4-a716-446655440001'),
-- Apartment in Historic Center
('a1111111-1111-4111-8111-111111111134', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111134', '750e8400-e29b-41d4-a716-446655440005'),
-- House with patio in La Recoleta
('a1111111-1111-4111-8111-111111111135', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111135', '750e8400-e29b-41d4-a716-446655440003'),
-- Studio by Parque Bolívar
('a1111111-1111-4111-8111-111111111136', '750e8400-e29b-41d4-a716-446655440001'),
-- Apartment in Sopocachi
('a1111111-1111-4111-8111-111111111137', '750e8400-e29b-41d4-a716-446655440001'),
-- Suite in Calacoto / San Miguel
('a1111111-1111-4111-8111-111111111138', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111138', '750e8400-e29b-41d4-a716-446655440005'),
-- Cabin near Valle de la Luna
('a1111111-1111-4111-8111-111111111139', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111139', '750e8400-e29b-41d4-a716-446655440011'),
-- Backpackers on Sagárnaga Street
('a1111111-1111-4111-8111-111111111140', '750e8400-e29b-41d4-a716-446655440001'),
-- Recoleta boulevard apartment
('a1111111-1111-4111-8111-111111111141', '750e8400-e29b-41d4-a716-446655440001'),
-- Cala Cala garden house
('a1111111-1111-4111-8111-111111111142', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111142', '750e8400-e29b-41d4-a716-446655440004'),
-- Modern studio in Queru Queru
('a1111111-1111-4111-8111-111111111143', '750e8400-e29b-41d4-a716-446655440001'),
-- Tiquipaya eco-cabin
('a1111111-1111-4111-8111-111111111144', '750e8400-e29b-41d4-a716-446655440001'),
('a1111111-1111-4111-8111-111111111144', '750e8400-e29b-41d4-a716-446655440003'),
-- Modern apt (dup)
('a1111111-1111-4111-8111-111111111145', '750e8400-e29b-41d4-a716-446655440001'),
-- Modern apt (alt)
('a1111111-1111-4111-8111-111111111146', '750e8400-e29b-41d4-a716-446655440001')
;

-- FIN V8
