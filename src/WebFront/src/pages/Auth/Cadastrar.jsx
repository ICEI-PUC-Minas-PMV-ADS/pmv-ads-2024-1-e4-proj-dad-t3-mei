import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

import "./Cadastrar.css";
import { api, requestConfig } from "../../utils/config";
import Navbar from "../../components/Navbar";

const Cadastrar = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCancelar = () => {
    navigate("/");
  };

  const limparCampos = () => {
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
    setNome("");
    setCnpj("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Para prevenir o comportamento padrão do formulário
    setLoading(true);

    const user = {
      email,
      senha,
      nome,
      cnpj,
    };

    if (senha !== confirmarSenha) {
      setError("As senhas precisam ser iguais!");
      setLoading(false);
      return;
    }

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(api + "/Usuarios", config);

      let resData;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        resData = await response.json();
      } else {
        resData = await response.text();
      }

      if (!response.ok) {
        setError(resData.message || resData || "Erro ao cadastrar usuário");
        setLoading(false);
        return;
      }

      limparCampos();
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="cadastro">
          <div className="cadastro-conteudo">
            <h1>Criar Conta</h1>
            <form className="cadastro-form" onSubmit={handleSubmit}>
              <label>Razão social</label>
              <InputText
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={loading}
                required
              />

              <label>E-mail</label>
              <InputText
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />

              <label>Senha</label>
              <Password
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                disabled={loading}
                feedback={false}
                tabIndex={1}
              />

              <label htmlFor="confirmarSenha">Confirmar senha</label>
              <Password
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                disabled={loading}
                feedback={false}
                tabIndex={1}
              />

              <label>CNPJ</label>
              <InputText
                type="text"
                placeholder="00.000.000/0000-00"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                required
                disabled={loading}
              />
              <div className="botoes-cadastrar">
                <input
                  type="button"
                  value="Cancelar"
                  onClick={handleCancelar}
                />
                {!loading && (
                  <input
                    type="submit"
                    value="Cadastrar"
                    onSubmit={handleSubmit}
                  />
                )}
                {loading && (
                  <input
                    type="submit"
                    value="Aguarde..."
                    onSubmit={handleSubmit}
                    disabled
                  />
                )}
              </div>
            </form>
            {error && <p className="msg-erro">{error}</p>}
          </div>
          <div className="cadastro-logo">
            <img src={logo} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cadastrar;
