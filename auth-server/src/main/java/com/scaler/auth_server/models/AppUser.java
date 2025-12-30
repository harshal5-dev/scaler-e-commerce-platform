package com.scaler.auth_server.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "app_user")
public class AppUser extends BaseModel {

  @Column(name = "name", length = 300)
  private String name;

  @Column(name = "email", nullable = false, unique = true, length = 500)
  private String email;

  @Column(name = "password", nullable = false, length = 500)
  private String password;

}
