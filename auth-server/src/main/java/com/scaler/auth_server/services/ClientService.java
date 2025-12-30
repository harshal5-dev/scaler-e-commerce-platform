package com.scaler.auth_server.services;

import org.springframework.stereotype.Service;
import com.scaler.auth_server.dtos.RegisterClientDto;
import com.scaler.auth_server.mappers.ClientMapper;
import com.scaler.auth_server.models.Client;
import com.scaler.auth_server.repositories.ClientRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClientService implements IClientService {

  private final JpaRegisteredClientRepository jpaRegisteredClientRepository;
  private final ClientRepository clientRepository;

  @Override
  public Client registerClient(RegisterClientDto registerClientDto) {
    var registeredClient = ClientMapper.toRegisteredClient(registerClientDto);
    jpaRegisteredClientRepository.save(registeredClient);
    return clientRepository.findByClientId(registerClientDto.clientId())
        .orElseThrow(() -> new IllegalStateException("Client not persisted"));
  }

}
