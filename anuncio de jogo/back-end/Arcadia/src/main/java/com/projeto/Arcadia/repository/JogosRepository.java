package com.projeto.Arcadia.repository;

import com.projeto.Arcadia.model.Jogos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JogosRepository extends JpaRepository<Jogos, Long> {
    List<Jogos> findByNomeContaining(String letra);

    List<Jogos> findByNomeContainingAndTipoJogosTipo(String letra, String tipo);

    List<Jogos> findByNomeContainingAndTipoJogosTipoAndPlataformaPlataforma(String letra, String tipo, String plataforma);
}