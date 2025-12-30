package com.scaler.auth_server.exception;

import java.io.IOException;
import java.time.Instant;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomBasicAuthenticationEntryPoint implements AuthenticationEntryPoint {
  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException authException) throws IOException {

    // Log the authentication failure without stack trace
    log.warn("Authentication failed for request: {} - {}", request.getRequestURI(),
        authException.getMessage());

    response.setStatus(HttpStatus.UNAUTHORIZED.value());
    response.setContentType("application/json;charset=UTF-8");

    String message = authException.getMessage() != null ? authException.getMessage()
        : "Authentication is required to access this resource";

    String jsonResponse = String.format("{ \"message\": \"%s\", \"timestamp\": \"%s\"}", message,
        Instant.now().toString());

    response.getWriter().write(jsonResponse);
  }
}
