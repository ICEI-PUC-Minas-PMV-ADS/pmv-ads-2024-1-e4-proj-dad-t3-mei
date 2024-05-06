import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { jwtDecode } from "jwt-decode";

const url = "https://localhost:7097/api/Produtos";

const RegistrarProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [usuarioId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.nameid);
  }, []);

  useEffect(() => {
    if (usuarioId) {
      setIsLoading(true);
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao buscar os dados");
          }
          return response.json();
        })
        .then((data) => {
          setProdutos(
            data.filter((produto) => produto.usuarioId === usuarioId)
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome.trim()) {
      setError("O campo 'Produto' não pode estar vazio.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const dataToSend = {
      nome,
      usuarioId,
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
      setProdutos([...produtos, newData]);
      setNome("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExcluir = async (produtoId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/${produtoId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir o produto");
      }

      setProdutos(produtos.filter((produto) => produto.id !== produtoId));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <Row className="g-2">
          <Col md>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel
                className="drv"
                controlId="floatingInputGrid"
                label="Produto"
              >
                <Form.Control
                  type="text"
                  placeholder=""
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </FloatingLabel>
              <Button
                type="submit"
                variant="btn btn-criar mt-3 ms-1"
                disabled={isLoading}
              >
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>{" "}
            </Form>
            {error && <p className="text-danger mt-2">{error}</p>}
          </Col>
          <Col md></Col>
        </Row>

        <Row className="g-2 mt-2">
          <Col className="col-6">
            <ListGroup as="ol" numbered>
              {isLoading && <p>Carregando...</p>}
              {produtos.map((produto) => (
                <ListGroup.Item className="" as="li" key={produto.id}>
                  {produto.nome}
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-success me-2">Editar</button>
                    <button
                      onClick={() => handleExcluir(produto.id)}
                      className="btn btn-danger"
                    >
                      Excluir
                    </button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col className="col-6"> </Col>
        </Row>
      </div>
    </>
  );
};

export default RegistrarProdutos;