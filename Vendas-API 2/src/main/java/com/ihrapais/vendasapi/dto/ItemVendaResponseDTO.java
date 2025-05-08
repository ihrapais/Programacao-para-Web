package com.ihrapais.vendasapi.dto;

public record ItemVendaResponseDTO(
        Long productId,
        String productName,
        Integer quantity,
        Double unitPrice,
        Double subTotal
) {}
