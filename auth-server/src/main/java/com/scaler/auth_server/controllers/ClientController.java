package com.scaler.auth_server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.scaler.auth_server.dtos.AppResponse;
import com.scaler.auth_server.dtos.RegisterClientDto;
import com.scaler.auth_server.dtos.RegisterClientResponseDto;
import com.scaler.auth_server.dtos.SuccessResponse;
import com.scaler.auth_server.mappers.ClientMapper;
import com.scaler.auth_server.models.Client;
import com.scaler.auth_server.services.IClientService;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
public class ClientController {

  private final IClientService clientService;

  @PostMapping("/register")
  public ResponseEntity<AppResponse<RegisterClientResponseDto>> registerClient(
      @RequestBody RegisterClientDto registerClientDto) {
    Client entity = clientService.registerClient(registerClientDto);
    RegisterClientResponseDto responseDto = ClientMapper.toResponse(entity);
    return ResponseEntity.ok(new SuccessResponse<>("client registered successfully", responseDto));
  }


}
