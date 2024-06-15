import React from "react";
import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import "primeicons/primeicons.css";

const Navbar = () => {
  const { token } = useAuth();

  return (
    <div className="bg-nav">
      <nav className="container" id="nav">
        <Link className="logomarca" to="/">
          Mei a Mei
        </Link>
        <ul id="nav-links">
          {!token ? (
            <>
              <li>
                <a href="/#funcionalidades">Funcionalidades</a>
              </li>
              <li>
                <a href="/#fale-conosco">Fale Conosco</a>
              </li>
              <li>
                <NavLink to="/cadastrar">Cadastrar</NavLink>
              </li>
              <li>
                <NavLink to="/login">Entrar</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/meumei">MeuMei</NavLink>
              </li>
              <li>
                <NavLink to="/gerenciamento">Gerenciamento</NavLink>
              </li>
              <li>
                <NavLink to="/registros">Registros</NavLink>
              </li>
              <li>
                <NavLink to="/perfil">Perfil</NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("usuario");
                    window.location.href = "/";
                  }}
                >
                  Sair
                  <i
                    className="pi pi-sign-out"
                    style={{ marginLeft: "0.5em" }}
                  ></i>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
