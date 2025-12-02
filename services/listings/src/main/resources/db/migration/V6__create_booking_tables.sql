-- ===========================================
-- TABLA DE RESERVAS (BOOKINGS)
-- ===========================================

CREATE TABLE booking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    listing_id UUID NOT NULL,
    guest_id INTEGER NOT NULL,

    check_in DATE NOT NULL,
    check_out DATE NOT NULL,

    nights INTEGER NOT NULL,
    price_per_night DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',

    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_booking_listing
        FOREIGN KEY (listing_id)
        REFERENCES listing(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_booking_dates CHECK (check_out > check_in),
    CONSTRAINT chk_booking_nights CHECK (nights > 0),
    CONSTRAINT chk_booking_price CHECK (price_per_night > 0 AND total_price > 0)
);

CREATE INDEX idx_booking_listing ON booking(listing_id);
CREATE INDEX idx_booking_guest ON booking(guest_id);
CREATE INDEX idx_booking_status ON booking(status);
CREATE INDEX idx_booking_dates ON booking(listing_id, check_in, check_out);

COMMENT ON TABLE booking IS 'Reservas realizadas por huéspedes para un listing';
COMMENT ON COLUMN booking.guest_id IS 'Referencia al usuario huésped en Identity Service';
COMMENT ON COLUMN booking.status IS 'PENDING, CONFIRMED, CANCELLED';
