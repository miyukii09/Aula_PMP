package com.carro.carro.controller;

import com.carro.carro.model.Carros;
import com.carro.carro.service.CarrosService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carros")
public class CarrosController {

    private static final Logger logger = LoggerFactory.getLogger(CarrosController.class);

    private final CarrosService service;

    @Autowired
    public CarrosController(CarrosService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Carros>> listarTodos() {
        try {
            List<Carros> carros = service.listarTodos();
            logger.info("Lista de carros retornada com sucesso: {}", carros.size());
            return ResponseEntity.ok(carros);
        } catch (Exception e) {
            logger.error("Erro ao listar carros", e);
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<?> cadastrarCarro(@RequestBody Carros carro) {
        try {
            logger.info("Recebido carro para cadastro: {}", carro);
            if (carro.getTipoCarros() != null && carro.getTipoCarros().getId() == null) {
                throw new IllegalArgumentException("ID do tipo de carro inválido.");
            }
            Carros salvo = service.salvar(carro);
            logger.info("Carro salvo com sucesso: {}", salvo.getId());
            return ResponseEntity.ok(salvo);
        } catch (Exception e) {
            logger.error("Erro ao cadastrar carro", e);
            return ResponseEntity.badRequest().body("Erro ao cadastrar carro: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        try {
            service.excluir(id);
            logger.info("Carro excluído com sucesso: {}", id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Erro ao excluir carro", e);
            return ResponseEntity.status(500).body("Erro: " + e.getMessage());
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<Carros> buscarPorPlaca(@RequestParam("placa") String placa) {
        try {
            return service.buscarPorPlaca(placa)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Erro ao buscar por placa", e);
            return ResponseEntity.status(500).body(null);
        }
    }
}