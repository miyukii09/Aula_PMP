package com.fatec.exemplo1.controller;

import com.fatec.exemplo1.model.Usuario;
import com.fatec.exemplo1.service.UsuarioService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    //pode ser criado HOME Controller só para ele
    @GetMapping("/")
    public String index() {
        return "index"; // Spring vai procurar por templates/cadastrarUsuario.html
    }

    @GetMapping
    public List<Usuario> listarTodos() {
        return service.listaTodos();
    }

    @GetMapping("/{id}")
    public Usuario buscarPorId(@PathVariable Long id) {
        return service.buscaPorId(id).orElse(null);
    }

    @PostMapping
    public Usuario criar(@RequestBody Usuario usuario) {
        return service.salvar(usuario);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }

    @PutMapping("/{id}")
    public Usuario atualizar(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
        return service.buscaPorId(id)
                .map(usuarioExistente -> {
                    usuarioExistente.setNome(usuarioAtualizado.getNome());
                    usuarioExistente.setEmail(usuarioAtualizado.getEmail());
                    return service.salvar(usuarioExistente); // reutiliza o salvar para atualizar
                })
                .orElseGet(() -> {
                    // Se não existir, pode salvar como novo com o ID desejado
                    usuarioAtualizado.setId(id);
                    return service.salvar(usuarioAtualizado);
                });
    }

}
