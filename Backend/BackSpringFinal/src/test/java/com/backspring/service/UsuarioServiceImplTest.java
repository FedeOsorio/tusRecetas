package com.backspring.service;

import com.backspring.datos.DatosDummy;
import com.backspring.domain.entity.Usuario;
import com.backspring.repository.UsuarioRepositorio;
import com.backspring.service.interfaces.UsuarioService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.*;

@SpringBootTest
class UsuarioServiceImplTest {

    @Mock
    private UsuarioRepositorio usuarioRepositorio;

    private UsuarioService usuarioService;

    @BeforeEach
    void setUp() {
        usuarioRepositorio = mock(UsuarioRepositorio.class);
        usuarioService = new UsuarioServiceImpl(usuarioRepositorio);
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void findByUsuarioAndClave() throws Exception {
        String test = "admin";
        String claveTest = "master";
        when(this.usuarioRepositorio.findByUsuarioAndClave(test, claveTest))
                .thenReturn(Optional.of(
                        DatosDummy.getUsuarioAdmin()));

        //WHEN
        Optional<Usuario> usuarioEncontrado = Optional.ofNullable(this.usuarioService.findByUsuarioAndClave(test, claveTest));

        //THEN
        assertThat(usuarioEncontrado.isPresent()).isTrue();
        assert usuarioEncontrado.orElse(null) != null;
        assertThat(usuarioEncontrado.orElse(null).getUsuario()).isEqualTo(test);
    }


    @Test
    void findAll() {
        //GIVEN
        when(this.usuarioRepositorio.findAll())
                .thenReturn(Arrays.asList(
                        DatosDummy.getUsuarioAdmin(),
                        DatosDummy.getUsuarioMaestro()
                ));
        //WHEN
        List<Usuario> usuarios = usuarioService.findAll();

        //THEN
        assertThat(usuarios.size()).isEqualTo(2);
        assertThat(usuarios.isEmpty()).isFalse();

        verify(usuarioRepositorio).findAll();
    }

    @Test
    void findByUsuario() throws Exception {
        String test = "admin";
        when(this.usuarioRepositorio.findByUsuario("admin"))
                .thenReturn(Optional.of(DatosDummy.getUsuarioAdmin()));

        //WHEN
        Optional<Usuario> usuarioEncontrado = Optional.ofNullable(this.usuarioService.findByUsuario(test));

        //THEN
        assertThat(usuarioEncontrado.isPresent()).isTrue();
        assert usuarioEncontrado.orElse(null) != null;
        assertThat(usuarioEncontrado.orElse(null).getUsuario()).isEqualTo(test);
    }

    @Test
    void save() {
        //GIVEN
        Usuario usuario = DatosDummy.getUsuarioMaestro();

        //WHEN
        usuarioService.save(usuario);

        //THEN
        ArgumentCaptor<Usuario> usuarioArgumentCaptor = ArgumentCaptor.forClass(Usuario.class);

        verify(usuarioRepositorio).save(usuarioArgumentCaptor.capture());

        Usuario usuarioCaptor = usuarioArgumentCaptor.getValue();

        assertThat(usuarioCaptor).isEqualTo(usuario);

    }

    @Test
    void deleteById() {
        //GIVEN
        Usuario usuario = DatosDummy.getUsuarioMaestro();

        //WHEN
        usuarioService.deleteById(usuario.getId_usuario());

        //THEN
        verify(usuarioRepositorio).deleteById(usuario.getId_usuario());
    }

   /*  @Test
   void deleteByUsuario() throws Exception {
        Usuario usuario = DatosDummy.getUsuarioAdmin();

        // Paso 3
        when(usuarioService.findByUsuario("admin")).thenReturn(usuario);

        // Paso 4
        usuarioService.deleteByUsuario(usuario.getUsuario());

        // Paso 5
        verify(usuarioRepositorio).deleteById(usuario.getId_usuario());
    }*/
}