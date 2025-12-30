package com.scaler.auth_server.dtos;

import java.util.Collection;
import java.util.Collections;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.scaler.auth_server.models.AppUser;

public class AppUserDetails implements UserDetails {

  private final AppUser appUser;

  public AppUserDetails(AppUser appUser) {
    this.appUser = appUser;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.emptyList();
  }

  public Long getId() {
    return appUser.getId();
  }

  @Override
  public String getPassword() {
    return appUser.getPassword();
  }

  @Override
  public String getUsername() {
    return appUser.getEmail();
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

}
