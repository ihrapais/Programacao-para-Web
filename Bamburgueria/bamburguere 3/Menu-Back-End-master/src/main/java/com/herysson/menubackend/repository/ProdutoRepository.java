package com.herysson.menubackend.repository;

import com.herysson.menubackend.model.Produto;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByDisponibilidade(Boolean disponibilidade);
}
