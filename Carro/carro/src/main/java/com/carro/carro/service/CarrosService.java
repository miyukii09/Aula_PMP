package com.carro.carro.service;

import com.carro.carro.model.Carros;
import com.carro.carro.repository.CarrosRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarrosService {

    private static final Logger logger = LoggerFactory.getLogger(CarrosService.class);

    @Autowired
    private CarrosRepository repository;

    public List<Carros> listarTodos() {
        try {
            return repository.findAll();
        } catch (Exception e) {
            logger.error("Erro ao listar todos os carros", e);
            throw e;
        }
    }

    public Carros salvar(Carros carro) {
        try {
            logger.info("Salvando carro: {}", carro);
            if (carro.getPlaca() == null || carro.getPlaca().trim().isEmpty()) {
                throw new IllegalArgumentException("Placa é obrigatória.");
            }
            return repository.save(carro);
        } catch (Exception e) {
            logger.error("Erro ao salvar carro", e);
            throw e;
        }
    }

    public void excluir(Long id) {
        try {
            repository.deleteById(id);
        } catch (Exception e) {
            logger.error("Erro ao excluir carro com ID {}", id, e);
            throw e;
        }
    }

    public Optional<Carros> buscarPorPlaca(String placa) {
        try {
            return repository.findByPlaca(placa);
        } catch (Exception e) {
            logger.error("Erro ao buscar carro por placa: {}", placa, e);
            throw e;
        }
    }
}