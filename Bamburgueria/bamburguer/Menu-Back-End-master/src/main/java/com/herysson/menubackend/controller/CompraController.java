package com.herysson.menubackend.controller;

import com.herysson.menubackend.dto.CompraDTO;
import com.herysson.menubackend.service.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/compras")
@CrossOrigin(origins = "*")
public class CompraController {

    @Autowired
    private CompraService compraService;

    @PostMapping
    @PreAuthorize("permitAll()") // Cliente pode finalizar compra
    public ResponseEntity<CompraDTO> criarCompra(@RequestBody CompraDTO compraDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(compraService.save(compraDTO));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')") // Apenas ADMIN pode listar compras
    public ResponseEntity<List<CompraDTO>> listarCompras() {
        return ResponseEntity.ok(compraService.findAll());
    }
}