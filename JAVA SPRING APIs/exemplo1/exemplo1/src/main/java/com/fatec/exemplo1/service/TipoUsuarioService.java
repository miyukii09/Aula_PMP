package com.fatec.exemplo1.service;

import com.fatec.exemplo1.model.TipoUsuario;
import com.fatec.exemplo1.repository.TipoUsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoUsuarioService {
    private final TipoUsuarioRepository repository;

    public TipoUsuarioService(TipoUsuarioRepository repository){
        this.repository = repository;
    }

    public List<TipoUsuario> listaTodos(){
        return repository.findAll();
    }
    public TipoUsuario salvar(TipoUsuario tipoUsuario){
        return repository.save(tipoUsuario);
    }
}
