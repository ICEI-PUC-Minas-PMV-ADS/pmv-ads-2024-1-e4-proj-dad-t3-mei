import { Row, Col, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Logo from "../../assets/Logo.svg";

import "./recuperar.css";

const Recuperar = () => {
  return (
    <Container className="view dark-purple-text">
      <div className="box">
        <Row className="mt-3">
          <Col className="col-7 bg-left">
            <Row>
              <div className="text-center mt-3">
                <h1>Recuperação de Conta</h1>
              </div>
            </Row>
            <Row>
              <Form className="form-width m-auto py-5">
                <Form.Group className="mb-3" controlId="formEmail">
                  <h4 className="mb-4">
                    Digite um e-mail apra recuperar a senha
                  </h4>
                  <Form.Control
                    className="mb-4"
                    type="email"
                    placeholder="E-mail"
                  />
                  <Form.Text className="text-muted">
                    <p className="mb-4">
                      Caso seu e-mail seja válido em nossa base de dados, em
                      breve você receberá um e-mail com a nova senha!
                    </p>
                  </Form.Text>
                </Form.Group>
                <div className="text-center">
                  <button className="btn btn-criar" type="submit">
                    Recuperar
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
  );
};

export default Recuperar;
