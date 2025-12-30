package com.scaler.auth_server.mappers;

import java.util.UUID;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import com.scaler.auth_server.dtos.RegisterClientDto;

public final class ClientMapper {

  private ClientMapper() {}

  public static RegisteredClient toRegisteredClient(RegisterClientDto registerClientDto) {
    return RegisteredClient.withId(UUID.randomUUID().toString())
        .clientId(registerClientDto.getClientId()).clientSecret(registerClientDto.getClientSecret())
        .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
        .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
        .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
        .redirectUri(registerClientDto.getRedirectUri())
        .postLogoutRedirectUri(registerClientDto.getPostLogoutRedirectUri())
        .scope(OidcScopes.OPENID).scope(OidcScopes.PROFILE)
        .clientSettings(ClientSettings.builder().requireAuthorizationConsent(true).build()).build();

  }

}
