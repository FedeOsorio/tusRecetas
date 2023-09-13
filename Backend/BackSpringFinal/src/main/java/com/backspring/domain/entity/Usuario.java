package com.backspring.domain.entity;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(name = "usuarios", uniqueConstraints = {@UniqueConstraint(columnNames = "usuario")})
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id_usuario;
    @NotNull
    @NotBlank(message = "El campo 'usuario' no puede estar vacío")
    @Column(name = "usuario", unique = true)
    String usuario;
    @NotNull
    @NotBlank(message = "El campo 'clave' no puede estar vacío")
    String clave;
    @NotNull
    @NotBlank
    String nombre;
    @NotNull
    @NotBlank
    String apellido;

    public Usuario() {
        super();
    }

    public Usuario(Integer id_usuario, String usuario, String clave, String nombre, String apellido) {
        super();
        this.id_usuario = id_usuario;
        this.usuario = usuario;
        this.clave = clave;
        this.nombre = nombre;
        this.apellido = apellido;
    }

    public Integer getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }
}
