package com.scaler.auth_server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import com.scaler.auth_server.dtos.AppResponse;
import com.scaler.auth_server.dtos.ErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(UserAlreadyExistsException.class)
  public ResponseEntity<AppResponse<Void>> handleUserAlreadyExistsException(
      UserAlreadyExistsException exception, WebRequest webRequest) {
    AppResponse<Void> errorResponseDTO = new ErrorResponse<>(exception.getMessage());
    return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
  }

}
