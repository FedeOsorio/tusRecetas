package com.backspring.domain.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "recetas")
public class Receta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_receta")
    private Integer idReceta;
    @NotNull
    private String titulo;
    @NotNull
    private String categoria;
    private String procedimiento;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "receta", orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Ingredientes> ingredientes = new ArrayList<>();

    public Receta() {
    }

    public Receta(Integer idReceta, String titulo, String categoria, String procedimiento, List<Ingredientes> ingredientes) {
        this.idReceta = idReceta;
        this.titulo = titulo;
        this.categoria = categoria;
        this.procedimiento = procedimiento;
        this.ingredientes = ingredientes;
    }

    public Integer getIdReceta() {
        return idReceta;
    }

    public void setIdReceta(Integer idReceta) {
        this.idReceta = idReceta;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getProcedimiento() {
        return procedimiento;
    }

    public void setProcedimiento(String procedimiento) {
        this.procedimiento = procedimiento;
    }

    public List<Ingredientes> getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(List<Ingredientes> ingredientes) {
        this.ingredientes = ingredientes;
    }
}
