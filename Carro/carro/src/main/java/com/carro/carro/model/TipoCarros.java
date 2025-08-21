package com.carro.carro.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class TipoCarros {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nome; 

    @OneToMany(mappedBy = "tipoCarros", fetch = FetchType.LAZY)
    private List<Carros> carros;

    // Constructors
    public TipoCarros() {
    }

    public TipoCarros(String nome) {
        this.nome = nome;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<Carros> getCarros() {
        return carros;
    }

    public void setCarros(List<Carros> carros) {
        this.carros = carros;
    }

    public String getTipo() {
        return null;
    }
}