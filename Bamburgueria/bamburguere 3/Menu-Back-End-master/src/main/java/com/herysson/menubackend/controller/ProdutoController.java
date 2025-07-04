package com.herysson.menubackend.controller;

import com.herysson.menubackend.dto.ProdutoDTO;
import com.herysson.menubackend.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    @PreAuthorize("permitAll()") // Permite acesso a todos para listar produtos (cardápio)
    public ResponseEntity<List<ProdutoDTO>> listarTodos(@RequestParam(required = false) Boolean disponibilidade) {
        if (disponibilidade != null) {
            return ResponseEntity.ok(produtoService.findByDisponibilidade(disponibilidade));
        } else {
            return ResponseEntity.ok(produtoService.findAll());
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or permitAll()") // Admin pode ver qualquer produto, cliente pode ver se tiver ID
    public ResponseEntity<ProdutoDTO> buscarPorId(@PathVariable Long id) {
        return produtoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Apenas ADMIN pode criar produtos
    public ResponseEntity<ProdutoDTO> criar(@RequestBody ProdutoDTO produtoDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(produtoService.save(produtoDTO));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Apenas ADMIN pode atualizar produtos
    public ResponseEntity<ProdutoDTO> atualizar(@PathVariable Long id, @RequestBody ProdutoDTO produtoDTO) {
        try {
            return ResponseEntity.ok(produtoService.update(id, produtoDTO));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Apenas ADMIN pode deletar produtos
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        produtoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
