package com.backspring.domain.mappers;

import com.backspring.domain.dto.UsuarioDTO;
import com.backspring.domain.entity.Usuario;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    UsuarioDTO toDTO(Usuario usuario);

    Usuario toEntity(UsuarioDTO usuarioDTO);
}
