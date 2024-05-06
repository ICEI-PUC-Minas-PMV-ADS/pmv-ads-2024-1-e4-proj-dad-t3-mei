import { useState } from "react";

import Form from "react-bootstrap/Form";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import Logo from "../../assets/Logo.svg";
import "./registrar.css";

function Registrar() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:7097/api/Usuarios", {
        email,
        senha,
        nome,
        cnpj,
      });

      console.log(response.data);

      const token = response.data.token;

      // Armazene o token no local storage
      localStorage.setItem("jwtToken", token);
      console.log("Token JWT via E-mail: " + token);

      // Redirecione o usuário para a página inicial
      // window.location.href = '/';
    } catch (error) {
      console.error("Erro ao registrar", error);
    }
  };

  return (
    <div>
      <Container className="view dark-purple-text">
        <div className="box">
          <Row className="mt-3">
            <Col className="col-7 bg-left">
              <Row>
                <div className="text-center mt-3">
                  <h1>Criar Conta</h1>
                </div>
              </Row>
              <Row>
                <Form className="form-width m-auto py-5">
                  <Form.Group className="mb-3" controlId="formRazao">
                    <Form.Label>Razão Social</Form.Label>
                    <Form.Control
                      className="form-control"
                      type="text"
                      placeholder="Maria Joaquina"
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="nome@email.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      Nós nunca compartilharemos seu e-mail.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Senha"
                      onChange={(e) => setSenha(e.target.value)}
                      value={senha}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirmar senha</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Senha"
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                      value={confirmarSenha}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formCnpj">
                    <Form.Label>CNPJ</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="CNPJ"
                      onChange={(e) => setCnpj(e.target.value)}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <a href="/" className="btn btn-criar" role="button">
                      Cancelar
                    </a>
                    <button
                      className="btn btn-criar"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Cadastrar
                    </button>
                  </div>
                </Form>
              </Row>
            </Col>
            <Col className="col-5 d-flex justify-content-center align-self-center">
              <div className="">
                <img className="logo" src={Logo} alt="" />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Registrar;
