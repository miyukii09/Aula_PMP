package com.projeto.Arcadia.service;

import com.projeto.Arcadia.model.TipoJogos;
import com.projeto.Arcadia.repository.TipoJogosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TipoJogosService {

    @Autowired
    private TipoJogosRepository tipoJogosRepository;

    public List<TipoJogos> findAll() {
        return tipoJogosRepository.findAll();
    }

    public Optional<TipoJogos> findById(Long id) {
        return tipoJogosRepository.findById(id);
    }

    public TipoJogos save(TipoJogos tipoJogos) {
        return tipoJogosRepository.save(tipoJogos);
    }

    public void deleteById(Long id) {
        tipoJogosRepository.deleteById(id);
    }
}