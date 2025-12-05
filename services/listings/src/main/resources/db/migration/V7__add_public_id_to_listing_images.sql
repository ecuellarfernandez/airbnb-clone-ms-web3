-- ===========================================
-- ADD PUBLIC_ID TO LISTING_IMAGE TABLE
-- ===========================================

-- Add public_id column to store Cloudinary's public identifier
ALTER TABLE listing_image
ADD COLUMN public_id VARCHAR(255);

-- Add index for faster lookups when deleting by public_id
CREATE INDEX idx_listing_image_public_id ON listing_image(public_id);

-- Add comment
COMMENT ON COLUMN listing_image.public_id IS 'Cloudinary public identifier for the image';

