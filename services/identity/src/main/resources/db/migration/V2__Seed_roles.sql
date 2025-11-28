
INSERT INTO roles (name, description, active)
VALUES
    ('CLIENT', 'Standard user', true),
    ('HOST', 'Host with listings', true),
    ('ADMIN', 'Administrator', true)
ON CONFLICT (name) DO NOTHING;