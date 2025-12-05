package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.cloudinary.commands;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.DeleteImageResponseDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.ImageStoragePort;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.ListingImageRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.logging.Logger;

@Component
public class DeleteImageCommandHandler implements Command.Handler<DeleteImageCommand, DeleteImageResponseDTO> {

    private static final Logger logger = Logger.getLogger(DeleteImageCommandHandler.class.getName());

    private final ImageStoragePort imageStoragePort;
    private final ListingImageRepository listingImageRepository;

    public DeleteImageCommandHandler(ImageStoragePort imageStoragePort,
                                    ListingImageRepository listingImageRepository) {
        this.imageStoragePort = imageStoragePort;
        this.listingImageRepository = listingImageRepository;
    }

    @Override
    @Transactional
    public DeleteImageResponseDTO handle(DeleteImageCommand command) {
        String publicId = command.getPublicId();

        logger.info("Processing delete image command for publicId: " + publicId);

        // Validate public ID format (basic validation)
        if (publicId == null || publicId.trim().isEmpty()) {
            throw new IllegalArgumentException("Public ID cannot be null or empty");
        }

        // First, delete from Cloudinary
        DeleteImageResponseDTO response = imageStoragePort.deleteImage(publicId);

        logger.info("Image deletion from Cloudinary completed for publicId: " + publicId + " with result: " + response.getResult());

        // If deletion from Cloudinary was successful, delete from database
        if ("ok".equals(response.getResult()) || "not found".equals(response.getResult())) {
            try {
                listingImageRepository.deleteByPublicId(publicId);
                logger.info("Image record deleted from database for publicId: " + publicId);
            } catch (Exception e) {
                logger.warning("Failed to delete image record from database for publicId: " + publicId + " - " + e.getMessage());
                // We don't throw here because the image was already deleted from Cloudinary
                // This is a best-effort cleanup of the database
            }
        }

        return response;
    }
}

