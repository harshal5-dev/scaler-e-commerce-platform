package com.scaler.auth_server.services;

import com.scaler.auth_server.dtos.RegisterClientDto;
import com.scaler.auth_server.models.Client;

public interface IClientService {

  Client registerClient(RegisterClientDto registerClientDto);

}
