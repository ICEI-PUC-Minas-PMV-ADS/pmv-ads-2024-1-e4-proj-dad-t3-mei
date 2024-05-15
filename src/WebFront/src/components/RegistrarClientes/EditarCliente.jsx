import { Link, useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { jwtDecode } from "jwt-decode";


const EditarCliente = () => {
  const {id} = useParams();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataDeNascimento, setDataDeNascimento] = useState("");
  const [usuarioId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.nameid);
  }, []);

  useEffect(() => {
    const buscarCliente = async () => {
      try {
        const response = await fetch(`https://localhost:7097/api/Clientes/${id}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do cliente");
        }
        const cliente = await response.json();
        setNome(cliente.nome);
        setEmail(cliente.email);
        setTelefone(cliente.telefone);
        setDataDeNascimento(cliente.dataDeNascimento);
        setUserId(cliente.usuarioId);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    buscarCliente();
  }, [id]);


  const handleSalvar = async () => {
    try {
      setIsLoading(true);
      const dataToSend = {nome,email, telefone, dataDeNascimento, usuarioId};
      const response = await fetch(`https://localhost:7097/api/Clientes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        throw new Error("Erro ao salvar os dados do cliente");
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
                id="nomeCliente"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                id="emailCliente"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                id="telefoneCliente"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                id="dataDeNascimentoCliente"
                value={dataDeNascimento}
                onChange={(e) => setDataDeNascimento(e.target.value)}
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

export default EditarCliente;
