package com.carro.carro.repository;

import com.carro.carro.model.Carros;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarrosRepository extends JpaRepository<Carros, Long> {
    List<Carros> findByPlaca(String placa);
    List<Carros> findByAnoBetween(int ano1, int ano2);
    List<Carros> findByMarcaAndAno(String marca, int ano);
    List<Carros> findTop10ByPlacaEndingWithAndAnoNotInOrderByValorDiariaDesc(String placa, List<Integer> anos);
}
