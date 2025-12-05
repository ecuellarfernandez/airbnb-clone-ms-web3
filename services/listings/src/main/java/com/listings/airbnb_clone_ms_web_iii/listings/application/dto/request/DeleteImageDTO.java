package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Request para eliminar una imagen de Cloudinary")
public class DeleteImageDTO {

    @NotBlank(message = "Public ID is required")
    @Schema(description = "Cloudinary public ID of the image to delete", example = "listings/abc123def456")
    private String publicId;
}

