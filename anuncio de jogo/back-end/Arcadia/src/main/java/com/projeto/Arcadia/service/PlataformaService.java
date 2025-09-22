package com.projeto.Arcadia.service;

import com.projeto.Arcadia.model.Plataforma;
import com.projeto.Arcadia.repository.PlataformaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlataformaService {

    @Autowired
    private PlataformaRepository plataformaRepository;

    public List<Plataforma> findAll() {
        return plataformaRepository.findAll();
    }

    public Optional<Plataforma> findById(Long id) {
        return plataformaRepository.findById(id);
    }

    public Plataforma save(Plataforma plataforma) {
        return plataformaRepository.save(plataforma);
    }

    public void deleteById(Long id) {
        plataformaRepository.deleteById(id);
    }
}