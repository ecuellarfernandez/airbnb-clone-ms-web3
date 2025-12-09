package com.listings.airbnb_clone_ms_web_iii.listings.presentation.exception;

import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common.StandardResult;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = Logger.getLogger(GlobalExceptionHandler.class.getName());

    @ExceptionHandler(ListingNotFoundException.class)
    public ResponseEntity<StandardResult<Void>> handleListingNotFound(ListingNotFoundException ex) {
        logger.warning("Listing not found: " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(StandardResult.error(ex.getMessage(), "NOT_FOUND"));
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<StandardResult<Void>> handleIllegalState(IllegalStateException ex) {
        logger.warning("Illegal state: " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(StandardResult.error(ex.getMessage(), "VALIDATION_ERROR"));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<StandardResult<Void>> handleIllegalArgument(IllegalArgumentException ex) {
        logger.warning("Invalid argument: " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(StandardResult.error(ex.getMessage(), "INVALID_INPUT"));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<StandardResult<Map<String, String>>> handleValidationErrors(
            MethodArgumentNotValidException ex) {
        logger.warning("Validation error: " + ex.getMessage());

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(StandardResult.error("Invalid input data", "VALIDATION_ERROR", errors));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<StandardResult<Map<String, String>>> handleConstraintViolation(
            ConstraintViolationException ex) {
        logger.warning("Constraint violation: " + ex.getMessage());

        Map<String, String> errors = new HashMap<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            String propertyPath = violation.getPropertyPath().toString();
            String message = violation.getMessage();
            // Extraer solo el nombre del parámetro (después del último punto)
            String paramName = propertyPath.substring(propertyPath.lastIndexOf('.') + 1);
            errors.put(paramName, message);
        }

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(StandardResult.error("Invalid request parameters", "VALIDATION_ERROR", errors));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<StandardResult<Void>> handleGenericException(Exception ex) {
        logger.severe("Unexpected error: " + ex.getMessage() + " - " + ex.getClass().getName());
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(StandardResult.error("An unexpected error occurred", "INTERNAL_ERROR"));
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<StandardResult<Void>> handleResponseStatusException(ResponseStatusException ex) {
        logger.warning("Response status exception: " + ex.getMessage());
        return ResponseEntity
                .status(ex.getStatusCode())
                .body(StandardResult.error(ex.getReason(), ex.getStatusCode().toString()));
    }
}
