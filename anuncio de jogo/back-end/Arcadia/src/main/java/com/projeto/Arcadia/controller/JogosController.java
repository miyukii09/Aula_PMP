package com.projeto.Arcadia.controller;

import com.projeto.Arcadia.model.Jogos;
import com.projeto.Arcadia.service.JogosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/jogos")
public class JogosController {

    @Autowired
    private JogosService jogosService;

    @GetMapping
    public List<Jogos> getAllJogos() {
        return jogosService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Jogos> getJogosById(@PathVariable Long id) {
        Optional<Jogos> jogos = jogosService.findById(id);
        return jogos.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Jogos createJogos(@RequestBody Jogos jogos) {
        return jogosService.save(jogos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Jogos> updateJogos(@PathVariable Long id, @RequestBody Jogos jogosDetails) {
        Optional<Jogos> jogosOptional = jogosService.findById(id);
        if (jogosOptional.isPresent()) {
            Jogos jogos = jogosOptional.get();
            jogos.setNome(jogosDetails.getNome());
            jogos.setTipoJogos(jogosDetails.getTipoJogos());
            jogos.setPlataforma(jogosDetails.getPlataforma());
            Jogos updatedJogos = jogosService.save(jogos);
            return ResponseEntity.ok(updatedJogos);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJogos(@PathVariable Long id) {
        jogosService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search/nome")
    public List<Jogos> searchByNome(@RequestParam String letra) {
        return jogosService.findByNomeContaining(letra);
    }

    @GetMapping("/search/nome-tipo")
    public List<Jogos> searchByNomeAndTipo(@RequestParam String letra, @RequestParam String tipo) {
        return jogosService.findByNomeContainingAndTipoJogosTipo(letra, tipo);
    }

    @GetMapping("/search/nome-tipo-plataforma")
    public List<Jogos> searchByNomeAndTipoAndPlataforma(@RequestParam String letra, @RequestParam String tipo, @RequestParam String plataforma) {
        return jogosService.findByNomeContainingAndTipoJogosTipoAndPlataformaPlataforma(letra, tipo, plataforma);
    }
}