import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Carrinho.css";

export default function Carrinho() {
    const location = useLocation();
    const navigate = useNavigate();
    const itensIniciais = location.state?.itens || [];

    const [itens, setItens] = useState(itensIniciais);
    const [pagamentoSelecionado, setPagamentoSelecionado] = useState("");
    const [mostrarPagamento, setMostrarPagamento] = useState(false);
    const [mostrarModalPagamento, setMostrarModalPagamento] = useState(false);
    const [mostrarNota, setMostrarNota] = useState(false);
    const [pedidoCriado, setPedidoCriado] = useState(null);

    const tipoPedido = localStorage.getItem("tipoPedido") || "Não informado";
    const cpfCliente = localStorage.getItem("cpf") || "";
    const nomeCliente = localStorage.getItem("nomeCliente") || "Cliente";
    const pontosAntes = Number(localStorage.getItem("pontos") || 0);

    const numeroPedido = useMemo(() => {
        return Math.floor(100000 + Math.random() * 900000);
    }, []);

    const dataAtual = useMemo(() => {
        const agora = new Date();

        const data = agora.toLocaleDateString("pt-BR");
        const hora = agora.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        });

        return { data, hora };
    }, []);

    function alterarQuantidade(id, delta) {
        setItens((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, quantidade: Math.max(item.quantidade + delta, 0) }
                        : item
                )
                .filter((item) => item.quantidade > 0)
        );
    }

    function removerItem(id) {
        setItens((prev) => prev.filter((item) => item.id !== id));
    }

    function getDescricao(item) {
        const descricoesCombos = {
            "Combo Gorila": "1 x Hambúrguer Gorila • 1 x Batata Grande • 1 x Coca-Cola",
            "Combo JK": "1 x JK Smash • 1 x Batata Média • 1 x Coca-Cola",
            "Combo orangotango": "1 x Orangotango Burguer • 1 x Batata Média • 1 x Guaraná",
            "Combo Mico": "1 x Mico Burguer • 1 x Batata Pequena • 1 x Sprite",
            "Combo Sagui": "1 x Sagui Burguer • 1 x Batata Média • 1 x Fanta Laranja",
            "Combo Kids": "1 x Mini Burguer • 1 x Batata Pequena • 1 x Suco",
        };

        return descricoesCombos[item.nome] || `1 x ${item.nome}`;
    }

    const total = useMemo(() => {
        return itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    }, [itens]);

    const totalOficial = pedidoCriado?.total ?? total;
    const pontosGanhos = Math.floor(Number(totalOficial) || 0);
    const pontosAtualizados = pontosAntes + pontosGanhos;

    async function confirmarPagamento() {
        if (itens.length === 0) return;
        if (!pagamentoSelecionado) return;

        try {
            const body = {
                cpf: cpfCliente || null,
                itens: itens.map((item) => ({
                    produtoId: item.id,
                    quantidade: item.quantidade,
                })),
            };

            const response = await fetch("http://localhost:8080/pedidos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error("Erro ao criar pedido");
            }

            const data = await response.json();
            setPedidoCriado(data);

            if (cpfCliente) {
                localStorage.setItem("pontos", String(pontosAtualizados));
            }

            setMostrarModalPagamento(true);
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
        }
    }

    function finalizarVenda() {
        setMostrarModalPagamento(false);
        setMostrarNota(true);
    }

    function novaVenda() {
        localStorage.removeItem("cpf");
        localStorage.removeItem("nomeCliente");
        localStorage.removeItem("pontos");
        localStorage.removeItem("tipoPedido");
        navigate("/");
    }

    return (
        <div className="carrinho-screen">
            <header className="carrinho-header">
                <h1>Seu Carrinho</h1>
                <button className="voltar-btn" onClick={() => navigate("/menu")}>
                    Voltar ao Menu
                </button>
            </header>

            <main className="carrinho-content">
                <section className="carrinho-itens">
                    {itens.length === 0 ? (
                        <div className="carrinho-vazio">
                            <h2>Nenhum item no carrinho</h2>
                            <p>Volte ao menu e escolha seus produtos.</p>
                        </div>
                    ) : (
                        itens.map((item) => (
                            <motion.div
                                key={item.id}
                                className="item-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="item-info">
                                    <h2>{item.nome}</h2>
                                    <p className="descricao">{getDescricao(item)}</p>
                                    <p className="preco-unitario">
                                        Unitário: R$ {item.preco.toFixed(2).replace(".", ",")}
                                    </p>
                                </div>

                                <div className="item-actions">
                                    <img src={item.imagem} alt={item.nome} className="item-imagem" />

                                    <div className="contador">
                                        <button onClick={() => alterarQuantidade(item.id, -1)}>-</button>
                                        <span>{item.quantidade}</span>
                                        <button onClick={() => alterarQuantidade(item.id, 1)}>+</button>
                                    </div>

                                    <p className="subtotal">
                                        Subtotal: R$ {(item.preco * item.quantidade).toFixed(2).replace(".", ",")}
                                    </p>

                                    <button className="remover-btn" onClick={() => removerItem(item.id)}>
                                        Remover item
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </section>

                <aside className="resumo-card">
                    <h2>Resumo do Pedido</h2>

                    {itens[0] && (
                        <img src={itens[0].imagem} alt={itens[0].nome} className="resumo-imagem" />
                    )}

                    <div className="total-box">
                        <span>Total</span>
                        <strong>R$ {Number(totalOficial).toFixed(2).replace(".", ",")}</strong>
                    </div>

                    <button
                        className="select-payment-btn"
                        onClick={() => setMostrarPagamento((prev) => !prev)}
                    >
                        Selecionar forma de pagamento
                    </button>

                    <AnimatePresence>
                        {mostrarPagamento && (
                            <motion.div
                                className="payment-options"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                {["Débito", "Crédito", "Pix"].map((opcao) => (
                                    <label key={opcao} className="payment-option">
                                        <input
                                            type="radio"
                                            name="pagamento"
                                            value={opcao}
                                            checked={pagamentoSelecionado === opcao}
                                            onChange={(e) => setPagamentoSelecionado(e.target.value)}
                                        />
                                        <span>{opcao}</span>
                                    </label>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        className="confirmar-btn"
                        onClick={confirmarPagamento}
                        disabled={itens.length === 0}
                    >
                        {itens.length === 0 ? "Carrinho vazio" : "Confirmar"}
                    </button>
                </aside>
            </main>

            <AnimatePresence>
                {mostrarModalPagamento && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="modal-pagamento"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <h2>Aguardando pagamento</h2>
                            <p>Forma escolhida: {pagamentoSelecionado}</p>
                            <p>Escaneia o QR CODE na maquininha</p>

                            {pagamentoSelecionado === "Pix" && (
                                <div className="qr-code-box">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                                            `JK Burguer Pedido:${pedidoCriado?.id || numeroPedido} Total:${totalOficial}`
                                        )}`}
                                        alt="QR Code"
                                    />
                                </div>
                            )}

                            <button className="confirmar-btn" onClick={finalizarVenda}>
                                Confirmar
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {mostrarNota && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="nota-box"
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                        >
                            <h2>Nota Fiscal</h2>

                            <div className="nota-topo">
                                <h3>JK Burguer</h3>
                                <p>CNPJ: 12.345.678/0001-99</p>
                                <p>Pedido nº: {pedidoCriado?.id || numeroPedido}</p>
                                <p>Data: {dataAtual.data}</p>
                                <p>Horário: {dataAtual.hora}</p>
                                <p>Tipo de pedido: {tipoPedido}</p>
                                {cpfCliente && <p>Cliente: {nomeCliente}</p>}
                                {cpfCliente && <p>CPF: {cpfCliente}</p>}
                                {cpfCliente && <p className="pontos-info">Pontos anteriores: {pontosAntes}</p>}
                                {cpfCliente && <p className="pontos-info">Pontos ganhos: {pontosGanhos}</p>}
                                {cpfCliente && <p className="pontos-info">Total de pontos: {pontosAtualizados}</p>}
                            </div>

                            <div className="nota-lista">
                                {itens.map((item) => (
                                    <div key={item.id} className="nota-item">
                                        <div className="nota-item-texto">
                                            <span className="nota-item-nome">
                                                {item.nome} x{item.quantidade}
                                            </span>
                                            <small>{getDescricao(item)}</small>
                                        </div>

                                        <strong>
                                            R$ {(item.preco * item.quantidade).toFixed(2).replace(".", ",")}
                                        </strong>
                                    </div>
                                ))}
                            </div>

                            <div className="nota-total">
                                <span>Total</span>
                                <strong>R$ {Number(totalOficial).toFixed(2).replace(".", ",")}</strong>
                            </div>

                            <div className="nota-sorteio">
                                <h4>Sistema de sorteio JK</h4>
                                <p>Escaneie o QR Code e ganhe 1 ano de JK Burguer grátis</p>

                                <div className="qr-code-box nota-qr">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                                            `JK Burguer Pedido:${pedidoCriado?.id || numeroPedido} Total:${totalOficial}`
                                        )}`}
                                        alt="QR Code"
                                    />
                                </div>
                            </div>

                            <div className="nota-botoes">
                                <button className="imprimir-btn" onClick={() => window.print()}>
                                    Imprimir
                                </button>
                                <button className="nova-venda-btn" onClick={novaVenda}>
                                    Nova venda
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}