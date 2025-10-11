package com.airbnb_clone_ms_web_iii.identity.dtos.pojos;

public class StandardResult<T> {

    private boolean success;
    private String errorMessage = "";
    private T data;

    public StandardResult() {
    }

    public StandardResult(boolean success, String message, T data) {
        this.success = success;
        this.errorMessage = message;
        this.data = data;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

}
