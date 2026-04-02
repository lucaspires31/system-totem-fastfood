import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./CPF.css";

export default function CPF() {
  const [cpf, setCpf] = useState("");
  const [mostrarTeclado, setMostrarTeclado] = useState(false);
  const navigate = useNavigate();

  function formatarCPF(valor) {
    valor = valor.replace(/\D/g, "").slice(0, 11);

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return valor;
  }

  function adicionarNumero(numero) {
    const apenasNumeros = cpf.replace(/\D/g, "");

    if (apenasNumeros.length >= 11) return;

    const novoCPF = formatarCPF(apenasNumeros + numero);
    setCpf(novoCPF);
  }

  function apagarNumero() {
    const apenasNumeros = cpf.replace(/\D/g, "");
    const novoCPF = formatarCPF(apenasNumeros.slice(0, -1));
    setCpf(novoCPF);
  }

  function limparCPF() {
    setCpf("");
  }

  async function confirmar() {
    const cpfLimpo = cpf.replace(/\D/g, "");

    if (cpfLimpo.length === 11) {
      try {
        const response = await fetch("http://localhost:8080/clientes/cpf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cpf: cpfLimpo }),
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar cliente");
        }

        const cliente = await response.json();

        localStorage.setItem("cpf", cliente.cpf);
        localStorage.setItem("nomeCliente", cliente.nome || "Cliente");
        localStorage.setItem("pontos", String(cliente.pontos ?? 0));
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        localStorage.removeItem("cpf");
        localStorage.removeItem("nomeCliente");
        localStorage.removeItem("pontos");
      }
    } else {
      localStorage.removeItem("cpf");
      localStorage.removeItem("nomeCliente");
      localStorage.removeItem("pontos");
    }

    navigate("/tipo-pedido");
  }

  function pular() {
    localStorage.removeItem("cpf");
    localStorage.removeItem("nomeCliente");
    localStorage.removeItem("pontos");
    navigate("/tipo-pedido");
  }

  const teclas = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  return (
    <motion.div
      className="cpf-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="cpf-container">
        <h1>GANHE PONTOS</h1>

        <p>
          Digite seu CPF para ganhar pontos
          <span className="optional">(opcional)</span>
        </p>

        <input
          type="text"
          placeholder="000.000.000-00"
          value={cpf}
          readOnly
          onClick={() => setMostrarTeclado(true)}
          className="cpf-input"
        />

        {mostrarTeclado && (
          <div className="teclado">
            <div className="teclado-grid">
              {teclas.slice(0, 9).map((numero) => (
                <button
                  key={numero}
                  className="tecla"
                  onClick={() => adicionarNumero(numero)}
                >
                  {numero}
                </button>
              ))}

              <button className="tecla tecla-acao" onClick={limparCPF}>
                Limpar
              </button>

              <button className="tecla" onClick={() => adicionarNumero("0")}>
                0
              </button>

              <button className="tecla tecla-acao" onClick={apagarNumero}>
                ⌫
              </button>
            </div>
          </div>
        )}

        <div className="buttons">
          <button className="confirmar" onClick={confirmar}>
            CONFIRMAR
          </button>

          <button className="pular" onClick={pular}>
            PULAR
          </button>
        </div>
      </div>
    </motion.div>
  );
}