import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { jwtDecode } from "jwt-decode";
import { api } from "../../utils/config";
import { Dialog } from "primereact/dialog";
import { Skeleton } from "primereact/skeleton";

import "./Perfil.css";

import { useAuth } from "../../provider/authProvider";

const Perfil = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");

  const [usuario, setUsuario] = useState(null);

  const { usuarioId, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dialogVisible, setDialogVisible] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        if (usuarioId) {
          const response = await fetch(`${api}/Usuarios/${usuarioId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUsuario(data);
            setNome(data.nome);
            setEmail(data.email);
            setCnpj(data.cnpj);
            setLoading(false);
          } else {
            setError(
              "Erro ao recuperar os dados do usuário:",
              response.statusText
            );
          }
        } else {
          setError("Erro: userId está indefinido");
        }
      } catch (error) {
        setError("Erro ao decodificar o token ou ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [usuarioId, token]);

  const formatCnpj = (cnpj) => {
    const cleanedCnpj = cnpj.replace(/\D/g, "");

    // Formata o CNPJ conforme o padrão XX.XXX.XXX/XXXX-XX
    const formattedCnpj = cleanedCnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );

    return formattedCnpj;
  };

  const handleEdit = (field) => {
    setFieldToEdit(field);
    setNewValue(usuario[field.toLowerCase()]);
    setDialogVisible(true);
  };

  const handleConfirm = async () => {
    const updatedUser = { ...usuario, [fieldToEdit.toLowerCase()]: newValue };
    setLoading(true);
    try {
      const response = await fetch(`${api}/Usuarios/${usuarioId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedData = await response.json().catch(() => null);
        if (updatedData) {
          setUsuario(updatedData);
          if (fieldToEdit.toLowerCase() === "nome") {
            setNome(updatedData.nome);
          } else if (fieldToEdit.toLowerCase() === "email") {
            setEmail(updatedData.email);
          } else if (fieldToEdit.toLowerCase() === "cnpj") {
            setCnpj(updatedData.cnpj);
          }
        } else {
          setUsuario(updatedUser);
          if (fieldToEdit.toLowerCase() === "nome") {
            setNome(updatedUser.nome);
          } else if (fieldToEdit.toLowerCase() === "email") {
            setEmail(updatedUser.email);
          } else if (fieldToEdit.toLowerCase() === "cnpj") {
            setCnpj(updatedUser.cnpj);
          }
        }
        setDialogVisible(false);
      } else {
        setError(
          `Erro ao atualizar o usuário: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      setError("Erro ao atualizar o usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="perfil-conteudo">
        <h1>Seus dados:</h1>
        {loading && (
          <Skeleton width="max-content" height="max-content">
            <p style={{ padding: "5px 20px" }}>Carregando dados, aguarde...</p>
          </Skeleton>
        )}
        <div>
          <div className="perfil-dados">
            <div className="perfil-dados-item">
              <h2>Nome</h2>
              <span>{nome}</span>
            </div>
            <div className="perfil-dados-btn">
              <Button
                icon="pi pi-pencil"
                rounded
                outlined
                className="botoes-tabela-edit"
                onClick={() => handleEdit("Nome")}
              />
            </div>
          </div>
          <div className="perfil-dados">
            <div className="perfil-dados-item">
              <h2>E-mail</h2>
              <span>{email}</span>
            </div>
            <div className="perfil-dados-btn">
              <Button
                icon="pi pi-pencil"
                rounded
                outlined
                className="botoes-tabela-edit"
                onClick={() => handleEdit("Email")}
              />
            </div>
          </div>
          <div className="perfil-dados">
            <div className="perfil-dados-item">
              <h2>CNPJ</h2>
              <span>{formatCnpj(cnpj)}</span>
            </div>
            <div className="perfil-dados-btn">
              <Button
                icon="pi pi-pencil"
                rounded
                outlined
                className="botoes-tabela-edit"
                onClick={() => handleEdit("Cnpj")}
              />
            </div>
          </div>
        </div>
      </div>
      <Dialog
        visible={dialogVisible}
        style={{ width: "450px" }}
        onHide={() => setDialogVisible(false)}
        header={`Editar ${fieldToEdit}`}
        modal
        footer={
          <div>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => setDialogVisible(false)}
              className="p-button-text"
            />
            <Button
              label="Salvar"
              icon="pi pi-check"
              onClick={handleConfirm}
              disabled={loading}
            />
          </div>
        }
      >
        <div className="dialog-content">
          {error && <p className="error">{error}</p>}
          <div className="dialog-field">
            <label htmlFor="editField">{fieldToEdit}</label>
            <input
              id="editField"
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Perfil;
