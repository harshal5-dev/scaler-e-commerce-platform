package com.scaler.auth_server.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.scaler.auth_server.dtos.AppUserDetails;
import com.scaler.auth_server.models.AppUser;
import com.scaler.auth_server.services.IAppUserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

  private final IAppUserService appUserService;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    AppUser appUser = appUserService.getAppUserByEmail(username);
    return new AppUserDetails(appUser);
  }
}

