package com.backspring.service.interfaces;

import com.backspring.domain.entity.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {

    Usuario findByUsuarioAndClave(String usuario, String clave) throws Exception;

    Usuario findByUsuario(String usuario);

    Usuario save(Usuario datos);

    void deleteById(Integer id);

    void deleteByUsuario(String nombreUsuario) throws Exception;

    List<Usuario> findAll();

    Optional<Usuario> findById(Integer id);
}
