import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { jwtDecode } from "jwt-decode";

const urlProdutos = "https://swaggerapimeiamei.azurewebsites.net/api/Produtos";
const urlServicos = "https://swaggerapimeiamei.azurewebsites.net/api/Servicos";
const url = "https://swaggerapimeiamei.azurewebsites.net/api/Faturamentos";

const RegistrarVendas = () => {
  const [faturamentos, setFaturamentos] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [dataFaturamento, setDataFaturamento] = useState("");
  const [meioDePagamento, setMeioDePagamento] = useState("Dinheiro");
  const [usuarioId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.nameid);
  }, []);

  useEffect(() => {
    if (usuarioId) {
      setIsLoading(true);
      Promise.all([
        fetch(urlProdutos).then((response) => response.json()),
        fetch(urlServicos).then((response) => response.json()),
      ])
        .then(([produtosData, servicosData]) => {
          setProdutos(
            produtosData.filter((produto) => produto.usuarioId === usuarioId)
          );
          setServicos(
            servicosData.filter((servico) => servico.usuarioId === usuarioId)
          );
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [usuarioId]);

  const limparCampos = () => {
    setNome("");
    setDataFaturamento("");
    setValor("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome.trim()) {
      setError("O campo 'Nome' não pode estar vazio.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const dataToSend = {
      nome,
      valor,
      dataFaturamento,
      meioDePagamento,
      usuarioId,
      produtoId: selectedProduct,
      servicoId: selectedService,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados");
      }

      const newData = await response.json();
      setFaturamentos([...faturamentos, newData]);
      limparCampos();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nome") {
      setNome(value);
    } else if (name === "valor") {
      setValor(value);
    } else if (name === "dataFaturamento") {
      setDataFaturamento(value);
    } else if (name === "meioDePagamento") {
      setMeioDePagamento(value);
    } else if (name === "selectedProduct") {
      setSelectedProduct(value);
    } else if (name === "selectedService") {
      setSelectedService(value);
    }
  };

  return (
    <Form className="d-flex justify-content-center" onSubmit={handleSubmit}>
      <div className="drv">
        <Row className="g-5 mb-3">
          <Col className="col-6">
            <FloatingLabel controlId="floatingInputGrid" label="Venda de ...">
              <Form.Control
                type="text"
                name="nome"
                placeholder=""
                value={nome}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>
          <Col className="col-6 d-flex">
            <Col className="col-6">
              <FloatingLabel
                className="mb-3"
                controlId="floatingSelectGrid"
                label="Produto"
              >
                <Form.Select
                  name="selectedProduct"
                  value={selectedProduct}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  {produtos.map((produto) => (
                    <option key={produto.id} value={produto.id}>
                      {produto.nome}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col className="col-6">
              <FloatingLabel controlId="floatingSelectGrid" label="Serviço">
                <Form.Select
                  name="selectedService"
                  value={selectedService}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  {servicos.map((servico) => (
                    <option key={servico.id} value={servico.id}>
                      {servico.nome}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Col>
        </Row>
        <Row className="g-5 d-flex justify-content-center mb-3">
          <Col className="col-6">
            <FloatingLabel controlId="floatingInputGrid" label="Data">
              <Form.Control
                type="date"
                name="dataFaturamento"
                value={dataFaturamento}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>
          <Col className="col-6">
            <FloatingLabel
              controlId="floatingSelectGrid"
              label="Meio de pagamento"
            >
              <Form.Select
                name="meioDePagamento"
                value={meioDePagamento}
                onChange={handleChange}
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartao">Cartão</option>
                <option value="PIX">PIX</option>
                <option value="Outro">Outro</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-5 mb-3">
          <Col className="col-4">
            <FloatingLabel controlId="floatingInputGrid" label="R$">
              <Form.Control
                type="number"
                name="valor"
                placeholder=""
                value={valor}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Button variant="success" type="submit" disabled={isLoading}>
          {isLoading ? "Adicionando..." : "Adicionar venda"}
        </Button>{" "}
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </Form>
  );
};

export default RegistrarVendas;
