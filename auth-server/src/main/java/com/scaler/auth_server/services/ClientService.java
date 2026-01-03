package com.scaler.auth_server.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.scaler.auth_server.dtos.RegisterClientDto;
import com.scaler.auth_server.mappers.ClientMapper;
import com.scaler.auth_server.models.Client;
import com.scaler.auth_server.repositories.ClientRepository;
import com.scaler.auth_server.utils.SecretGenerator;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClientService implements IClientService {

  private final JpaRegisteredClientRepository jpaRegisteredClientRepository;
  private final ClientRepository clientRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public Client registerClient(RegisterClientDto registerClientDto) {
    // Generate secure client ID and secret
    String clientId = SecretGenerator.generateClientId();
    String plainSecret = SecretGenerator.generateClientSecret();
    String hashedSecret = "{bcrypt}" + passwordEncoder.encode(plainSecret);

    var registeredClient =
        ClientMapper.toRegisteredClient(registerClientDto, clientId, hashedSecret);
    jpaRegisteredClientRepository.save(registeredClient);

    Client client = clientRepository.findByClientId(clientId)
        .orElseThrow(() -> new IllegalStateException("Client not persisted"));

    // Store the plain secret temporarily for the response (it's not persisted)
    client.setPlainSecret(plainSecret);
    return client;
  }

}
