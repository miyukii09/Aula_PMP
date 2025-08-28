package com.carro.carro.service;

import com.carro.carro.model.TipoCarros;
import com.carro.carro.repository.TipoCarrosRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoCarrosService {
    private final TipoCarrosRepository repository;

    public TipoCarrosService(TipoCarrosRepository repository){
        this.repository = repository;
    }
    public List<TipoCarros> listarTodos(){
        return repository.findAll();
    }
    public TipoCarros salvar(TipoCarros tipoCarros){
        return repository.save(tipoCarros);
    }
}
