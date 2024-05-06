import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Row, Col, Container } from "react-bootstrap";
import Logo from "../../assets/Logo.svg";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Faz a autenticação usando o e-mail e a senha do usuário
      const authResponse = await fetch(
        "https://localhost:7097/api/Usuarios/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            senha: password,
          }),
        }
      );

      if (!authResponse.ok) {
        throw new Error("Erro na autenticação");
      }

      const data = await authResponse.json();
      const token = data.jwtToken;
      console.log("Token JWT via E-mail: " + token);

      if (token) {
        // Redireciona o usuário para a página inicial
        window.location.href = "/";
        console.log("Token JWT via E-mail: " + token);
      } else {
        throw new Error("Token não encontrado");
      }

      // Armazena o token no localStorage
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  return (
    <Container className="view dark-purple-text">
      <div className="box">
        <Row className="mt-3">
          <Col className="col-7 bg-left">
            <Row>
              <div className="d-flex justify-content-center mt-3">
                <img className="logo-login" src={Logo} alt="" />
                <div className="text-center mt-3">
                  <h1>MEI A MEI</h1>
                </div>
              </div>
            </Row>
            <Row>
              <h4 className="text-center mt-5">Faça seu Login</h4>
            </Row>
            <Row>
              <Form.Group className="form-width m-auto py-3">
                <Form.Control
                  type="email"
                  placeholder="E-mail"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 form-width m-auto"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form className="form-width m-auto py-5">
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-criar"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <a className="a-esqueci" href="/recuperar">
                    Esqueceu a senha?
                  </a>
                </div>
              </Form>
            </Row>
          </Col>
          <Col className="col-5 d-flex flex-column justify-content-center align-items-center">
            <h5 className="text-center fw-bold">
              Ainda não é cliente e deseja conhecer o MEI a MEI?
            </h5>
            <a href="/#contatenos">
              <button className="btn btn-faleconosco">FALE CONOSCO!</button>
            </a>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Login;
