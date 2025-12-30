package com.scaler.auth_server.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterClientDto {
  private String clientId;
  private String clientSecret;
  private String clientName;
  private String clientAuthenticationMethods;
  private String authorizationGrantTypes;
  private String redirectUri;
  private String postLogoutRedirectUri;
  private String scopes;
}
