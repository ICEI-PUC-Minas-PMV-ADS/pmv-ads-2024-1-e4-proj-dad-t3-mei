import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./components/home/Home";
import Registrar from "./components/registrar/Registrar";
import Login from "./components/login/Login";
import Recuperar from "./components/recuperar/Recuperar";
import Faturamento from "./components/faturamento/Faturamento";
import Gerenciamento from "./components/Gerenciamento/Gerenciamento";
import Registros from "./components/Registros/Registros";
import Perfil from "./components/Perfil/Perfil";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar" element={<Recuperar />} />
          <Route path="/meumei" element={<Faturamento />} />
          <Route path="/gerenciamento" element={<Gerenciamento />} />
          <Route path="/registros" element={<Registros />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
