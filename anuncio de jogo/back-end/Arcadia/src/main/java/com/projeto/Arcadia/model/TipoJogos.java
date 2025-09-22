package com.projeto.Arcadia.model;

import jakarta.persistence.*;

@Entity
public class TipoJogos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String tipo;

    public TipoJogos(){}

    public TipoJogos(long id,String tipo){
        this.id   = id;
        this.tipo = tipo;
    }

    // Getter e Setter

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
