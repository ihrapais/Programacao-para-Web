package com.ihrapais.vendasapi.controller;

import com.ihrapais.vendasapi.dto.VendaRequestDTO;
import com.ihrapais.vendasapi.dto.VendaResponseDTO;
import com.ihrapais.vendasapi.service.VendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vendas")
public class VendaController {

    @Autowired
    private VendaService vendaService;

    @GetMapping
    public ResponseEntity<List<VendaResponseDTO>> listarVendas() {
        List<VendaResponseDTO> vendas = vendaService.listarTodas();
        return ResponseEntity.ok(vendas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendaResponseDTO> buscarVenda(@PathVariable Long id) {
        VendaResponseDTO venda = vendaService.buscarPorId(id);
        return ResponseEntity.ok(venda);
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<VendaResponseDTO>> findVendasPorCliente(@PathVariable Long clienteId) {
        List<VendaResponseDTO> vendas = vendaService.findVendasPorCliente(clienteId);
        return ResponseEntity.ok(vendas);
    }

    @PostMapping
    public ResponseEntity<VendaResponseDTO> criarVenda(@RequestBody VendaRequestDTO dto) {
        VendaResponseDTO response = vendaService.registrarVenda(dto);
        return ResponseEntity.ok(response);
    }
}