package com.backspring.datos;

import com.backspring.domain.entity.Usuario;

public class DatosDummy {

    public static Usuario getUsuarioMaestro() {
        return new Usuario(0, "maestro", "administrador", "Federiquito", "Osorito");
    }

    public static Usuario getUsuarioAdmin() {
        return new Usuario(1, "admin", "master", "Federico", "Osorio");
    }


}
