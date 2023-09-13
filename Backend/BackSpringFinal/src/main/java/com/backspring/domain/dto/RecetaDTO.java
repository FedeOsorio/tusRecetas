package com.backspring.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.List;

@Data
@NoArgsConstructor
public class RecetaDTO {
    @Column(name = "id_receta")
    private Integer idReceta;
    private String titulo;
    private String categoria;
    private String procedimiento;
    private List<IngredientesDTO> ingredientes;

}
