package com.scaler.auth_server.dtos;

import java.time.Instant;

public record LoginResponseDto(Long userId, String email, String token, Instant expiresAt) {
}
