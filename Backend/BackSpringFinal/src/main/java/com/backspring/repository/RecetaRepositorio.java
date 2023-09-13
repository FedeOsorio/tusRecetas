package com.backspring.repository;

import com.backspring.domain.entity.Receta;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecetaRepositorio extends JpaRepository<Receta, Number> {

    @Query("SELECT DISTINCT r FROM Receta r JOIN FETCH r.ingredientes")
    List<Receta> findRecetasAndIngredientes();
}
