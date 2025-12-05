package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.DeleteImageResponseDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.ImageStoragePort;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Cloudinary implementation of ImageStoragePort
 * Handles image operations using Cloudinary API
 */
@Service
public class CloudinaryImageStorageAdapter implements ImageStoragePort {

    private static final Logger logger = Logger.getLogger(CloudinaryImageStorageAdapter.class.getName());

    private final Cloudinary cloudinary;

    public CloudinaryImageStorageAdapter(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public DeleteImageResponseDTO deleteImage(String publicId) {
        try {
            logger.info("Attempting to delete image with publicId: " + publicId);

            // Call Cloudinary API to delete the image
            Map<String, Object> result = cloudinary.uploader().destroy(publicId, Map.of());

            String resultStatus = (String) result.get("result");

            logger.info("Image deletion result for " + publicId + ": " + resultStatus);

            if (!"ok".equals(resultStatus) && !"not found".equals(resultStatus)) {
                throw new RuntimeException("Failed to delete image: " + resultStatus);
            }

            return new DeleteImageResponseDTO(resultStatus, publicId);

        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error deleting image from Cloudinary: " + publicId, e);
            throw new RuntimeException("Failed to delete image from Cloudinary: " + e.getMessage(), e);
        }
    }

    @Override
    public boolean imageExists(String publicId) {
        try {
            ApiResponse resource = cloudinary.api().resource(publicId, Map.of());
            return resource != null;
        } catch (Exception e) {
            logger.log(Level.WARNING, "Image not found or error checking existence: " + publicId, e);
            return false;
        }
    }
}

