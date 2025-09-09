package com.categoria.produto.controller;

import com.categoria.produto.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ConsultaController  {
    @Autowired
    private ProdutoService produtoService;

    @GetMapping("/")
    public String listarProdutos(Model model) {
        model.addAttribute("produtos", produtoService.getAllProdutosWithCategoria());
        return "consulta";
    }
}
