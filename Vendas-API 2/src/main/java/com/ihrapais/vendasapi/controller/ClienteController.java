package com.ihrapais.vendasapi.controller;

import com.ihrapais.vendasapi.entity.Cliente;
import com.ihrapais.vendasapi.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {
    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping
    public ResponseEntity<Cliente> criarCliente(@RequestBody Cliente cliente) {
        Cliente salvo = clienteRepository.save(cliente);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<Object> listarClientes() {
        List<Cliente> clientes = clienteRepository.findAll();

        if(clientes.isEmpty()) {
            String mensagem = "Nenhum cliente cadastrado no sistema.\n\n"
                    + "Para cadastrar um novo cliente, envie uma requisição POST para /clientes com o seguinte corpo em JSON:\n\n"
                    + "{\n"
                    + "  \"name\": \"Nome do cliente\",\n"
                    + "  \"email\": \"email@exemplo.com\",\n"
                    + "  \"cpf\": \"00000000000\"\n"
                    + "}\n\n"
                    + "Todos os campos são obrigatórios.";
            return ResponseEntity.status(404).body(mensagem);
        }
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarCliente(@PathVariable Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        return ResponseEntity.ok(cliente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizarCliente(@PathVariable Long id, @RequestBody Cliente clienteAtualizado) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        cliente.setName(clienteAtualizado.getName());
        cliente.setEmail(clienteAtualizado.getEmail());
        cliente.setCpf(clienteAtualizado.getCpf());
        Cliente salvo = clienteRepository.save(cliente);
        return ResponseEntity.ok(salvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCliente(@PathVariable Long id) {
        clienteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}