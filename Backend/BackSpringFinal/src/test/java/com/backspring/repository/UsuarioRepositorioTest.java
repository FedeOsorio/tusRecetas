package com.backspring.repository;

import com.backspring.datos.DatosDummy;
import com.backspring.domain.entity.Usuario;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UsuarioRepositorioTest {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @BeforeEach
    void setUp() {
        usuarioRepositorio.save(DatosDummy.getUsuarioAdmin());
        usuarioRepositorio.save(DatosDummy.getUsuarioMaestro());
    }

    @AfterEach
    void tearDown() {
        usuarioRepositorio.deleteAll();
    }

    @Test
    @DisplayName("[UsuarioRepositorio] - Buscar Usuario por nombre de usuario")
    void findByUsuario() {
        //GIVEN
        String test = "admin";
        String testB = "maestro";

        //WHEN
        Optional<Usuario> oUsuario = usuarioRepositorio.findByUsuario(test);
        Optional<Usuario> oUsuarioB = usuarioRepositorio.findByUsuario(testB);

        //THEN
        assertThat(oUsuario.isPresent()).isTrue();
        assertThat(oUsuario.get().getUsuario()).isEqualTo(test);
        System.out.println(assertThat(oUsuario.get().getUsuario()).isEqualTo(test));
        assertThat(oUsuarioB.get().getUsuario()).isEqualTo(testB);
        assertThat(oUsuarioB.get().getNombre());

    }

    @Test
    @DisplayName("[UsuarioRepositorio] - Login por Usuario y Contraseña")
    void findByUsuarioAndClave() {
        //GIVEN
        String test = "admin";
        String claveTest = "master";

        //WHEN
        Optional<Usuario> oUsuario = usuarioRepositorio.findByUsuarioAndClave(test, claveTest);
        //THEN
        assertThat(oUsuario.isPresent()).isTrue();
        assertThat(oUsuario.get().getUsuario()).isEqualTo(test);
        assertThat(oUsuario.get().getClave()).isEqualTo(claveTest);
    }
}