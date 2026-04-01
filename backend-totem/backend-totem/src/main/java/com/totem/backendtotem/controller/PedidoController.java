package com.totem.backendtotem.controller;

import com.totem.backendtotem.dto.ItemPedidoRequest;
import com.totem.backendtotem.dto.PedidoRequest;
import com.totem.backendtotem.model.Cliente;
import com.totem.backendtotem.model.ItemPedido;
import com.totem.backendtotem.model.Pedido;
import com.totem.backendtotem.model.Produto;
import com.totem.backendtotem.repository.ClienteRepository;
import com.totem.backendtotem.repository.PedidoRepository;
import com.totem.backendtotem.repository.ProdutoRepository;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "http://localhost:5173")
public class PedidoController {

    private final PedidoRepository pedidoRepository;
    private final ProdutoRepository produtoRepository;
    private final ClienteRepository clienteRepository;

    public PedidoController(
            PedidoRepository pedidoRepository,
            ProdutoRepository produtoRepository,
            ClienteRepository clienteRepository
    ) {
        this.pedidoRepository = pedidoRepository;
        this.produtoRepository = produtoRepository;
        this.clienteRepository = clienteRepository;
    }

    @PostMapping
    public Pedido criarPedido(@RequestBody PedidoRequest request) {
        Pedido pedido = new Pedido();
        pedido.setDataPedido(LocalDateTime.now());

        Cliente cliente = null;

        if (request.getCpf() != null && !request.getCpf().isBlank()) {
            String cpfLimpo = request.getCpf().replaceAll("\\D", "");
            cliente = clienteRepository.findByCpf(cpfLimpo).orElse(null);
            pedido.setCliente(cliente);
        }

        List<ItemPedido> itensPedido = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (ItemPedidoRequest itemRequest : request.getItens()) {
            Produto produto = produtoRepository.findById(itemRequest.getProdutoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            BigDecimal subtotal = produto.getPreco().multiply(BigDecimal.valueOf(itemRequest.getQuantidade()));

            ItemPedido itemPedido = new ItemPedido();
            itemPedido.setPedido(pedido);
            itemPedido.setProduto(produto);
            itemPedido.setQuantidade(itemRequest.getQuantidade());
            itemPedido.setSubtotal(subtotal);

            itensPedido.add(itemPedido);
            total = total.add(subtotal);
        }

        pedido.setItens(itensPedido);
        pedido.setTotal(total);

        if (cliente != null) {
            int pontosAtuais = cliente.getPontos() != null ? cliente.getPontos() : 0;
            int pontosGanhos = total.intValue();
            cliente.setPontos(pontosAtuais + pontosGanhos);
            clienteRepository.save(cliente);
        }

        return pedidoRepository.save(pedido);
    }
}