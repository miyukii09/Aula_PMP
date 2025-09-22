package com.projeto.Arcadia.controller;

import com.projeto.Arcadia.model.TipoJogos;
import com.projeto.Arcadia.service.TipoJogosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tipojogos")
public class TipoJogosController {

    @Autowired
    private TipoJogosService tipoJogosService;

    @GetMapping
    public List<TipoJogos> getAllTipoJogos() {
        return tipoJogosService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoJogos> getTipoJogosById(@PathVariable Long id) {
        Optional<TipoJogos> tipoJogos = tipoJogosService.findById(id);
        return tipoJogos.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public TipoJogos createTipoJogos(@RequestBody TipoJogos tipoJogos) {
        return tipoJogosService.save(tipoJogos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipoJogos> updateTipoJogos(@PathVariable Long id, @RequestBody TipoJogos tipoJogosDetails) {
        Optional<TipoJogos> tipoJogosOptional = tipoJogosService.findById(id);
        if (tipoJogosOptional.isPresent()) {
            TipoJogos tipoJogos = tipoJogosOptional.get();
            tipoJogos.setTipo(tipoJogosDetails.getTipo());
            TipoJogos updatedTipoJogos = tipoJogosService.save(tipoJogos);
            return ResponseEntity.ok(updatedTipoJogos);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipoJogos(@PathVariable Long id) {
        tipoJogosService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}