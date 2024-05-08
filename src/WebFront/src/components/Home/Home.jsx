//import React from 'react'
import Logo from "../../assets/Logo.svg";
import dinheiro from "../../assets/dinheiro.svg";
import grafico from "../../assets/grafico.svg";
import pcCel from "../../assets/pcCel.svg";
import whatsapp from "../../assets/whatsapp.svg";
import email from "../../assets/email.svg";
import "./home.css";
import { Container, Row, Col } from "react-bootstrap";
import PlayStoreLogo from "../../assets/google-play-badge.png";
import AppleStoreLogo from "../../assets/apple-store-logo.png";

const Home = () => {
  return (
    <>
      <Container>
        <section>
          <Row>
            <Col className="m-auto align-items-center">
              <Row>
                <Col className="col-2"></Col>
                <Col className="col-6">
                  <h1 className="mb-4">
                    <span className="purple-text fw-bold">
                      Organize seu negócio!
                    </span>
                  </h1>
                  <div className="fw-bol mb-4">
                    <h3>
                      <span className="purple-text">Registre</span> e{" "}
                      <span className="purple-text">gerencie</span> tudo{" "}
                      <span className="purple-text">com</span> mais{" "}
                      <span className="purple-text">facilidade!</span>
                    </h3>
                  </div>

                  <p className="fw-medium">
                    Sistema Financeiro simples e seguro. Automatize as rotinas
                    financeiras do seu MEI e tenha suas informações organizadas.
                  </p>
                </Col>
              </Row>
            </Col>
            <Col className="align-self-center text-center">
              <div className="logo img-fluid">
                <img src={Logo} alt="Logo" />
              </div>
            </Col>
          </Row>
        </section>
        <section className="funcionalidades-bg purple-text">
          <Row>
            <h3 className="purple-text text-center mt-3" id="funcionalidades">
              Funcionalidades
            </h3>
          </Row>
          <Row className="mt-5 mx-2">
            <Col className="col-4 d-flex gap-2">
              <Col className="col-4">
                <div className="d-flex justify-content-end mt-1 me-4">
                  <img className="dinheiro" src={dinheiro} alt="" />
                </div>
              </Col>
              <Col>
                <h5 className="mb-3">Gerenciamento Financeiro</h5>
                <p className="text-dark fw-medium">
                  Registre e gerencie todas as suas transações financeiras de
                  forma fácil e intuitiva.
                </p>
              </Col>
            </Col>
            <Col className="col-4 d-flex  gap-2">
              <Col className="col-4">
                <div className="d-flex justify-content-end mt-1 me-4">
                  <img className="grafico" src={grafico} alt="" />
                </div>
              </Col>
              <Col>
                <h5 className="mb-3">Acompanhamento de Limites</h5>
                <p className="text-dark fw-medium">
                  Acompanhe suas finanças para garantir que você não ultrapasse
                  o limite definido por lei para a categoria MEI.
                </p>
              </Col>
            </Col>
            <Col className="col-4 d-flex  gap-2">
              <Col className="col-4">
                <div className="d-flex justify-content-end mt-1 me-4">
                  <img className="pcCel" src={pcCel} alt="" />
                </div>
              </Col>
              <Col>
                <h5 className="mb-3">Multiplataforma</h5>
                <p className="text-dark fw-medium">
                  Use o aplicativo pelo website ou baixá-lo para seu dispositivo
                  móvel.
                </p>
              </Col>
            </Col>
          </Row>
        </section>
        <section className="pb-5">
          <Row>
            <Col className="d-flex">
              <Col className="col-2"></Col>
              <Col className="col-6">
                <div className="align-items-center justify-items-center d-block">
                  <h5
                    className="purple-text text-start mb-3 mt-5"
                    id="faleconosco"
                  >
                    Fale Conosco:
                  </h5>
                  <div className="d-flex align-items-center fw-medium purple-text">
                    <img className="whatsapp my-3" src={whatsapp} alt="" />
                    <p className="m-0 ms-3">55 31 99266-7723</p>
                  </div>
                  <div className="d-flex align-items-center fw-medium purple-text">
                    <img className="email my-3" src={email} alt="" />
                    <p className="m-0 ms-3">meiamei@contato.com</p>
                  </div>
                </div>
              </Col>
            </Col>
            <Col className="d-flex">
              <Col className="col-2"></Col>
              <Col className="col-6">
                <div className="align-items-center justify-items-center d-block">
                  <h5
                    className="purple-text text-start mb-3 mt-5"
                    id="faleconosco"
                  >
                    Baixe nosso aplicativo:
                  </h5>
                  <div className="align-items-start">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.example.app"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={PlayStoreLogo}
                        alt="Download na Play Store"
                        className="store-logo"
                      />
                    </a>
                    <a
                      href="https://apps.apple.com/app/id123456789"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={AppleStoreLogo}
                        alt="Download na Apple Store"
                        className="store-logo "
                      />
                    </a>
                  </div>
                </div>
              </Col>
            </Col>
          </Row>
        </section>
      </Container>
      <footer className="footer"></footer>
    </>
  );
};

export default Home;
