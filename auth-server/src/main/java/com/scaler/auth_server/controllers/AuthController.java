package com.scaler.auth_server.controllers;

import java.time.Duration;
import java.time.Instant;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.scaler.auth_server.dtos.AppResponse;
import com.scaler.auth_server.dtos.AppUserDetails;
import com.scaler.auth_server.dtos.LoginRequestDto;
import com.scaler.auth_server.dtos.LoginResponseDto;
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
  private final AuthenticationManager authenticationManager;
  private final JwtEncoder jwtEncoder;


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
  public ResponseEntity<AppResponse<LoginResponseDto>> login(@RequestBody LoginRequestDto dto) {
    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(dto.email(), dto.password()));

    AppUserDetails principal = (AppUserDetails) authentication.getPrincipal();

    Instant issuedAt = Instant.now();
    Instant expiresAt = issuedAt.plusSeconds(60 * 60); // 1 hour expiry

    JwtClaimsSet claims = JwtClaimsSet.builder().subject(principal.getUsername()).issuedAt(issuedAt)
        .expiresAt(expiresAt).claim("userId", principal.getId()).build();

    String token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

    ResponseCookie cookie = ResponseCookie.from("auth_token", token).httpOnly(true).secure(true)
        .path("/").sameSite("Lax").maxAge(Duration.between(issuedAt, expiresAt)).build();

    LoginResponseDto responseDto =
        new LoginResponseDto(principal.getId(), principal.getUsername(), token, expiresAt);
    SuccessResponse<LoginResponseDto> response =
        new SuccessResponse<>("login successful", responseDto);

    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(response);
  }



}
