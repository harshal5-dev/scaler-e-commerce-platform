package com.scaler.auth_server.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SuccessResponse<T> extends AppResponse<T> {
  private T data;

  public SuccessResponse(String message, T data) {
    super(message);
    this.data = data;
  }
}
