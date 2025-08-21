package com.fatec.exemplo1.controller;

import com.fatec.exemplo1.model.TipoUsuario;
import com.fatec.exemplo1.service.TipoUsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/tipoUsuario")
public class TipoUsuarioController {
    private final TipoUsuarioService service;

    public TipoUsuarioController(TipoUsuarioService service) {
        this.service = service;
    }
    @GetMapping
    public List<TipoUsuario> listarTodos(){
       return service.listaTodos();
    }
    @PostMapping
    public TipoUsuario criar(@RequestBody TipoUsuario tipoUsuario){
        System.out.println("@@@@@@@"+tipoUsuario.getId());
        System.out.println("@@@@@@@"+tipoUsuario.getTipo());
        return service.salvar(tipoUsuario);

    }
}
