package com.backspring.repository;

import com.backspring.domain.entity.Ingredientes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IngredientesRepositorio extends JpaRepository<Ingredientes, Integer> {

    @Modifying
    @Query("DELETE FROM Ingredientes i WHERE i.receta.idReceta = :recetaid")
    void deleteByRecetaid(@Param("recetaid") Integer recetaid);

}
