package com.projeto.Arcadia.model;

import jakarta.persistence.*;

@Entity
public class Plataforma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String plataforma;

    public Plataforma(){}

    public Plataforma(long id, String plataforma){
        this.id         = id;
        this.plataforma = plataforma;
    }

    // Getter e Setter

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPlataforma() {
        return plataforma;
    }

    public void setPlataforma(String plataforma) {
        this.plataforma = plataforma;
    }
}
