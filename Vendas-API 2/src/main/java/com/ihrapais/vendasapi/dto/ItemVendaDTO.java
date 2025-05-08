package com.ihrapais.vendasapi.dto;

public record ItemVendaDTO(
        Long productId,
        String productName,
        Integer quantity,
        Double unitPrice,
        Double subTotal
) {}
