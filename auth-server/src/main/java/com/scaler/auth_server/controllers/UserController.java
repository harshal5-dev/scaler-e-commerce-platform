package com.scaler.auth_server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.scaler.auth_server.dtos.AppResponse;
import com.scaler.auth_server.dtos.SuccessResponse;
import com.scaler.auth_server.dtos.UserInfoResponseDto;
import com.scaler.auth_server.models.AppUser;
import com.scaler.auth_server.services.IAppUserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

  private final IAppUserService appUserService;

  @GetMapping("/me")
  public ResponseEntity<AppResponse<UserInfoResponseDto>> me(@AuthenticationPrincipal Jwt jwt) {
    String email = jwt.getSubject();
    AppUser user = appUserService.getAppUserByEmail(email);
    UserInfoResponseDto dto =
        new UserInfoResponseDto(user.getId(), user.getName(), user.getEmail());
    return ResponseEntity.ok(new SuccessResponse<>("user info fetched", dto));
  }

}
