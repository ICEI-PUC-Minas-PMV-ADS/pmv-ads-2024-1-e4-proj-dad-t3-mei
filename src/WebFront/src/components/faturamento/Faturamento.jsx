import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import "./faturamento.css";
import RegistrarVendas from "../RegistrarVendas/RegistrarVendas";
import RegistrarDespesas from "../RegistrarDespesas/RegistrarDespesas";
import GraficoMes from "../Graficos/GraficoMes";
import GraficoAno from "../Graficos/GraficoAno";
import { useState } from "react";
import SaldoFaturamento from "../RegistrarVendas/SaldoVendas";
import SaldoDespesa from "../RegistrarDespesas/SaldoDespesas";

const Faturamento = () => {
  const [grafico, setGrafico] = useState("mes");

  return (
    <Container fluid className="w-75 mt-3 bg-light">
      <Row>
        <Col className="border border-warning p-3 m-3 ">
          <Row>
            <div className="d-flex justify-content-between">
              <h3 className="dark-purple-text fw-bold">Seu Faturamento</h3>

              <div>
                <button className="btn btn-criar">MÊS</button>{" "}
                <button className="btn btn-criar">ANO</button>
              </div>
            </div>
            <Col>
              <div>
                <h3 className="dark-purple-text">
                  R$
                  <span className="valor-receita p-3 text-success">
                    <SaldoFaturamento />
                  </span>
                </h3>
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="border border-warning p-3 m-3">
          <div className="d-flex justify-content-between">
            <h3 className="dark-purple-text fw-bold">Suas Despesas</h3>
            <div>
              <button className="btn btn-criar">MÊS</button>{" "}
              <button className="btn btn-criar">ANO</button>
            </div>
          </div>
          <div>
            <h3 className="dark-purple-text">
              R$
              <span className="valor-receita p-3 text-danger">
                {" "}
                <SaldoDespesa />{" "}
              </span>
            </h3>
          </div>
        </Col>
      </Row>
      <Row>
        <div className="py-3 m-auto ">
          <h4 className="dark-purple-text fw-bold">Seu limite MEI</h4>
          <ProgressBar
            variant={"sucess"}
            now={100}
            label={`Fazendo os cálculos...%`}
          />
          <p></p>
        </div>
      </Row>
      <Row>
        <Col className="border border-warning p-3 m-3 box">
          <Row>
            <Tabs
              defaultActiveKey="venda"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="venda" title="Vendas">
                <h4 className="py-3 ps-1">Registre uma venda</h4>
                <RegistrarVendas />
              </Tab>
              <Tab eventKey="despesas" title="Despesas">
                <h4 className="py-3 ps-1">Registre uma despesa</h4>
                <RegistrarDespesas />
              </Tab>
            </Tabs>
          </Row>
        </Col>
      </Row>
      {/* Gráficos de despesas e receitas  */}
      <Row>
        <div>
          <Col className="border border-warning p-3 m-3 ">
            <Row>
              <Col className="col-4">
                <h4 className="py-3 ps-1">Controle Financeiro</h4>
              </Col>
              <Col className="col-4 d-flex align-items-center justify-content-center">
                <div>
                  <div className="d-flex align-items-center">
                    <button
                      onClick={() => setGrafico("mes")}
                      className="btn btn-criar"
                    >
                      MÊS
                    </button>
                    {"  "}
                    <button
                      onClick={() => setGrafico("ano")}
                      className="btn btn-criar ms-1"
                    >
                      ANO
                    </button>
                  </div>
                </div>
              </Col>
              <Col className="col-4"></Col>
            </Row>
            <Row>
              <Col className="w-75 d-flex justify-content-center mb-4 dchart">
                <div className="w-75">
                  {grafico == "mes" ? (
                    <GraficoMes className="border border-warning p-3 m-3" />
                  ) : (
                    <GraficoAno />
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </div>
      </Row>
    </Container>
  );
};

export default Faturamento;
