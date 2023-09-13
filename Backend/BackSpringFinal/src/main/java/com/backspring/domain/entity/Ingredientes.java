package com.backspring.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
@Table(name = "ingredientes")
public class Ingredientes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ingrediente")
    private Integer idIngrediente;
    @NotNull
    private String nombre;
    @NotNull
    private String cantidad;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "recetaid")
    private Receta receta;

    public Ingredientes() {
    }

    public Ingredientes(Integer idIngrediente, String nombre, String cantidad, Receta receta) {
        this.idIngrediente = idIngrediente;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.receta = receta;
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

    public Receta getReceta() {
        return receta;
    }

    public void setReceta(Receta receta) {
        this.receta = receta;
    }
}
