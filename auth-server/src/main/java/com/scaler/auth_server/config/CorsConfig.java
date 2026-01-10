package com.scaler.auth_server.config;

import java.util.Collections;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    // Allow specific origins (add more as needed)
    configuration.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));

    // Allow all headers
    configuration.setAllowedHeaders(Collections.singletonList("*"));

    // Allow all HTTP methods
    configuration.setAllowedMethods(Collections.singletonList("*"));

    // Expose Authorization header to the client
    configuration.setExposedHeaders(List.of("Authorization"));

    // Allow credentials (cookies, authorization headers)
    configuration.setAllowCredentials(true);

    // Set max age for preflight requests
    configuration.setMaxAge(3600L);

    // Register the configuration for all paths
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);

    return source;
  }
}
