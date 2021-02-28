package com.example.mainfunctions.util;

import org.apache.http.HttpStatus;

public class MyAppException extends RuntimeException {
    HttpStatus status;

    public MyAppException(String message, Throwable cause) {
        super(message, cause);
    }

    public MyAppException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public MyAppException(String message) {
        super(message);
    }

    public MyAppException(Throwable cause) {
        super(cause);
    }

}
