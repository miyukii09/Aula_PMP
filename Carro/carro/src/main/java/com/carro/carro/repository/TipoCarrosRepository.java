package com.carro.carro.repository;

import com.carro.carro.model.TipoCarros;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TipoCarrosRepository extends JpaRepository<TipoCarros, Long> {
}