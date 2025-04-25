package com.ihrapais.vendasapi.service;

import com.ihrapais.vendasapi.dto.*;
import com.ihrapais.vendasapi.entity.*;
import com.ihrapais.vendasapi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<VendaResponseDTO> listarTodas() {
        List<Venda> vendas = vendaRepository.findAll();
        return vendas.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public VendaResponseDTO buscarPorId(Long id) {
        Venda venda = vendaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venda não encontrada"));
        return mapToResponseDTO(venda);
    }

    public List<VendaResponseDTO> findVendasPorCliente(Long clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        List<Venda> vendas = vendaRepository.findByCliente(cliente);
        return vendas.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public VendaResponseDTO registrarVenda(VendaRequestDTO dto) {
        Cliente cliente = clienteRepository.findById(dto.clientId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        List<ItemVenda> itens = dto.items().stream().map(itemDTO -> {
            Produto produto = produtoRepository.findById(itemDTO.productId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
            if (produto.getQuantity() < itemDTO.quantity()) {
                throw new RuntimeException("Estoque insuficiente para " + produto.getName());
            }
            ItemVenda item = new ItemVenda();
            item.setProduto(produto);
            item.setQuantity(itemDTO.quantity());
            item.setUnitPrice(itemDTO.unitPrice());
            item.setSubTotal(itemDTO.quantity() * itemDTO.unitPrice());
            item.setVenda(new Venda());
            produto.setQuantity(produto.getQuantity() - itemDTO.quantity());
            produtoRepository.save(produto);
            return item;
        }).collect(Collectors.toList());

        Venda venda = new Venda();
        venda.setCliente(cliente);
        venda.setItems(itens);
        venda.setDiscount(dto.discount());
        double somaSubtotais = itens.stream().mapToDouble(ItemVenda::getSubTotal).sum();
        venda.setTotal(somaSubtotais * (1 - dto.discount() / 100));
        venda.setCreatedAt(LocalDateTime.now());

        for (ItemVenda item : itens) {
            item.getVenda().setId(venda.getId());
        }

        venda = vendaRepository.save(venda);
        return mapToResponseDTO(venda);
    }

    private VendaResponseDTO mapToResponseDTO(Venda venda) {
        ClienteDTO clienteDTO = new ClienteDTO(
                venda.getCliente().getId(),
                venda.getCliente().getName(),
                venda.getCliente().getCpf()
        );
        List<ItemVendaResponseDTO> itemDTOs = venda.getItems().stream().map(item ->
                new ItemVendaResponseDTO(
                        item.getProduto().getId(),
                        item.getProduto().getName(),
                        item.getQuantity(),
                        item.getUnitPrice(),
                        item.getSubTotal()
                )
        ).collect(Collectors.toList());
        return new VendaResponseDTO(
                venda.getId(),
                clienteDTO,
                itemDTOs,
                venda.getDiscount(),
                venda.getTotal(),
                venda.getCreatedAt()
        );
    }
}