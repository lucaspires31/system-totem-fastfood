import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./TipoPedido.css";

import embalagemImg from "../assets/Image/Combo.png";
import localImg from "../assets/Image/levar.png";

export default function TipoPedido() {
  const navigate = useNavigate();
  const nomeCliente = localStorage.getItem("nomeCliente");

  function selecionarTipo(tipo) {
    localStorage.setItem("tipoPedido", tipo);
    navigate("/menu");
  }

  return (
    <motion.div
      className="tipo-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="tipo-container">
        <h1>
          {nomeCliente && nomeCliente !== "Cliente"
            ? `Seja bem-vindo, ${nomeCliente}`
            : "Seja bem-vindo"}
        </h1>
        <p>Escolha uma opção para continuar</p>

        <div className="tipo-cards">
          <motion.div
            className="tipo-card"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => selecionarTipo("Levar")}
          >
            <div className="tipo-img-box">
              <img src={localImg} alt="Pedido para levar" />
            </div>
            <h2>Levar</h2>
            <span>Retire e leve com você</span>
          </motion.div>

          <motion.div
            className="tipo-card"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => selecionarTipo("Comer no local")}
          >
            <div className="tipo-img-box">
              <img src={embalagemImg} alt="Pedido para comer no local" />
            </div>
            <h2>Comer no local</h2>
            <span>Aproveite sua refeição aqui</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}