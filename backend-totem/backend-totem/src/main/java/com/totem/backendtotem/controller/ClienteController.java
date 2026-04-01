package com.totem.backendtotem.controller;

import com.totem.backendtotem.dto.CpfRequest;
import com.totem.backendtotem.model.Cliente;
import com.totem.backendtotem.repository.ClienteRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "http://localhost:5173")
public class ClienteController {

    private final ClienteRepository clienteRepository;

    public ClienteController(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @PostMapping("/cpf")
    public Cliente buscarOuCriarCliente(@RequestBody CpfRequest request) {
        String cpfLimpo = request.getCpf().replaceAll("\\D", "");

        return clienteRepository.findByCpf(cpfLimpo)
                .orElseGet(() -> {
                    Cliente novoCliente = new Cliente();
                    novoCliente.setCpf(cpfLimpo);
                    novoCliente.setNome("Cliente");
                    novoCliente.setPontos(0);
                    return clienteRepository.save(novoCliente);
                });
    }
}