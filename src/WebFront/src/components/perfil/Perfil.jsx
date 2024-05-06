import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Perfil.css";

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [showId, setShowId] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken && decodedToken.nameid;

    if (userId) {
      fetch(`http://localhost:7097/api/Usuarios/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUsuario(data);
        })
        .catch((error) => {
          console.error("Erro ao recuperar os dados do usuário:", error);
        });
    } else {
      console.error("Erro: userId está indefinido");
    }
  }, []);

  const handleEdit = (field) => {
    const newValue = window.prompt(
      `Editar ${field}`,
      usuario[field.toLowerCase()]
    );
    if (newValue) {
      const updatedUser = { ...usuario, [field.toLowerCase()]: newValue };
      const token = localStorage.getItem("token");
      fetch(`http://localhost:5062/api/Usuarios/${usuario.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => {
          if (response.ok) {
            setUsuario(updatedUser);
          } else {
            throw new Error("Erro ao atualizar o usuário");
          }
        })
        .catch((error) => {
          console.error("Erro ao atualizar o usuário:", error);
        });
    }
  };

  if (!usuario) {
    return <div className="d-flex justify-content-center">Carregando...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Perfil</h1>
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title className="mb-0">
              <strong>ID:</strong>{" "}
              {showId && (
                <span style={{ fontWeight: "normal" }}>{usuario.id}</span>
              )}
            </Card.Title>
            <Button
              className="eye-button"
              variant="primary"
              onClick={() => setShowId(!showId)}
            >
              {showId ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title className="mb-0">
              <strong>Nome:</strong>{" "}
              <span style={{ fontWeight: "normal" }}>{usuario.nome}</span>
            </Card.Title>
            <Button variant="primary" onClick={() => handleEdit("Nome")}>
              Editar
            </Button>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title className="mb-0">
              <strong>Email:</strong>{" "}
              <span style={{ fontWeight: "normal" }}>{usuario.email}</span>
            </Card.Title>
            <Button variant="primary" onClick={() => handleEdit("Email")}>
              Editar
            </Button>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title className="mb-0">
              <strong>CNPJ:</strong>{" "}
              <span style={{ fontWeight: "normal" }}>{usuario.cnpj}</span>
            </Card.Title>
            <Button variant="primary" onClick={() => handleEdit("CNPJ")}>
              Editar
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Perfil;
