package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common;

/**
 * Wrapper generico para respuestas de la API.
 * Proporciona un formato consistente para exitos y errores.
 *
 * @param <T> Tipo de datos en caso de éxito
 */
public class StandardResult<T> {

    private boolean success;
    private String message;
    private T data;
    private String errorCode;

    public StandardResult() {
        this.success = true;
        this.message = "";
    }

    public StandardResult(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public StandardResult(boolean success, String message, T data, String errorCode) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.errorCode = errorCode;
    }

    // Factory methods para facilitar creación

    /**
     * Crea un resultado exitoso con datos.
     */
    public static <T> StandardResult<T> success(T data) {
        return new StandardResult<>(true, "Operation successful", data);
    }

    /**
     * Crea un resultado exitoso con datos y mensaje personalizado.
     */
    public static <T> StandardResult<T> success(T data, String message) {
        return new StandardResult<>(true, message, data);
    }

    /**
     * Crea un resultado exitoso sin datos (para operaciones void).
     */
    public static <T> StandardResult<T> success() {
        return new StandardResult<>(true, "Operation successful", null);
    }

    /**
     * Crea un resultado de error con mensaje.
     */
    public static <T> StandardResult<T> error(String message) {
        return new StandardResult<>(false, message, null);
    }

    /**
     * Crea un resultado de error con mensaje y código de error.
     */
    public static <T> StandardResult<T> error(String message, String errorCode) {
        return new StandardResult<>(false, message, null, errorCode);
    }

    /**
     * Crea un resultado de error con mensaje, código de error y datos adicionales.
     */
    public static <T> StandardResult<T> error(String message, String errorCode, T data) {
        return new StandardResult<>(false, message, data, errorCode);
    }

    // Getters y Setters

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }
}
