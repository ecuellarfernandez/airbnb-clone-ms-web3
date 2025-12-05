package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Response after deleting an image from Cloudinary")
public class DeleteImageResponseDTO {

    @Schema(description = "Result of the deletion operation", example = "ok")
    private String result;

    @Schema(description = "Cloudinary public ID of the deleted image", example = "listings/abc123def456")
    private String publicId;
}

