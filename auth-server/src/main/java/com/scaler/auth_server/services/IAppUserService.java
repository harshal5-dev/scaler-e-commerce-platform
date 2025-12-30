package com.scaler.auth_server.services;

import com.scaler.auth_server.dtos.RegisterUserDto;
import com.scaler.auth_server.models.AppUser;

public interface IAppUserService {

  AppUser registerAppUser(RegisterUserDto registerUserDto);

  AppUser getAppUserByEmail(String email);
}
