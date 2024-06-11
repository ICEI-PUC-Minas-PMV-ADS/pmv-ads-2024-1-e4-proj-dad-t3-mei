import { Link, useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { jwtDecode } from "jwt-decode";


const EditarProduto = () => {
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
    const buscarProduto = async () => {
      try {
        const response = await fetch(`https://swaggerapimeiamei.azurewebsites.net/api/Produtos/${id}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do produto");
        }
        const produto = await response.json();
        setNome(produto.nome);
        setUserId(produto.usuarioId);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    buscarProduto();
  }, [id]);


  const handleSalvar = async () => {
    try {
      setIsLoading(true);
      const dataToSend = {nome, usuarioId};
      const response = await fetch(`https://swaggerapimeiamei.azurewebsites.net/api/Produtos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        throw new Error("Erro ao salvar os dados do produto");
      }
    window.location.href = "/gerenciamento";
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
            <h4 className="py-3 ps-1">Editar Produto</h4>
          </Row>
          <Row className="mb-3">
            <Col>
              <input
                type="text"
                className="form-control"
                id="nomeProduto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/gerenciamento">
              <Button className="btn btn-success me-2" onClick={handleSalvar}>Salvar</Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default EditarProduto;
