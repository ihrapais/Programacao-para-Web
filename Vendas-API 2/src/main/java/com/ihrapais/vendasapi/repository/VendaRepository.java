package com.ihrapais.vendasapi.repository;

import com.ihrapais.vendasapi.entity.Cliente;
import com.ihrapais.vendasapi.entity.Venda;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VendaRepository extends JpaRepository<Venda, Long> {
    List<Venda> findByCliente(Cliente cliente);
}