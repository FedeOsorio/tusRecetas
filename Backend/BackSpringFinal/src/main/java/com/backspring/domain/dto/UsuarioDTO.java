package com.backspring.domain.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class UsuarioDTO {

    @JsonIgnore
    private Integer id_usuario;
    private String usuario;
    private String clave;
    private String nombre;
    private String apellido;
}
