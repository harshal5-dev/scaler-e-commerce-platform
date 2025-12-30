package com.scaler.auth_server.dtos;

import java.time.Instant;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class AppResponse<T> {
  private String message;
  private Instant timestamp;


  AppResponse(String message) {
    this.message = message;
    this.timestamp = Instant.now();
  }

}
