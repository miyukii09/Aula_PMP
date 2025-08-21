package com.fatec.exemplo1.model;

import jakarta.persistence.*;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    @ManyToOne
    @JoinColumn(name="tipo_id")
    private TipoUsuario tipoUsuario;

    public Usuario(){}

    public Usuario(Long id, String nome, String email,TipoUsuario tipoUsuario){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.tipoUsuario = tipoUsuario;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
