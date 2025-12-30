package com.scaler.auth_server.exception;

import java.io.IOException;
import java.time.Instant;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
  @Override
  public void handle(HttpServletRequest request, HttpServletResponse response,
      AccessDeniedException accessDeniedException) throws IOException {

    // Log the access denied event without stack trace
    log.warn("Access denied for request: {} - {}", request.getRequestURI(),
        accessDeniedException.getMessage());

    response.setStatus(HttpStatus.FORBIDDEN.value());
    response.setContentType("application/json;charset=UTF-8");

    String message = accessDeniedException.getMessage() != null ? accessDeniedException.getMessage()
        : "You do not have permission to access this resource";

    String jsonResponse = String.format("{ \"message\": \"%s\", \"timestamp\": \"%s\"}", message,
        Instant.now().toString());

    response.getWriter().write(jsonResponse);
  }
}
