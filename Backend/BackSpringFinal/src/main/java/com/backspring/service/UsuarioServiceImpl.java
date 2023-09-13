package com.backspring.service;

import com.backspring.domain.entity.Usuario;
import com.backspring.repository.UsuarioRepositorio;
import com.backspring.service.interfaces.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public UsuarioServiceImpl(UsuarioRepositorio usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    @Override
    public Usuario findByUsuarioAndClave(String usuario, String clave) throws Exception {
        Optional<Usuario> usuarioBuscado = usuarioRepositorio.findByUsuarioAndClave(usuario, clave);
        if (!usuarioBuscado.isPresent()){
            throw new Exception("Las credenciales son inválidas o no existe el usuario");
        }
        return usuarioBuscado.get();
    }

    @Override
    public Usuario findByUsuario(String usuario) {
        Optional<Usuario> usuarioBuscado = usuarioRepositorio.findByUsuario(usuario);
        if (!usuarioBuscado.isPresent()) {
            throw new NoSuchElementException("El usuario " + usuario + " no existe en la base de datos.");
        } else {
            return usuarioBuscado.get();
        }
    }

    @Override
    public Usuario save(Usuario datos) {
        return usuarioRepositorio.save(datos);
    }

    @Override
    public void deleteById(Integer id) {
        usuarioRepositorio.deleteById(id);
    }

    @Override
    public void deleteByUsuario(String nombreUsuario) {
        Optional<Usuario> usuario = usuarioRepositorio.findByUsuario(nombreUsuario);
        Integer idUsuario = 0;
        if (usuario.isPresent()) {
            idUsuario = usuario.get().getId_usuario();
        }
        deleteById(idUsuario);
    }

    @Override
    public List<Usuario> findAll() {
        return this.usuarioRepositorio.findAll();
    }

    @Override
    public Optional<Usuario> findById(Integer id) {
        return this.usuarioRepositorio.findById(id);
    }

}
