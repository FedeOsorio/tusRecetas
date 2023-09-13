package com.backspring.domain.mappers;

import com.backspring.domain.entity.Receta;
import com.backspring.domain.dto.RecetaDTO;
import org.mapstruct.Mapper;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Mapper(componentModel = "spring")
public interface RecetaMapper {

    RecetaDTO toDTO(Receta receta);

    Receta toEntity(RecetaDTO recetaDTO);
}
