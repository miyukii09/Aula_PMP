package com.example.demo.model;

import jakarta.presistence.*;
@entity
public class Usuario {
    @id
    @generatedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private string nome;
    private string email;
    
    public Usuario(){}

}
