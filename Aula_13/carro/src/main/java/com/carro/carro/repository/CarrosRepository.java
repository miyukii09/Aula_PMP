package com.carro.carro.repository;

import com.carro.carro.model.Carros;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarrosRepository extends JpaRepository<Carros, Long> {
}
