package com.backspring.service;

import com.backspring.domain.entity.Receta;
import com.backspring.repository.IngredientesRepositorio;
import com.backspring.repository.RecetaRepositorio;
import com.backspring.service.interfaces.RecetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecetaServiceImpl implements RecetaService {

    @Autowired
    private RecetaRepositorio recetaRepositorio;
    @Autowired
    private IngredientesRepositorio ingredientesRepositorio;

    public RecetaServiceImpl(RecetaRepositorio recetaRepositorio, IngredientesRepositorio ingredientesRepositorio) {
        this.recetaRepositorio = recetaRepositorio;
        this.ingredientesRepositorio = ingredientesRepositorio;
    }

    public List<Receta> findAll() {
        return recetaRepositorio.findAll();
    }

    @Override
    public Optional<Receta> findById(Integer idReceta) {
        return recetaRepositorio.findById(idReceta);
    }

    public Receta save(Receta nuevaReceta) {
        return recetaRepositorio.save(nuevaReceta);
    }

    public List<Receta> findRecetasAndIngredientes() {
        return recetaRepositorio.findRecetasAndIngredientes();
    }

    public void deleteById(Integer id) throws Exception {
        Optional<Receta> receta = recetaRepositorio.findById(id);
        if (!receta.isPresent()) {
            throw new Exception("No se encontraron recetas con ese ID");
        }
        ingredientesRepositorio.deleteByRecetaid(id);
        recetaRepositorio.deleteById(id);
    }
}
