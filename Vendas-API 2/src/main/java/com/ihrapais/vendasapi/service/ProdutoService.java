package com.ihrapais.vendasapi.service;

import com.ihrapais.vendasapi.entity.Produto;
import com.ihrapais.vendasapi.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> findProdutosComEstoqueBaixo(Integer quantidadeMaxima) {
        return produtoRepository.findByQuantityLessThan(quantidadeMaxima);
    }

    public List<Produto> findProdutosPorNome(String keyword) {
        return produtoRepository.findByNameContainingIgnoreCase(keyword);
    }

    public Produto save(Produto produto) {
        return produtoRepository.save(produto);
    }

    public List<Produto> findAll() {
        return produtoRepository.findAll();
    }

    public Produto findById(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }

    public Produto update(Long id, Produto produtoAtualizado) {
        Produto produto = findById(id);
        produto.setName(produtoAtualizado.getName());
        produto.setPrice(produtoAtualizado.getPrice());
        produto.setQuantity(produtoAtualizado.getQuantity());
        return produtoRepository.save(produto);
    }

    public void delete(Long id) {
        produtoRepository.deleteById(id);
    }
}