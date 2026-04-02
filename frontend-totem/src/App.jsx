import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CPF from "./Pages/CPF";
import TipoPedido from "./Pages/TipoPedido";
import Menu from "./Pages/Menu";
import Carrinho from "./Pages/Carrinho";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cpf" element={<CPF />} />
        <Route path="/tipo-pedido" element={<TipoPedido />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
    </BrowserRouter>
  );
}