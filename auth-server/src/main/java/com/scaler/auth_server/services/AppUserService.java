package com.scaler.auth_server.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.scaler.auth_server.dtos.RegisterUserDto;
import com.scaler.auth_server.exception.UserAlreadyExistsException;
import com.scaler.auth_server.mappers.AppUserMapper;
import com.scaler.auth_server.models.AppUser;
import com.scaler.auth_server.repositories.AppUserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppUserService implements IAppUserService {
  private final AppUserRepository appUserRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public AppUser registerAppUser(RegisterUserDto registerUserDto) {
    boolean isUserExists = appUserRepository.existsByEmail(registerUserDto.email());

    if (isUserExists) {
      throw new UserAlreadyExistsException(
          "User with email " + registerUserDto.email() + " already exists.");
    }

    AppUser appUser = AppUserMapper.from(registerUserDto);
    String encodedPassword = passwordEncoder.encode(registerUserDto.password());
    appUser.setPassword(encodedPassword);
    AppUser savedAppUser = appUserRepository.save(appUser);
    return savedAppUser;
  }

  @Override
  public AppUser getAppUserByEmail(String email) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getAppUserByEmail'");
  }



}
