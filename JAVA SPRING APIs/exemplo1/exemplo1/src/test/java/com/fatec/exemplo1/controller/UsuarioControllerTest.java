package com.fatec.exemplo1.controller;

import com.fatec.exemplo1.controller.UsuarioController;
import com.fatec.exemplo1.model.TipoUsuario;
import com.fatec.exemplo1.model.Usuario;
import com.fatec.exemplo1.service.UsuarioService;
import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class) // ativa o Mockito
public class UsuarioControllerTest {

    @Mock // simula o service (sem Spring)
    private UsuarioService usuarioService;

    @InjectMocks // injeta o mock no controller
    private UsuarioController usuarioController;

    @Test
    void testListaTodos() {
        List<Usuario> lista = new ArrayList<>();
        Usuario usuario = new Usuario(1L, "João", "joao@email.com", new TipoUsuario(1L, "TipoA"));
        lista.add(usuario);


        when(usuarioService.listaTodos()).thenReturn(lista); // simula retorno

        List<Usuario> resultado = usuarioController.listarTodos(); // chama método diretamente

        assertEquals(1, resultado.size());
        assertEquals("João", resultado.get(0).getNome());
    }
}
