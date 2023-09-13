package com.backspring.domain.entity;

import com.backspring.repository.LoginRequest;
import com.sun.istack.NotNull;

public class LoginUsuario implements LoginRequest {

    @NotNull
    private String usuario;
    @NotNull
    private String clave;

    public LoginUsuario() {
    }

    public LoginUsuario(String usuario, String clave) {
        this.usuario = usuario;
        this.clave = clave;
    }

    public String getUsuario() {
        return usuario;
    }

    @Override
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }
}
