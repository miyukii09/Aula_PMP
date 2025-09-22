package com.projeto.Arcadia.service;

import com.projeto.Arcadia.model.Jogos;
import com.projeto.Arcadia.repository.JogosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JogosService {

    @Autowired
    private JogosRepository jogosRepository;

    public List<Jogos> findAll() {
        return jogosRepository.findAll();
    }

    public Optional<Jogos> findById(Long id) {
        return jogosRepository.findById(id);
    }

    public Jogos save(Jogos jogos) {
        return jogosRepository.save(jogos);
    }

    public void deleteById(Long id) {
        jogosRepository.deleteById(id);
    }

    public List<Jogos> findByNomeContaining(String letra) {
        return jogosRepository.findByNomeContaining(letra);
    }

    public List<Jogos> findByNomeContainingAndTipoJogosTipo(String letra, String tipo) {
        return jogosRepository.findByNomeContainingAndTipoJogosTipo(letra, tipo);
    }

    public List<Jogos> findByNomeContainingAndTipoJogosTipoAndPlataformaPlataforma(String letra, String tipo, String plataforma) {
        return jogosRepository.findByNomeContainingAndTipoJogosTipoAndPlataformaPlataforma(letra, tipo, plataforma);
    }
}