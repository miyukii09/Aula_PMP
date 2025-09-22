package com.projeto.Arcadia.repository;

import com.projeto.Arcadia.model.TipoJogos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoJogosRepository extends JpaRepository<TipoJogos, Long> {
}