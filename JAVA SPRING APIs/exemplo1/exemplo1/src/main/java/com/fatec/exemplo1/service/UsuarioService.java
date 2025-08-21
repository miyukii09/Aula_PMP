package com.fatec.exemplo1.service;

import com.fatec.exemplo1.model.Usuario;
import com.fatec.exemplo1.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public List<Usuario> listaTodos() {
        return repository.findAll();
    }

    public Optional<Usuario> buscaPorId(Long id) {
        return repository.findById(id);
    }

    public Usuario salvar(Usuario usuario) {
        return repository.save(usuario);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }

}
