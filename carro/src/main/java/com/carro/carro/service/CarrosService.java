package com.carro.carro.service;

import com.carro.carro.model.Carros;
import com.carro.carro.repository.CarrosRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarrosService {
    private final CarrosRepository repository;

    public CarrosService(CarrosRepository repository){
        this.repository = repository;
    }
    public List<Carros> listarTodos() {
        return  repository.findAll();
    }
    public Optional<Carros> buscarPorId(long id) {
        return repository.findById(id);
    }
    public Carros salvar(Carros carros){
        return repository.save(carros);
    }
    public void excluir(Long id){
        repository.deleteById(id);
    }

    public List<Carros> busarPorPlaca(String placa){
        return repository.findByPlaca(placa);
    }
    public List<Carros> buscarFiatEntre1922(int ano1, int ano2){
        return repository.fingByAnoBetween(ano1, ano2);
    }
}
