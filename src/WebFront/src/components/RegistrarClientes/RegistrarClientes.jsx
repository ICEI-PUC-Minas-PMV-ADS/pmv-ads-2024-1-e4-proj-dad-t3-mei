import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { jwtDecode } from "jwt-decode";

const url = "https://swaggerapimeiamei.azurewebsites.net/api/Clientes";

const RegistrarClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataDeNascimento, setDataDeNascimento] = useState("");
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
          setClientes(
            data.filter((cliente) => cliente.usuarioId === usuarioId)
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
    setEmail("");
    setTelefone("");
    setDataDeNascimento("");
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
      email,
      telefone,
      dataDeNascimento,
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
      setClientes([...clientes, newData]);
      limparCampos();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExcluir = async (clienteId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/${clienteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir o cliente");
      }

      setClientes(clientes.filter((cliente) => cliente.id !== clienteId));
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
                label="Nome"
              >
                <Form.Control
                  type="text"
                  placeholder=""
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                className="drv"
                controlId="floatingInputGrid"
                label="E-mail"
              >
                <Form.Control
                  type="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                className="drv"
                controlId="floatingInputGrid"
                label="Telefone"
              >
                <Form.Control
                  type="tel"
                  placeholder=""
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                className="drv"
                controlId="floatingInputGrid"
                label="Data de Nascimento"
              >
                <Form.Control
                  type="date"
                  placeholder=""
                  value={dataDeNascimento}
                  onChange={(e) => setDataDeNascimento(e.target.value)}
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
          <Col className="col-12">
            {isLoading ? (
              <p>Carregando...</p>
            ) : (
              <Table striped bordered hover responsive size="sm">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Data de Nascimento</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <td>{cliente.nome}</td>
                      <td>{cliente.email}</td>
                      <td>{cliente.telefone}</td>
                      <td>{cliente.dataDeNascimento}</td>
                      <td>
                      <Link to={`/editarCliente/${cliente.id}`}
                      className="btn btn-success me-2">
                      Editar
                      </Link>
                        <Button
                          className="btn btn-danger"
                          onClick={() => handleExcluir(cliente.id)}
                        >
                          Excluir
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
          <Col className="col-6"> </Col>
        </Row>
      </div>
    </>
  );
};

export default RegistrarClientes;