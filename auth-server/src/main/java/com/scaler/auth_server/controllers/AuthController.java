package com.scaler.auth_server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.scaler.auth_server.dtos.AppResponse;
import com.scaler.auth_server.dtos.RegisterUserDto;
import com.scaler.auth_server.dtos.RegisterUserResDto;
import com.scaler.auth_server.dtos.SuccessResponse;
import com.scaler.auth_server.mappers.AppUserMapper;
import com.scaler.auth_server.models.AppUser;
import com.scaler.auth_server.services.IAppUserService;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final IAppUserService appUserService;


  @PostMapping("/register")
  public ResponseEntity<AppResponse<RegisterUserResDto>> register(
      @RequestBody RegisterUserDto registerUserDto) {
    AppUser registeredUser = appUserService.registerAppUser(registerUserDto);
    RegisterUserResDto responseDto = AppUserMapper.from(registeredUser);
    AppResponse<RegisterUserResDto> response =
        new SuccessResponse<>("user registered successfully", responseDto);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/login")
  public String login(@RequestBody String entity) {
    // TODO: process POST request

    return entity;
  }



}
