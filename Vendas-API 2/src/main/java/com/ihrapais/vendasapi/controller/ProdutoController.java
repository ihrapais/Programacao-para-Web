package com.ihrapais.vendasapi.controller;

import com.ihrapais.vendasapi.entity.Produto;
import com.ihrapais.vendasapi.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @PostMapping
    public ResponseEntity<Produto> criarProduto(@RequestBody Produto produto) {
        Produto salvo = produtoService.save(produto);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listarProdutos() {
        List<Produto> produtos = produtoService.findAll();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarProduto(@PathVariable Long id) {
        Produto produto = produtoService.findById(id);
        return ResponseEntity.ok(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizarProduto(@PathVariable Long id, @RequestBody Produto produtoAtualizado) {
        Produto salvo = produtoService.update(id, produtoAtualizado);
        return ResponseEntity.ok(salvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProduto(@PathVariable Long id) {
        produtoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/estoque-baixo/{quantidadeMaxima}")
    public ResponseEntity<List<Produto>> findProdutosComEstoqueBaixo(@PathVariable Integer quantidadeMaxima) {
        List<Produto> produtos = produtoService.findProdutosComEstoqueBaixo(quantidadeMaxima);
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Produto>> findProdutosPorNome(@RequestParam String keyword) {
        List<Produto> produtos = produtoService.findProdutosPorNome(keyword);
        return ResponseEntity.ok(produtos);
    }
}