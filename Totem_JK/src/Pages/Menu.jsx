import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

import comboGorila from "../assets/Image/ComboGorila.png";
import comboJK from "../assets/Image/ComboJK.png";
import comboPadrao from "../assets/Image/Combo.png";
import comboMico from "../assets/Image/ComboMico.png";
import comboSagui from "../assets/Image/ComboSagui.png";
import combokids from "../assets/Image/ComboKids.png";

import burger1 from "../assets/Image/hamburguer1.png";
import burger2 from "../assets/Image/hamburguer2.png";
import burger3 from "../assets/Image/hamburguer3.png";
import burger4 from "../assets/Image/hamburguer4.png";
import burger5 from "../assets/Image/hamburguer5.png";
import burger6 from "../assets/Image/hamburguer6.png";

import refri from "../assets/Image/Refri1.png";
import refri2 from "../assets/Image/Refri2.png";
import refri3 from "../assets/Image/Refri3.png";
import refri4 from "../assets/Image/Refri4.png";
import refri5 from "../assets/Image/Refri5.png";

import batata from "../assets/Image/batata.png";
import batata2 from "../assets/Image/Batata2.png";
import batata3 from "../assets/Image/Batata3.png";
import batata4 from "../assets/Image/Batata4.png";

import sobremesa from "../assets/Image/sorvete.png";
import sobremesa2 from "../assets/Image/milk.png";
import sobremesa3 from "../assets/Image/brownie.png";
import sobremesa4 from "../assets/Image/torta.png";
import sobremesa5 from "../assets/Image/donuts.png";

const categorias = [
  "Combos Mata Fome",
  "Hambúrgueres",
  "Bebidas",
  "Batatas",
  "Sobremesas",
];

const imagensProdutos = {
  "Combo Gorila": comboGorila,
  "Combo JK": comboJK,
  "Combo Orangotango": comboPadrao,
  "Combo Mico": comboMico,
  "Combo Sagui": comboSagui,
  "Combo Kids": combokids,

  "JK Smash": burger1,
  "Sagui Burguer": burger2,
  "Gorila Burguer": burger3,
  "Mico Burguer": burger4,
  "Orangotango Burguer": burger5,
  "Cheddar Burguer": burger6,

  "Coca-Cola 500ml": refri,
  "Guaraná 500ml": refri2,
  "Fanta Laranja": refri3,
  "Sprite": refri4,
  "Coca Zero": refri,
  "Suco Del Valle Uva": refri5,

  "Batata Pequena": batata,
  "Batata Média": batata3,
  "Batata Grande": batata4,
  "Batata com Cheddar": batata2,

  "Sorvete": sobremesa,
  "Milkshake": sobremesa2,
  "Brownie": sobremesa3,
  "Torta de Morango": sobremesa4,
  "Donuts de pistache": sobremesa5,
};

export default function Menu() {
  const navigate = useNavigate();
  const [categoriaAtiva, setCategoriaAtiva] = useState("Combos Mata Fome");
  const [quantidades, setQuantidades] = useState({});
  const [animandoCarrinho, setAnimandoCarrinho] = useState(null);
  const [produtosApi, setProdutosApi] = useState([]);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await fetch("http://localhost:8080/produtos");
        const data = await response.json();
        setProdutosApi(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    carregarProdutos();
  }, []);

  function mapearTipoParaCategoria(tipo) {
    switch (tipo) {
      case "COMBO":
        return "Combos Mata Fome";
      case "LANCHE":
        return "Hambúrgueres";
      case "BEBIDA":
        return "Bebidas";
      case "ACOMPANHAMENTO":
        return "Batatas";
      case "SOBREMESA":
        return "Sobremesas";
      default:
        return "";
    }
  }

  const itensCategoria = useMemo(() => {
    return produtosApi
      .filter((produto) => mapearTipoParaCategoria(produto.tipo) === categoriaAtiva)
      .map((produto) => ({
        ...produto,
        imagem: imagensProdutos[produto.nome],
      }));
  }, [categoriaAtiva, produtosApi]);

  function aumentar(id) {
    setQuantidades((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    setAnimandoCarrinho(id);
    setTimeout(() => setAnimandoCarrinho(null), 500);
  }

  function diminuir(id) {
    setQuantidades((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  }

  const totalItens = Object.values(quantidades).reduce((acc, qnt) => acc + qnt, 0);

  function confirmarPedido() {
    const itensSelecionados = [];

    Object.entries(quantidades).forEach(([id, quantidade]) => {
      if (quantidade > 0) {
        const produto = produtosApi.find((item) => item.id === Number(id));

        if (produto) {
          itensSelecionados.push({
            ...produto,
            imagem: imagensProdutos[produto.nome],
            quantidade,
            categoria: mapearTipoParaCategoria(produto.tipo),
          });
        }
      }
    });

    navigate("/carrinho", {
      state: { itens: itensSelecionados },
    });
  }

  return (
    <div className="menu-screen">
      <header className="menu-header">
        <h1>Menu</h1>

        <button
          className="cart-button"
          onClick={confirmarPedido}
          disabled={totalItens === 0}
        >
          <ShoppingCart size={24} />
          {totalItens > 0 && <span className="cart-badge">{totalItens}</span>}
        </button>
      </header>

      <main className="menu-content">
        <aside className="menu-sidebar">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              className={`category-btn ${categoriaAtiva === categoria ? "active" : ""}`}
              onClick={() => setCategoriaAtiva(categoria)}
            >
              {categoria}
            </button>
          ))}
        </aside>

        <section className="menu-products">
          <AnimatePresence mode="wait">
            <motion.div
              key={categoriaAtiva}
              className="products-grid"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              {itensCategoria.map((produto) => (
                <motion.div key={produto.id} className="product-card" layout>
                  <div className="product-image-area">
                    <img src={produto.imagem} alt={produto.nome} className="product-image" />

                    <AnimatePresence>
                      {animandoCarrinho === produto.id && (
                        <motion.div
                          className="fly-dot"
                          initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
                          animate={{ opacity: 1, scale: 1, x: 180, y: -180 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  <h3>{produto.nome}</h3>
                  <p className="price">R$ {produto.preco.toFixed(2).replace(".", ",")}</p>

                  <div className="quantity-controls">
                    <button onClick={() => diminuir(produto.id)}>-</button>
                    <span>{quantidades[produto.id] || 0}</span>
                    <button onClick={() => aumentar(produto.id)}>+</button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="confirm-area">
            <button className="confirm-button" onClick={confirmarPedido}>
              CONFIRMAR PEDIDO
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}