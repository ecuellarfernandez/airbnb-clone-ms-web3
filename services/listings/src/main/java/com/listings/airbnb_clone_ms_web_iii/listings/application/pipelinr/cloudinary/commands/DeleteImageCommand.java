package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.cloudinary.commands;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.DeleteImageResponseDTO;

public class DeleteImageCommand implements Command<DeleteImageResponseDTO> {

    private final String publicId;

    public DeleteImageCommand(String publicId) {
        this.publicId = publicId;
    }

    public String getPublicId() {
        return publicId;
    }
}

