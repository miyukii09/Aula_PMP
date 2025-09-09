package com.categoria.produto.service;

import com.categoria.produto.model.Produto;
import com.categoria.produto.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {
    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> getAllProdutosWithCategoria() {
        return produtoRepository.findAllWithCategoria();
    }
}
