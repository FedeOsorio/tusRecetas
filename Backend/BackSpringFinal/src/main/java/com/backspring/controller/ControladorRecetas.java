package com.backspring.controller;

import com.backspring.domain.entity.Receta;
import com.backspring.domain.dto.RecetaDTO;
import com.backspring.domain.mappers.RecetaMapper;
import com.backspring.service.RecetaServiceImpl;
import com.backspring.service.exceptions.RecetasNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(path = "/recetas")
public class ControladorRecetas {

    @Autowired
    private RecetaMapper recetaMap;
    @Autowired
    private RecetaServiceImpl serviceReceta;

    @GetMapping("/listado")
    public List<Receta> views() {
        return serviceReceta.findAll();
    }

    @PostMapping("")
    @ResponseBody
    public ResponseEntity<?> crearReceta(@RequestBody RecetaDTO nuevaRecetaDTO) {
        try {
            Receta nuevaReceta = recetaMap.toEntity(nuevaRecetaDTO);
            nuevaReceta.getIngredientes().forEach(ingrediente -> ingrediente.setReceta(nuevaReceta));
            Receta recetaGuardada = serviceReceta.save(nuevaReceta);
            RecetaDTO recetaDTO = recetaMap.toDTO(recetaGuardada);
            return ResponseEntity.status(HttpStatus.CREATED).body(recetaDTO);
        } catch (Exception error) {
            throw error;
        }
    }

    @GetMapping("")
    public List<RecetaDTO> getRecetasCompletas() {
        try {
            List<Receta> recetas = serviceReceta.findRecetasAndIngredientes();
            System.out.println("Recetas encontradas: " + recetas.size());

            List<RecetaDTO> recetasDTO = recetas.stream()
                    .map(recetaMap::toDTO)
                    .collect(Collectors.toList());

            System.out.println("Recetas devueltas: " + recetasDTO.size());
            return recetasDTO;
        } catch (Exception e) {
            String mensaje = "No se encontraron recetas.";
            System.out.println(mensaje);
            throw new RecetasNotFoundException(mensaje);
        }
    }

    @GetMapping("/{idReceta}")
    public Optional<RecetaDTO> getRecetaPorId(@PathVariable Integer idReceta) {
        try {
            Optional<Receta> receta = serviceReceta.findById(idReceta);
            if (receta.isPresent()) {
                RecetaDTO recetaDto = recetaMap.toDTO(receta.get());
                return Optional.of(recetaDto);
            } else {
                return Optional.empty();
            }
        } catch (Exception e) {
            String mensaje = "No se encontró la receta con el ID " + idReceta;
            System.out.println(mensaje);
            throw new RecetasNotFoundException(mensaje);
        }
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> delete(@PathVariable Integer id) throws Exception {
        serviceReceta.deleteById(id);
        return ResponseEntity.ok("Receta con ID: " + id + " eliminada");
    }
}