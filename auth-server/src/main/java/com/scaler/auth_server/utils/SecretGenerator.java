package com.scaler.auth_server.utils;

import java.security.SecureRandom;
import java.util.Base64;

/**
 * Utility class for generating cryptographically secure client secrets. Uses SecureRandom for
 * secure random number generation following industry best practices.
 */
public final class SecretGenerator {

  private static final SecureRandom SECURE_RANDOM = new SecureRandom();
  private static final int SECRET_BYTE_LENGTH = 32; // 256 bits

  private SecretGenerator() {
    // Utility class - prevent instantiation
  }

  /**
   * Generates a cryptographically secure random client secret.
   * 
   * @return A Base64-encoded random string suitable for use as a client secret
   */
  public static String generateClientSecret() {
    byte[] randomBytes = new byte[SECRET_BYTE_LENGTH];
    SECURE_RANDOM.nextBytes(randomBytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
  }

  /**
   * Generates a unique client ID using a random UUID.
   * 
   * @return A unique client ID string
   */
  public static String generateClientId() {
    return java.util.UUID.randomUUID().toString();
  }
}
