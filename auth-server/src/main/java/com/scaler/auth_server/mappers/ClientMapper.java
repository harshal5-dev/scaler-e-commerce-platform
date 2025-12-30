package com.scaler.auth_server.mappers;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.util.CollectionUtils;
import com.scaler.auth_server.dtos.RegisterClientDto;
import com.scaler.auth_server.dtos.RegisterClientResponseDto;
import com.scaler.auth_server.models.Client;

public final class ClientMapper {

  private ClientMapper() {}

  public static RegisteredClient toRegisteredClient(RegisterClientDto registerClientDto) {
    RegisteredClient.Builder builder = RegisteredClient.withId(UUID.randomUUID().toString())
        .clientId(registerClientDto.clientId()).clientSecret(registerClientDto.clientSecret())
        .clientName(registerClientDto.clientName())
        .clientAuthenticationMethods(
            methods -> safeList(registerClientDto.clientAuthenticationMethods())
                .forEach(m -> methods.add(resolveClientAuthenticationMethod(m))))
        .authorizationGrantTypes(grantTypes -> safeList(registerClientDto.authorizationGrantTypes())
            .forEach(gt -> grantTypes.add(resolveAuthorizationGrantType(gt))))
        .redirectUris(uris -> uris.addAll(safeList(registerClientDto.redirectUris())))
        .postLogoutRedirectUris(
            uris -> uris.addAll(safeList(registerClientDto.postLogoutRedirectUris())))
        .scopes(scopes -> scopes.addAll(safeList(registerClientDto.scopes())))
        .clientSettings(ClientSettings.builder()
            .requireAuthorizationConsent(registerClientDto.requireAuthorizationConsent()).build())
        .tokenSettings(TokenSettings.builder().build());

    return builder.build();

  }

  public static RegisterClientResponseDto toResponse(Client client) {
    Set<String> authMethods = commaSeparatedToSet(client.getClientAuthenticationMethods());
    Set<String> grantTypes = commaSeparatedToSet(client.getAuthorizationGrantTypes());
    Set<String> redirectUris = commaSeparatedToSet(client.getRedirectUris());
    Set<String> postLogoutUris = commaSeparatedToSet(client.getPostLogoutRedirectUris());
    Set<String> scopes = commaSeparatedToSet(client.getScopes());

    return new RegisterClientResponseDto(client.getClientId(), client.getClientName(), authMethods,
        grantTypes, redirectUris, postLogoutUris, scopes);
  }

  private static List<String> safeList(List<String> source) {
    return CollectionUtils.isEmpty(source) ? List.of() : source;
  }

  private static Set<String> commaSeparatedToSet(String value) {
    if (value == null || value.isBlank()) {
      return Set.of();
    }
    return List.of(value.split(",")).stream().map(String::trim).filter(s -> !s.isEmpty())
        .collect(Collectors.toSet());
  }


  private static AuthorizationGrantType resolveAuthorizationGrantType(String grantType) {
    if (AuthorizationGrantType.AUTHORIZATION_CODE.getValue().equals(grantType)) {
      return AuthorizationGrantType.AUTHORIZATION_CODE;
    }
    if (AuthorizationGrantType.CLIENT_CREDENTIALS.getValue().equals(grantType)) {
      return AuthorizationGrantType.CLIENT_CREDENTIALS;
    }
    if (AuthorizationGrantType.REFRESH_TOKEN.getValue().equals(grantType)) {
      return AuthorizationGrantType.REFRESH_TOKEN;
    }
    return new AuthorizationGrantType(grantType);
  }

  private static ClientAuthenticationMethod resolveClientAuthenticationMethod(String method) {
    if (ClientAuthenticationMethod.CLIENT_SECRET_BASIC.getValue().equals(method)) {
      return ClientAuthenticationMethod.CLIENT_SECRET_BASIC;
    }
    if (ClientAuthenticationMethod.CLIENT_SECRET_POST.getValue().equals(method)) {
      return ClientAuthenticationMethod.CLIENT_SECRET_POST;
    }
    if (ClientAuthenticationMethod.NONE.getValue().equals(method)) {
      return ClientAuthenticationMethod.NONE;
    }
    return new ClientAuthenticationMethod(method);
  }
}
