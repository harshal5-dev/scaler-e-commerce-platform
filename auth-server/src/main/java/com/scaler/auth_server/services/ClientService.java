package com.scaler.auth_server.services;

import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.stereotype.Service;
import com.scaler.auth_server.models.Client;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClientService implements IClientService {

  private final JpaRegisteredClientRepository jpaRegisteredClientRepository;

  @Override
  public Client registerClient(RegisteredClient registeredClient) {
    // Implementation logic to register a client
    jpaRegisteredClientRepository.save(registeredClient);
    return new Client();
  }

}
