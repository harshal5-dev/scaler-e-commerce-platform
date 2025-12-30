package com.scaler.auth_server.services;

import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import com.scaler.auth_server.models.Client;

public interface IClientService {

  Client registerClient(RegisteredClient registeredClient);

}
