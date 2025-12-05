package com.listings.airbnb_clone_ms_web_iii.listings.presentation.controller;

import an.awesome.pipelinr.Pipeline;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common.StandardResult;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.DeleteImageDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.DeleteImageResponseDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.cloudinary.commands.DeleteImageCommand;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/cloudinary")
@Tag(name = "Cloudinary", description = "API for Cloudinary image management")
@CrossOrigin(origins = "*")
@Validated
public class CloudinaryController {

    private static final Logger logger = Logger.getLogger(CloudinaryController.class.getName());

    private final Pipeline pipeline;

    public CloudinaryController(Pipeline pipeline) {
        this.pipeline = pipeline;
    }

    @PostMapping("/delete")
    @Operation(summary = "Elimina imagen de Cloudinary")
    public ResponseEntity<StandardResult<DeleteImageResponseDTO>> deleteImage(
            @Valid @RequestBody DeleteImageDTO request
    ) {
        DeleteImageCommand command = new DeleteImageCommand(request.getPublicId());
        DeleteImageResponseDTO response = pipeline.send(command);

        String message = "ok".equals(response.getResult())
                ? "Image deleted successfully"
                : "Image not found or already deleted";

        return ResponseEntity.ok(StandardResult.success(response, message));
    }
}

