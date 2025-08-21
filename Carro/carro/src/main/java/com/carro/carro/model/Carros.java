package com.carro.carro.model;

import jakarta.persistence.*;

@Entity
public class Carros {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String placa;

    @Column(nullable = false)
    private String marca;

    @Column(nullable = false)
    private String modelo;

    @Column(nullable = false)
    private Integer ano;

    @Column(nullable = false)
    private String cor;

    @Column(name = "km_rodados", nullable = false)
    private double kmRodados;

    @Column(name = "valor_diaria", nullable = false)
    private double valorDiaria;

    @Column(nullable = false)
    private boolean disponivel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tipo_id", nullable = false)
    private TipoCarros tipoCarros;

    // Constructors
    public Carros() {

    }

    public Carros(String placa, String marca, String modelo, Integer ano, String cor,
                  double kmRodados, double valorDiaria, boolean disponivel, TipoCarros tipoCarros) {
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;
        this.kmRodados = kmRodados;
        this.valorDiaria = valorDiaria;
        this.disponivel = disponivel;
        this.tipoCarros = tipoCarros;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public double getKmRodados() {
        return kmRodados;
    }

    public void setKmRodados(double kmRodados) {
        this.kmRodados = kmRodados;
    }

    public double getValorDiaria() {
        return valorDiaria;
    }

    public void setValorDiaria(double valorDiaria) {
        this.valorDiaria = valorDiaria;
    }

    public boolean isDisponivel() {
        return disponivel;
    }

    public void setDisponivel(boolean disponivel) {
        this.disponivel = disponivel;
    }

    public TipoCarros getTipoCarros() {
        return tipoCarros;
    }

    public void setTipoCarros(TipoCarros tipoCarros) {
        this.tipoCarros = tipoCarros;
    }
}