package com.iasolutions.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.iasolutions.demo.Model.UsuarioEntity;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {
//vacio porque se haran cruds basicos como: INSERTAR - ELIMINAR - ACTUALIZAR - BUSCAR   
}
