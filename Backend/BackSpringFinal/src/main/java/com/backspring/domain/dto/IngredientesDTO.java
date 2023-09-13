package com.backspring.domain.dto;


import javax.persistence.Column;

public class IngredientesDTO {

    @Column(name = "id_ingrediente")
    private Integer idIngrediente;
    private String nombre;
    private String cantidad;

    public IngredientesDTO() {
    }

    public Integer getIdIngrediente() {
        return idIngrediente;
    }

    public void setIdIngrediente(Integer idIngrediente) {
        this.idIngrediente = idIngrediente;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCantidad() {
        return cantidad;
    }

    public void setCantidad(String cantidad) {
        this.cantidad = cantidad;
    }

}