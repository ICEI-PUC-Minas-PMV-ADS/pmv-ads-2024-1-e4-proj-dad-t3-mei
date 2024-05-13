import { Link, useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { jwtDecode } from "jwt-decode";


const EditarServico = () => {
  const {id} = useParams();
  const [nome, setNome] = useState('');
  const [usuarioId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.nameid);
  }, []);

  useEffect(() => {
    const buscarServico = async () => {
      try {
        const response = await fetch(`https://localhost:7097/api/Servicos/${id}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do serviço");
        }
        const servico = await response.json();
        setNome(servico.nome);
        setUserId(servico.usuarioId);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    buscarServico();
  }, [id]);


  const handleSalvar = async () => {
    try {
      setIsLoading(true);
      const dataToSend = {nome, usuarioId};
      const response = await fetch(`https://localhost:7097/api/Servicos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        throw new Error("Erro ao salvar os dados do serviço");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (

    <Container fluid className="w-75 mt-3 bg-light">
      <Row>
        <Col className="border border-warning p-3 m-3 box">
          <Row>
            <Link to="/gerenciamento">
            <Button variant="btn btn-criar mt-3 ms-1">Voltar</Button>
            </Link>
            <h4 className="py-3 ps-1">Editar Serviço</h4>
          </Row>
          <Row className="mb-3">
            <Col>
              <input
                type="text"
                className="form-control"
                id="nomeServico"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className="btn btn-success me-2" onClick={handleSalvar}>Salvar</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default EditarServico;