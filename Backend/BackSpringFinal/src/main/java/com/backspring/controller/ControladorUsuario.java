package com.backspring.controller;

import com.backspring.domain.dto.UsuarioDTO;
import com.backspring.domain.entity.LoginUsuario;
import com.backspring.domain.entity.Usuario;
import com.backspring.domain.mappers.UsuarioMapper;
import com.backspring.service.UsuarioServiceImpl;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Api(value = "Allowed actions for the User Entity", tags = "User Controller")
@CrossOrigin
@RestController
@RequestMapping(path = "/usuarios")
public class ControladorUsuario {
    @Autowired
    private UsuarioServiceImpl serviceUsuario;
    @Autowired
    private UsuarioMapper mapUsuario;

    @GetMapping("")
    public ResponseEntity<?> obtenerTodos() {
        List<Usuario> usuarios = serviceUsuario.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(usuarios);
    }
    @GetMapping("/{nombreUsuario}")
    public ResponseEntity<?> obtenerPorUsuario(@PathVariable String nombreUsuario) {
        try {
            Usuario usuario = serviceUsuario.findByUsuario(nombreUsuario);
            UsuarioDTO usuarioDTO = mapUsuario.toDTO(usuario);
            return ResponseEntity.status(HttpStatus.OK).body(usuarioDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/registro")
    public ResponseEntity<?> agregarUsuario(@Valid @RequestBody UsuarioDTO datosRecibidos, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Datos inválidos");
        }
        try {
            String usuarioRecibido = datosRecibidos.getUsuario();
            serviceUsuario.findByUsuario(usuarioRecibido); // si el usuario NO existe, da error.
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El usuario ya se encuentra registrado");
        } catch (NoSuchElementException e) {
            System.out.println(e.getMessage());
            System.out.println("-- Creando usuario nuevo --");
            Usuario usuario = mapUsuario.toEntity(datosRecibidos);
            Usuario usuarioCreado = serviceUsuario.save(usuario);
            UsuarioDTO usuarioDTO = mapUsuario.toDTO(usuarioCreado);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioDTO);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody LoginUsuario loginRequest) {
        try {
            serviceUsuario.findByUsuarioAndClave(loginRequest.getUsuario(), loginRequest.getClave());
            return ResponseEntity.status(HttpStatus.OK).body(true);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
    }

    @DeleteMapping("/{nombreUsuario}")
    public ResponseEntity<?> deleteUsuario(@PathVariable String nombreUsuario) {
        try {
            Usuario usuarioBuscado = serviceUsuario.findByUsuario(nombreUsuario);
            serviceUsuario.deleteByUsuario(usuarioBuscado.getUsuario());
            UsuarioDTO usuarioEliminado = mapUsuario.toDTO(usuarioBuscado);
            return ResponseEntity.ok("Usuario con ID: " + usuarioEliminado.getUsuario() + " eliminado");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{nombreUsuario}")
    public ResponseEntity<?> update(@PathVariable String nombreUsuario, @Valid @RequestBody UsuarioDTO usuarioActualizado, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Datos inválidos");
        }
        try {
            Usuario usuarioRecibido = serviceUsuario.findByUsuario(nombreUsuario);
            Usuario usuario = mapUsuario.toEntity(usuarioActualizado);
            // Actualización completa
            usuarioRecibido.setUsuario(usuario.getUsuario());
            usuarioRecibido.setClave(usuario.getClave());
            usuarioRecibido.setNombre(usuario.getNombre());
            usuarioRecibido.setApellido(usuario.getApellido());
            serviceUsuario.save(usuarioRecibido);
            UsuarioDTO usuarioDTO = mapUsuario.toDTO(usuario);
            return ResponseEntity.status(HttpStatus.OK).body(usuarioDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }


    @PatchMapping("/{nombreUsuario}")
    public ResponseEntity<?> partialUpdate(@PathVariable String nombreUsuario, @RequestBody UsuarioDTO usuarioActualizado) {
        try {
            Usuario usuarioRecibido = serviceUsuario.findByUsuario(nombreUsuario);
            Usuario usuario = mapUsuario.toEntity(usuarioActualizado);
            if (usuarioActualizado.getUsuario() != null) {
                usuarioRecibido.setUsuario(usuario.getUsuario());
            }
            if (usuarioActualizado.getClave() != null) {
                usuarioRecibido.setClave(usuario.getClave());
            }
            if (usuarioActualizado.getNombre() != null) {
                usuarioRecibido.setNombre(usuario.getNombre());
            }
            if (usuarioActualizado.getApellido() != null) {
                usuarioRecibido.setApellido(usuario.getApellido());
            }
            serviceUsuario.save(usuarioRecibido);
            UsuarioDTO usuarioDTO = mapUsuario.toDTO(usuarioRecibido);
            return ResponseEntity.ok().body(usuarioDTO);

        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}