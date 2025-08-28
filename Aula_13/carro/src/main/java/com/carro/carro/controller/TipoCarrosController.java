package com.carro.carro.controller;

import com.carro.carro.model.TipoCarros;
import com.carro.carro.service.TipoCarrosService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/tipoCarros")
public class TipoCarrosController {
    private final TipoCarrosService service;

    public TipoCarrosController(TipoCarrosService service) {
        this.service = service;
    }
    @GetMapping
    public List<TipoCarros> listarTodos(){
        return service.listarTodos();
    }
    @PostMapping
    public TipoCarros criar(@RequestBody TipoCarros tipoCarros){
        System.out.println("@@@@@@@"+tipoCarros.getId());
        System.out.println("@@@@@@@"+tipoCarros.getTipo());
        return service.salvar(tipoCarros);
    }
}
