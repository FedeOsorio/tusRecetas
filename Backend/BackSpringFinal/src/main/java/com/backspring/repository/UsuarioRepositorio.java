package com.backspring.repository;


import com.backspring.domain.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Number> {
    Optional<Usuario> findByUsuario(String usuario);

    Optional<Usuario> findByUsuarioAndClave(String usuario, String clave);
}
