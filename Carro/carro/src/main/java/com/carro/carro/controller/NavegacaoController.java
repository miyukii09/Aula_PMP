package com.carro.carro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class NavegacaoController {
    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/cadastrarCarros")
    public String cadastrarCarros() {
        return "cadastrarCarros";
    }

    @GetMapping("/cadastrarTipoCarro")
    public String cadastrartTipoCarro(){
        return "cadastrarCarros";
    }
}
