package com.projeto.Arcadia.model;

import jakarta.persistence.*;

@Entity
public class Jogos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;

    @ManyToOne
    @JoinColumn(name = "tipo_id")
    private TipoJogos tipoJogos;

    @ManyToOne
    @JoinColumn(name = "Plataforma_id")
    private Plataforma plataforma;

    public Jogos(){}

    public Jogos(long id, String nome, TipoJogos tipoJogos, Plataforma plataforma){
        this.id         = id;
        this.nome       = nome;
        this.tipoJogos  = tipoJogos;
        this.plataforma = plataforma;
    }

    // getter e setter

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Plataforma getPlataforma() {
        return plataforma;
    }

    public void setPlataforma(Plataforma plataforma) {
        this.plataforma = plataforma;
    }

    public TipoJogos getTipoJogos() {
        return tipoJogos;
    }

    public void setTipoJogos(TipoJogos tipoJogos) {
        this.tipoJogos = tipoJogos;
    }
}
