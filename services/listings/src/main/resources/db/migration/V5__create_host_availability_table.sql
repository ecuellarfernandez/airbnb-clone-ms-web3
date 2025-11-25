-- ===========================================
-- TABLA DE DISPONIBILIDAD DEL ANFITRIÓN
-- ===========================================

CREATE TABLE host_availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL,
    date DATE NOT NULL,
    is_blocked_by_host BOOLEAN NOT NULL DEFAULT FALSE,
    block_reason VARCHAR(255),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Constraint: Solo una entrada por listing por fecha
    CONSTRAINT uq_listing_date UNIQUE (listing_id, date),

    CONSTRAINT fk_host_availability_listing
        FOREIGN KEY (listing_id)
        REFERENCES listing(id)
        ON DELETE CASCADE
);

-- Índices para búsquedas por rango de fechas
CREATE INDEX idx_host_availability_listing_date ON host_availability(listing_id, date);
CREATE INDEX idx_host_availability_date ON host_availability(date);
CREATE INDEX idx_host_availability_blocked ON host_availability(listing_id, is_blocked_by_host);

-- Comentarios
COMMENT ON TABLE host_availability IS 'Calendario de disponibilidad configurado por el anfitrión';
COMMENT ON COLUMN host_availability.is_blocked_by_host IS 'true = fecha bloqueada por el anfitrión';
COMMENT ON COLUMN host_availability.block_reason IS 'Razón del bloqueo: mantenimiento, uso personal, etc.';
