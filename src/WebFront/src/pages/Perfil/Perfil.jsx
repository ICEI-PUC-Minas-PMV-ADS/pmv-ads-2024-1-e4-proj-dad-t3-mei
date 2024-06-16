import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { api } from "../../utils/config";
import { Dialog } from "primereact/dialog";
import { Skeleton } from "primereact/skeleton";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from "primereact/message";

import "./Perfil.css";

import { useAuth } from "../../provider/authProvider";

const Perfil = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");

  const { usuarioId, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dialogNome, setDialogNome] = useState(false);
  const [dialogEmail, setDialogEmail] = useState(false);
  const [dialogCnpj, setDialogCnpj] = useState(false);
  const [dialogSenha, setDialogSenha] = useState(false);
  const [msg, setMsg] = useState(false);

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
            setNome(data.nome);
            setEmail(data.email);
            setCnpj(data.cnpj);
            setLoading(false);
          } else if (response.status === 404) {
            setError("Usuário não encontrado.");
          } else if (response.status === 401) {
            setError("Não autorizado. Faça login novamente.");
          } else {
            const errorMessage = await response.text();
            setError(`Erro ao recuperar os dados do usuário: ${errorMessage}`);
          }
        } else {
          setError("Erro: userId está indefinido");
        }
      } catch (error) {
        setError(
          "Erro ao decodificar o token ou ao buscar os dados do usuário."
        );
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

  const handleEditNome = () => {
    setError("");
    setDialogNome(true);
  };

  const handleEditEmail = () => {
    setError("");
    setDialogEmail(true);
  };

  const handleEditCnpj = () => {
    setError("");
    setDialogCnpj(true);
  };

  const handleEditSenha = () => {
    setError("");
    setDialogSenha(true);
  };

  const handleConfirmNome = async () => {
    setError("");
    setLoading(true);

    const updatedUser = {
      nome: nome,
    };

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
        setDialogNome(false);
        setMsg(true);
      } else {
        setError(
          `Erro ao atualizar o nome do usuário: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      setError("Erro ao atualizar o usuário.");
    } finally {
      setLoading(false);
    }
  };
  const handleConfirmEmail = async () => {
    setError("");
    setLoading(true);
    const updatedInfo = { email: email };
    try {
      const response = await fetch(`${api}/Usuarios/${usuarioId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInfo),
      });

      if (response.ok) {
        setDialogEmail(false);
      } else {
        setError("Já existe uma conta vinculada a este e-mail, utilize outro");
      }
    } catch (error) {
      setError("Erro ao atualizar o usuário.");
    } finally {
      setLoading(false);
    }
  };
  const handleConfirmCnpj = async () => {
    setError("");
    setLoading(true);
    const updatedInfo = { cnpj: cnpj };
    try {
      const response = await fetch(`${api}/Usuarios/${usuarioId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInfo),
      });

      if (response.ok) {
        setDialogCnpj(false);
      } else {
        setError(
          `Erro ao atualizar o cnpj do usuário: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      setError("Erro ao atualizar o usuário.");
    } finally {
      setLoading(false);
    }
  };
  const handleConfirmSenha = async () => {
    setError("");
    setLoading(true);
    const updatedInfo = { senha: senha };
    try {
      const response = await fetch(`${api}/Usuarios/${usuarioId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInfo),
      });

      if (response.ok) {
        setDialogSenha(false);
      } else {
        setError(
          `Erro ao atualizar a senha do usuário: ${response.status} ${response.statusText}`
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
                onClick={() => handleEditNome()}
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
                onClick={() => handleEditEmail()}
                disabled={loading}
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
                onClick={() => handleEditCnpj()}
                disabled={loading}
              />
            </div>
          </div>
          <div className="perfil-dados">
            <div className="perfil-dados-item">
              <h2>Senha</h2>
            </div>
            <div className="perfil-dados-btn">
              <Button
                icon="pi pi-pencil"
                rounded
                outlined
                className="botoes-tabela-edit"
                onClick={() => handleEditSenha()}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Alterar nome */}
      <Dialog
        visible={dialogNome}
        style={{ width: "450px" }}
        onHide={() => setDialogNome(false)}
        header="Editar nome"
        modal
        footer={
          <div>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => setDialogNome(false)}
              className="p-button-text"
              disabled={loading}
            />
            <Button
              label="Salvar"
              icon="pi pi-check"
              onClick={handleConfirmNome}
              disabled={loading}
            />
          </div>
        }
      >
        <div className="dialog-content">
          {error && <p className="error">{error}</p>}
          <div className="dialog-field">
            <InputText
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              type="text"
            />
          </div>
        </div>
      </Dialog>

      {/* Alterar email */}
      <Dialog
        visible={dialogEmail}
        style={{ width: "450px" }}
        onHide={() => setDialogEmail(false)}
        header="Editar e-mail"
        modal
        footer={
          <div>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => setDialogEmail(false)}
              className="p-button-text"
              disabled={loading}
            />
            <Button
              label="Salvar"
              icon="pi pi-check"
              onClick={handleConfirmEmail}
              disabled={loading}
            />
          </div>
        }
      >
        <div className="dialog-content">
          {error && <p className="error">{error}</p>}
          <div className="dialog-field">
            <InputText
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
        </div>
      </Dialog>

      {/* Alterar cnpj */}
      <Dialog
        visible={dialogCnpj}
        style={{ width: "450px" }}
        onHide={() => setDialogCnpj(false)}
        header="Editar CNPJ"
        modal
        footer={
          <div>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => setDialogCnpj(false)}
              className="p-button-text"
              disabled={loading}
            />
            <Button
              label="Salvar"
              icon="pi pi-check"
              onClick={handleConfirmCnpj}
              disabled={loading}
            />
          </div>
        }
      >
        <div className="dialog-content">
          {error && <p className="error">{error}</p>}
          <div className="dialog-field">
            <InputText
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              type="text"
            />
          </div>
        </div>
      </Dialog>

      {/* Alterar senha */}
      <Dialog
        visible={dialogSenha}
        style={{ width: "450px" }}
        onHide={() => setDialogSenha(false)}
        header="Digite uma nova senha"
        modal
        footer={
          <div>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => setDialogSenha(false)}
              className="p-button-text"
              disabled={loading}
            />
            <Button
              label="Salvar"
              icon="pi pi-check"
              onClick={handleConfirmSenha}
              disabled={loading}
            />
          </div>
        }
      >
        <div className="dialog-content">
          {error && <p className="error">{error}</p>}
          <div className="dialog-field">
            <Password
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              feedback={false}
              tabIndex={1}
            />
          </div>
        </div>
      </Dialog>
      <div className="perfil-msg">
        {msg && <Message severity="success" text="Atualizado com sucesso" />}
      </div>
    </div>
  );
};

export default Perfil;
