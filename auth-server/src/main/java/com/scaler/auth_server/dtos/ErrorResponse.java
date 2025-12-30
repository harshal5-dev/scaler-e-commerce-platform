package com.scaler.auth_server.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponse<T> extends AppResponse<Void> {

  public ErrorResponse(String message) {
    super(message);
  }
}
