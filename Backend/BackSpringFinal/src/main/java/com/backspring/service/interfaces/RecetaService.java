package com.backspring.service.interfaces;

import com.backspring.domain.entity.Receta;

import java.util.List;
import java.util.Optional;

public interface RecetaService {

    Receta save(Receta nuevaReceta);

    List<Receta> findRecetasAndIngredientes();

    List<Receta> findAll();

    Optional<Receta> findById(Integer idReceta);

    void deleteById(Integer id) throws Exception;
}
