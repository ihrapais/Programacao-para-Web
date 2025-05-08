package com.ihrapais.vendasapi.dto;

import java.util.List;

public record VendaRequestDTO(Long clientId, Double discount, List<ItemVendaDTO> items) {}