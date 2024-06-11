import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://swaggerapimeiamei.azurewebsites.net/api";

const Registros = () => {
  const [faturamentos, setFaturamentos] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.nameid);
  }, []);

  useEffect(() => {
    if (userId) {
      Promise.all([
        fetch(`${API_URL}/Faturamentos`).then((response) => response.json()),
        fetch(`${API_URL}/Despesas`).then((response) => response.json()),
        fetch(`${API_URL}/Produtos`).then((response) => response.json()),
        fetch(`${API_URL}/Servicos`).then((response) => response.json()),
      ])
        .then(
          ([faturamentosData, despesasData, produtosData, servicosData]) => {
            setFaturamentos(
              faturamentosData.filter((fat) => fat.usuarioId === userId)
            );
            setDespesas(despesasData.filter((des) => des.usuarioId === userId));
            setProdutos(produtosData.filter((pro) => pro.usuarioId === userId));
            setServicos(servicosData.filter((ser) => ser.usuarioId === userId));
          }
        )
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        });
    }
  }, [userId]);

  const handleExcluirRegistro = async (tipo, id) => {
    try {
      const response = await fetch(`${API_URL}/${tipo}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Erro ao excluir o ${tipo}`);
      }
      switch (tipo) {
        case "Faturamentos":
          setFaturamentos(faturamentos.filter((fat) => fat.id !== id));
          break;
        case "Despesas":
          setDespesas(despesas.filter((des) => des.id !== id));
          break;
        case "Produtos":
          setProdutos(produtos.filter((produto) => produto.id !== id));
          break;
        case "Servicos":
          setServicos(servicos.filter((servico) => servico.id !== id));
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Erro ao excluir o ${tipo}: `, error);
    }
  };

  const renderTable = (headers, data, renderRow, type) => {
    return (
      <Table striped hover responsive size="sm">
        <thead className="table-light ">
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {data.map((item) => renderRow(item))}
        </tbody>
      </Table>
    );
  };

  const renderFaturamentosRow = (fat) => {
    const produto = produtos.find((p) => p.id === fat.produtosId);
    const servico = servicos.find((s) => s.id === fat.servicosId);

    return (
      <tr key={fat.id}>
        <td>{fat.dataFaturamento}</td>
        <td>{fat.nome}</td>
        <td>{fat.produtoId === "Produto" ? produto?.nome : ""}</td>
        <td>{fat.servicoId === "Serviço" ? servico?.nome : ""}</td>
        <td>{fat.meioDePagamento}</td>
        <td>{fat.valor}</td>
        <td>
          <button
            onClick={() => handleExcluirRegistro("Faturamentos", fat.id)}
            className="btn btn-danger btn-sm"
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  };

  const renderDespesasRow = (des) => (
    <tr key={des.id}>
      <td>{des.dataDespesa}</td>
      <td>{des.nome}</td>
      <td>{des.categoriasId}</td>
      <td>{des.valor}</td>
      <td>
        <button
          onClick={() => handleExcluirRegistro("Despesas", des.id)}
          className="btn btn-danger btn-sm"
        >
          Excluir
        </button>
      </td>
    </tr>
  );

  return (
    <Container fluid className="w-75 mt-3 bg-light">
      <Row>
        <Col className="border border-warning p-3 m-3 box">
          <h3>Registros de vendas</h3>
          {renderTable(
            [
              "Data",
              "Venda",
              "Produto",
              "Serviço",
              "Meio de Pagamento",
              "Valor",
            ],
            faturamentos,
            renderFaturamentosRow,
            "Faturamentos"
          )}
        </Col>
      </Row>
      <Row>
        <Col className="border border-warning p-3 m-3 box">
          <h3>Registros de despesas</h3>
          {renderTable(
            ["Data", "Despesa", "Categoria", "Valor"],
            despesas,
            renderDespesasRow,
            "Despesas"
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Registros;
