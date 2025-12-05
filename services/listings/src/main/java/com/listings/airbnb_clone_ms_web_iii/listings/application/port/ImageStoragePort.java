package com.listings.airbnb_clone_ms_web_iii.listings.application.port;

import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.DeleteImageResponseDTO;

/**
 * Port for image storage operations
 * Defines the contract for image management services
 */
public interface ImageStoragePort {

    /**
     * Delete an image from the storage service
     * @param publicId The public identifier of the image to delete
     * @return DeleteImageResponseDTO with the result of the operation
     * @throws RuntimeException if the deletion fails
     */
    DeleteImageResponseDTO deleteImage(String publicId);

    /**
     * Validate if a public ID exists in the storage
     * @param publicId The public identifier to validate
     * @return true if the image exists, false otherwise
     */
    boolean imageExists(String publicId);
}

