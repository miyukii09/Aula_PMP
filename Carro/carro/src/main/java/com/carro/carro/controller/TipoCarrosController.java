package com.carro.carro.controller;

import com.carro.carro.model.TipoCarros;
import com.carro.carro.repository.TipoCarrosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipoCarros")
public class TipoCarrosController {

    @Autowired
    private TipoCarrosRepository tipoCarrosRepository;

    @GetMapping
    public List<TipoCarros> listarTipos() {
        return tipoCarrosRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> cadastrarTipo(@RequestBody TipoCarros tipo) {
        try {
            TipoCarros salvo = tipoCarrosRepository.save(tipo);
            return ResponseEntity.ok(salvo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarTipo(@PathVariable Long id) {
        tipoCarrosRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}