package com.scaler.auth_server.dtos;

import java.util.Set;

public record RegisterClientResponseDto(String clientId, String clientSecret, String clientName,
        Set<String> clientAuthenticationMethods, Set<String> authorizationGrantTypes,
        Set<String> redirectUris, Set<String> postLogoutRedirectUris, Set<String> scopes) {
}
