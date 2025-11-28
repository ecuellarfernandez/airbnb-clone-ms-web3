-- ==========================================
-- 1. INSERT ALL CLAIMS DEFINITIONS
-- ==========================================

-- Client / Guest Claims
INSERT INTO claims (name, description, active) VALUES
('listings.read', 'Allows viewing listing details and searching', true),
('reservations.create', 'Allows creating a new reservation', true),
('reservations.read_own', 'Allows viewing own reservation history', true),
('payments.create', 'Allows performing simulated payments', true);

-- Host Claims
INSERT INTO claims (name, description, active) VALUES
('listings.create', 'Allows creating new property listings', true),
('listings.update', 'Allows editing own listings', true),
('listings.delete', 'Allows deleting own listings', true),
('availability.update', 'Allows managing calendar availability', true),
('reservations.read_received', 'Allows viewing reservations made on own properties', true),
('reservations.update_status', 'Allows accepting or rejecting reservations', true);

-- Admin Claims
INSERT INTO claims (name, description, active) VALUES
('listings.moderate', 'Allows approving or rejecting listings', true),
('users.read', 'Allows viewing user profiles', true),
('users.update_status', 'Allows blocking or activating users', true),
('reservations.read_all', 'Allows viewing all reservations in the system', true),
('reports.read', 'Allows generating and viewing system reports', true);


-- ==========================================
-- 2. LINK CLAIMS TO ROLES (With Inheritance)
-- ==========================================

-- A) CLIENT Role. Gets only Client claims
INSERT INTO role_claims (role_id, claim_id)
SELECT r.id, c.id
FROM roles r, claims c
WHERE r.name = 'CLIENT'
AND c.name IN (
    'listings.read',
    'reservations.create',
    'reservations.read_own',
    'payments.create'
);

-- B) HOST Role. Gets Host claims + ALL Client claims
INSERT INTO role_claims (role_id, claim_id)
SELECT r.id, c.id
FROM roles r, claims c
WHERE r.name = 'HOST'
AND (
    -- Specific Host Claims
    c.name IN (
        'listings.create',
        'listings.update',
        'listings.delete',
        'availability.update',
        'reservations.read_received',
        'reservations.update_status'
    )
    OR
    -- Inherited Client Claims
    c.name IN (
        'listings.read',
        'reservations.create',
        'reservations.read_own',
        'payments.create'
    )
);

-- C) ADMIN Role. Gets Admin claims + ALL Host claims + ALL Client claims
INSERT INTO role_claims (role_id, claim_id)
SELECT r.id, c.id
FROM roles r, claims c
WHERE r.name = 'ADMIN'
-- Admin gets everything currently in the claims table
-- (This effectively gives them Admin + Host + Client permissions)
AND c.name IN (
    -- Admin Specific
    'listings.moderate', 'users.read', 'users.update_status', 'reservations.read_all', 'reports.read',
    -- Host Specific
    'listings.create', 'listings.update', 'listings.delete', 'availability.update', 'reservations.read_received', 'reservations.update_status',
    -- Client Specific
    'listings.read', 'reservations.create', 'reservations.read_own', 'payments.create'
);