package com.scaler.auth_server.mappers;

import com.scaler.auth_server.dtos.RegisterUserDto;
import com.scaler.auth_server.dtos.RegisterUserResDto;
import com.scaler.auth_server.models.AppUser;

public final class AppUserMapper {

  private AppUserMapper() {}

  public static AppUser from(RegisterUserDto registerUserDto) {
    AppUser appUser = new AppUser();
    appUser.setName(registerUserDto.name());
    appUser.setEmail(registerUserDto.email());
    return appUser;
  }

  public static RegisterUserResDto from(AppUser appUser) {
    return new RegisterUserResDto(appUser.getId(), appUser.getName(), appUser.getEmail());
  }
}
