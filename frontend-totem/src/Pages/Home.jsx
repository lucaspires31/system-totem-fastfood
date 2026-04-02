import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";
import bannerHome from "../assets/image/bannerOfi2.png";

export default function Home() {
  const [saindo, setSaindo] = useState(false);
  const navigate = useNavigate();

  function iniciarPedido() {
    setSaindo(true);

    setTimeout(() => {
      navigate("/cpf");
    }, 700);
  }

  return (
    <motion.div
      className="home-screen"
      initial={{ opacity: 0, scale: 1 }}
      animate={saindo ? { opacity: 0, scale: 1.03 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mirror-bg">
        <div
          className="mirror-side left"
          style={{ backgroundImage: `url(${bannerHome})` }}
        />
        <div
          className="mirror-side right"
          style={{ backgroundImage: `url(${bannerHome})` }}
        />
      </div>

      <div className="main-content">
        <img src={bannerHome} alt="Banner inicial" className="main-img" />

        <div className="home-overlay">
          <motion.button
            className="start-button"
            onClick={iniciarPedido}
            whileTap={{ scale: 0.96 }}
            animate={saindo ? { y: 30, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            TOQUE PARA COMEÇAR
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}