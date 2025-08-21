package com.fatec.exemplo1.repository;
import com.fatec.exemplo1.model.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TipoUsuarioRepository extends JpaRepository<TipoUsuario, Long> {

}