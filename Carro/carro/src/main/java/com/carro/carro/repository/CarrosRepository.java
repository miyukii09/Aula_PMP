package com.carro.carro.repository;

import com.carro.carro.model.Carros;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarrosRepository extends JpaRepository<Carros, Long> {
    
    Optional<Carros> findByPlaca(int placa);

    //@Query("") terminar isso em casa
}
