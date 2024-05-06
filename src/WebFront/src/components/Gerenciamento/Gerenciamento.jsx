import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RegistrarProdutos from "../RegistrarProdutos/RegistrarProdutos";
import RegistrarServicos from "../RegistrarServicos/RegistrarServicos";
import RegistrarCategorias from "../RegistrarCategorias/RegistrarCategorias";
import RegistrarClientes from "../RegistrarClientes/RegistrarClientes";
import ProcurarContadores from "../ProcurarContadores/ProcurarContadores";

const Gerenciamento = () => {
  return (
    <Container fluid className="w-75 mt-3 bg-light">
      <Row>
        <Col className="border border-warning p-3 m-3 box">
          <Row>
            <Tabs
              defaultActiveKey="venda"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="venda" title="Produtos">
                <h4 className="py-3 ps-1">Cadastre um Produto</h4>
                <RegistrarProdutos />
              </Tab>
              <Tab eventKey="despesas" title="Serviços">
                <h4 className="py-3 ps-1">Cadastre um Serviço</h4>
                <RegistrarServicos />
              </Tab>
              <Tab eventKey="categoria" title="Categoria">
                <h4 className="py-3 ps-1">Cadastre uma Categoria de Despesa</h4>
                <RegistrarCategorias />
              </Tab>
              <Tab eventKey="clientes" title="Clientes">
                <h4 className="py-3 ps-1">Cadastre um Cliente</h4>
                <RegistrarClientes />
              </Tab>
              <Tab eventKey="contador" title="Contador">
                <h4 className="py-3 ps-1">
                  Procure aqui um contador próximo a você
                </h4>
                <ProcurarContadores />
              </Tab>
            </Tabs>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Gerenciamento;