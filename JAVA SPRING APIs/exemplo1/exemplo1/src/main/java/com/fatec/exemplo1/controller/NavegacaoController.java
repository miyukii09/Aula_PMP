package com.fatec.exemplo1.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class NavegacaoController {

    @GetMapping("/")
    public String index() {
        return "index"; // Spring vai procurar por templates/cadastrarUsuario.html
    }

    @GetMapping("/cadastrarUsuario")
    public String cadastrarUsuario() {
        return "cadastrarUsuario"; // Spring vai procurar por templates/cadastrarUsuario.html
    }

    @GetMapping("/cadastrarTipoUsuario")
    public String cadastrarTipoUsuario() {
        return "cadastrarTipoUsuario"; // Spring vai procurar por templates/cadastrarTipoUsuario.html
    }

}
