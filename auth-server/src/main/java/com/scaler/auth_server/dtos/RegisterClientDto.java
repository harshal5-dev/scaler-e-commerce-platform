package com.scaler.auth_server.dtos;

import java.util.List;

public record RegisterClientDto(String clientId, String clientSecret, String clientName,
    List<String> clientAuthenticationMethods, List<String> authorizationGrantTypes,
    List<String> redirectUris, List<String> postLogoutRedirectUris, List<String> scopes,
    boolean requireAuthorizationConsent) {
}
