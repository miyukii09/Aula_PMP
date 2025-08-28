package com.carro.carro.repository;

import com.carro.carro.model.Carros;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarrosRepository extends JpaRepository<Carros, Long> {
    List<Carros> findByPlaca(String placa);
    List<Carros> fingByAnoBetween(int ano1, int ano2);
}
