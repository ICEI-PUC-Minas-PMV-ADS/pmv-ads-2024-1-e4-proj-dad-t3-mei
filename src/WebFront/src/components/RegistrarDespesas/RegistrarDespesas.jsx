import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { jwtDecode } from "jwt-decode";

const urlDespesas = "https://swaggerapimeiamei.azurewebsites.net/api/Despesas";
const urlCategorias = "https://swaggerapimeiamei.azurewebsites.net/api/Categorias";

const RegistrarDespesas = () => {
  const [despesas, setDespesas] = useState([]);
  const [nomeDespesa, setNomeDespesa] = useState("");
  const [valorDespesa, setValorDespesa] = useState("");
  const [dataDespesa, setDataDespesa] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [usuarioId, setUsuarioId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategoria, setSelectedCategoria] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setUsuarioId(decodedToken.nameid);
  }, []);

  useEffect(() => {
    if (usuarioId) {
      setIsLoading(true);
      fetch(urlCategorias)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao carregar categorias.");
          }
          return response.json();
        })
        .then((data) => {
          setCategorias(data.filter((cat) => cat.usuarioId === usuarioId));
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
    setNomeDespesa("");
    setDataDespesa("");
    setValorDespesa("");
    setSelectedCategoria("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nomeDespesa.trim()) {
      setError("O campo 'Nome' não pode estar vazio.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const dataToSend = {
      nome: nomeDespesa,
      valor: valorDespesa,
      dataDespesa,
      usuarioId,
      categoriaId: selectedCategoria,
    };

    try {
      const response = await fetch(urlDespesas, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados.");
      }

      const newData = await response.json();
      setDespesas([...despesas, newData]);
      limparCampos();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "nome":
        setNomeDespesa(value);
        break;
      case "valor":
        setValorDespesa(value);
        break;
      case "dataDespesa":
        setDataDespesa(value);
        break;
      case "categoria":
        setSelectedCategoria(value);
        break;
      default:
        break;
    }
  };

  return (
    <Form className="d-flex justify-content-center" onSubmit={handleSubmit}>
      <div className="drv">
        <Row className="g-5 mb-3">
          <Col className="col-6">
            <FloatingLabel
              controlId="floatingInputGrid"
              label="Despesa com ..."
            >
              <Form.Control
                type="text"
                name="nome"
                placeholder=""
                onChange={handleChange}
                value={nomeDespesa}
              />
            </FloatingLabel>
          </Col>
          <Col className="col-6">
            <FloatingLabel controlId="floatingSelectGrid" label="Categoria">
              <Form.Select
                name="categoria"
                onChange={handleChange}
                value={selectedCategoria}
              >
                <option value="">Selecione</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-5 d-flex justify-content-start mb-3">
          <Col className="col-6">
            <FloatingLabel controlId="floatingInputGrid" label="Data">
              <Form.Control
                type="date"
                name="dataDespesa"
                onChange={handleChange}
                value={dataDespesa}
              />
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
                onChange={handleChange}
                value={valorDespesa}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Button variant="danger" type="submit">
          {isLoading ? "Adicionando..." : "Adicionar despesa"}
        </Button>{" "}
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </Form>
  );
};

export default RegistrarDespesas;
