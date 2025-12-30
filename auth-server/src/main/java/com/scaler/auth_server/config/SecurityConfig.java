package com.scaler.auth_server.config;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.UUID;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.util.matcher.MediaTypeRequestMatcher;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import com.scaler.auth_server.exception.CustomAccessDeniedHandler;
import com.scaler.auth_server.exception.CustomBasicAuthenticationEntryPoint;
import com.scaler.auth_server.security.AppUsernamePwdAuthenticationProvider;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  @Order(1)
  public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http)
      throws Exception {

    http.oauth2AuthorizationServer((authorizationServer) -> {
      http.securityMatcher(authorizationServer.getEndpointsMatcher());
      authorizationServer.oidc(Customizer.withDefaults()); // Enable OpenID Connect 1.0
    }).authorizeHttpRequests((authorize) -> authorize.anyRequest().authenticated())
        // Redirect to the login page when not authenticated from the
        // authorization endpoint
        .exceptionHandling((exceptions) -> exceptions.defaultAuthenticationEntryPointFor(
            new LoginUrlAuthenticationEntryPoint("/login"),
            new MediaTypeRequestMatcher(MediaType.TEXT_HTML)));

    return http.build();
  }

  @Bean
  @Order(2)
  SecurityFilterChain defaultSecurityFilterChain(HttpSecurity httpSecurity) throws Exception {

    httpSecurity
        .sessionManagement(smc -> smc.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    httpSecurity.cors(AbstractHttpConfigurer::disable);
    httpSecurity.csrf(AbstractHttpConfigurer::disable);
    httpSecurity.authorizeHttpRequests(authorizeRequests -> authorizeRequests
        .requestMatchers("/api/auth/register", "/api/auth/login").permitAll().anyRequest()
        .authenticated());
    httpSecurity.exceptionHandling(ehc -> ehc.accessDeniedHandler(new CustomAccessDeniedHandler())
        .authenticationEntryPoint(new CustomBasicAuthenticationEntryPoint()));
    httpSecurity.oauth2ResourceServer(
        oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthConverter())));

    return httpSecurity.build();
  }

  // @Bean
  // public UserDetailsService userDetailsService() {
  // UserDetails userDetails = User.withDefaultPasswordEncoder().username("user")
  // .password("password").roles("USER").build();

  // return new InMemoryUserDetailsManager(userDetails);
  // }

  // @Bean
  // public RegisteredClientRepository registeredClientRepository() {
  // RegisteredClient oidcClient = RegisteredClient.withId(UUID.randomUUID().toString())
  // .clientId("oidc-client").clientSecret("{noop}secret")
  // .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
  // .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
  // .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
  // .redirectUri("http://127.0.0.1:8080/login/oauth2/code/oidc-client")
  // .postLogoutRedirectUri("http://127.0.0.1:8080/").scope(OidcScopes.OPENID)
  // .scope(OidcScopes.PROFILE)
  // .clientSettings(ClientSettings.builder().requireAuthorizationConsent(true).build()).build();

  // return new InMemoryRegisteredClientRepository(oidcClient);
  // }

  @Bean
  public JWKSource<SecurityContext> jwkSource() {
    KeyPair keyPair = generateRsaKey();
    RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
    RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
    RSAKey rsaKey = new RSAKey.Builder(publicKey).privateKey(privateKey)
        .keyID(UUID.randomUUID().toString()).build();
    JWKSet jwkSet = new JWKSet(rsaKey);
    return new ImmutableJWKSet<>(jwkSet);
  }

  private static KeyPair generateRsaKey() {
    KeyPair keyPair;
    try {
      KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
      keyPairGenerator.initialize(2048);
      keyPair = keyPairGenerator.generateKeyPair();
    } catch (Exception ex) {
      throw new IllegalStateException(ex);
    }
    return keyPair;
  }

  @Bean
  public JwtDecoder jwtDecoder(JWKSource<SecurityContext> jwkSource) {
    return OAuth2AuthorizationServerConfiguration.jwtDecoder(jwkSource);
  }

  @Bean
  public AuthorizationServerSettings authorizationServerSettings() {
    return AuthorizationServerSettings.builder().build();
  }

  @Bean
  JwtAuthenticationConverter jwtAuthConverter() {
    JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
    return converter;
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }

  @Bean
  AuthenticationManager authenticationManager(UserDetailsService userDetailsService,
      PasswordEncoder passwordEncoder) {
    AppUsernamePwdAuthenticationProvider authProvider =
        new AppUsernamePwdAuthenticationProvider(userDetailsService, passwordEncoder);
    ProviderManager providerManager = new ProviderManager(authProvider);
    providerManager.setEraseCredentialsAfterAuthentication(false);

    return providerManager;
  }

}
