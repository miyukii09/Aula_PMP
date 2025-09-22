package com.projeto.Arcadia.controller;

import com.projeto.Arcadia.model.Plataforma;
import com.projeto.Arcadia.service.PlataformaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/plataforma")
public class PlataformaController {

    @Autowired
    private PlataformaService plataformaService;

    @GetMapping
    public List<Plataforma> getAllPlataforma() {
        return plataformaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plataforma> getPlataformaById(@PathVariable Long id) {
        Optional<Plataforma> plataforma = plataformaService.findById(id);
        return plataforma.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Plataforma createPlataforma(@RequestBody Plataforma plataforma) {
        return plataformaService.save(plataforma);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Plataforma> updatePlataforma(@PathVariable Long id, @RequestBody Plataforma plataformaDetails) {
        Optional<Plataforma> plataformaOptional = plataformaService.findById(id);
        if (plataformaOptional.isPresent()) {
            Plataforma plataforma = plataformaOptional.get();
            plataforma.setPlataforma(plataformaDetails.getPlataforma());
            Plataforma updatedPlataforma = plataformaService.save(plataforma);
            return ResponseEntity.ok(updatedPlataforma);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlataforma(@PathVariable Long id) {
        plataformaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}