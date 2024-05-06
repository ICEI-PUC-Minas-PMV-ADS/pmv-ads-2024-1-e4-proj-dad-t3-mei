import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./header.css";

import { FaUser } from "react-icons/fa";

const Header = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <Navbar expand="lg" className="bg-navbar">
      <Container className="bg-container-navbar">
        <Navbar.Brand href="/">
          <span className="nav-logo">MEI A MEI</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto color-navbar gap-3">
            {isAuthenticated ? (
              <>
                <Nav.Link href="/meumei">Meu MEI</Nav.Link>
                <Nav.Link href="/gerenciamento">Gerenciamento</Nav.Link>
                <Nav.Link href="/registros">Registros</Nav.Link>
                <Nav.Link href="/perfil">Perfil</Nav.Link>
                <Nav.Link onClick={handleLogout}>Sair</Nav.Link>
                <span className="d-flex align-self-center px-3">
                  <FaUser />
                </span>
              </>
            ) : (
              <div className="d-flex align-self-center gap-3">
                <Nav.Link href="/#funcionalidades">Funcionalidades</Nav.Link>
                <Nav.Link href="/#faleconosco">Fale Conosco</Nav.Link>
                <Nav.Link href="/registrar">Cadastrar</Nav.Link>
                <Nav.Link href="/login">
                  <span className="span-entrar">Entrar</span>
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
