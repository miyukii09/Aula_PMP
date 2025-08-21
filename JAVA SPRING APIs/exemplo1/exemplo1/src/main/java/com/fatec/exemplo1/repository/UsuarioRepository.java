package com.fatec.exemplo1.repository;

import com.fatec.exemplo1.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    long count();
}

