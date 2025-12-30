package com.scaler.auth_server.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.scaler.auth_server.models.AppUser;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

  boolean existsByEmail(String email);

  Optional<AppUser> findByEmail(String email);

}
