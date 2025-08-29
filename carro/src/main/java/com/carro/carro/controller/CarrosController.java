package com.carro.carro.controller;

import com.carro.carro.model.Carros;
import com.carro.carro.service.CarrosService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carros")
public class CarrosController {
    private final CarrosService service;

    @PostMapping
    public Carros criar(@RequestBody Carros novo) {
        // garante que o ID venha nulo para gerar automaticamente
        novo.setId(null);
        return service.salvar(novo);
    }

    public CarrosController(CarrosService service){
        this.service = service;
    }

    @GetMapping
    public List<Carros> listarTodos(){
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Carros buscarPorId(@PathVariable Long id){
        return service.buscarPorId(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id){
        service.excluir(id);
    }

    @PutMapping("/{id}")
    public Carros atualizar(@PathVariable Long id, @RequestBody Carros carrosAtualizado) {
        return service.buscarPorId(id)
                .map(carrosExistente -> {
                    carrosExistente.setPlaca(carrosAtualizado.getPlaca());
                    carrosExistente.setMarca(carrosAtualizado.getMarca());
                    carrosExistente.setModelo(carrosAtualizado.getModelo());
                    carrosExistente.setAno(carrosAtualizado.getAno());
                    carrosExistente.setCor(carrosAtualizado.getCor());
                    carrosExistente.setKmRodados(carrosAtualizado.getKmRodados());
                    carrosExistente.setValorDiaria(carrosAtualizado.getValorDiaria());
                    carrosExistente.setDisponivel(carrosAtualizado.isDisponivel());
                    return service.salvar(carrosExistente);
                })
                .orElseGet(() -> {
                    carrosAtualizado.setId(id);
                    return service.salvar(carrosAtualizado);
                });
    }
}
