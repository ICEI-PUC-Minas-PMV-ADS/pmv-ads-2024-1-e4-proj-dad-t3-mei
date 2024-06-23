import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
import { api } from "../../utils/config";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import Navbar from "../../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setToken } = useAuth();

  const navigate = useNavigate();

  const handleRecuperar = () => {
    navigate("/recuperar");
  };

  const handleSubmit = async (event) => {
    setError("");
    setLoading(true);
    event.preventDefault();

    const user = {
      email,
      senha,
    };

    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      const response = await fetch(`${api}/Usuarios/authenticate`, config);

      if (!response.ok) {
        const errorData = await response.json();

        if (errorData.status === 401) {
          setError("Verifique o e-mail e a senha");
          setLoading(false);
          return;
        }
        setError(errorData.message || "Erro ao fazer login");
        setLoading(false);
        return;
      }

      const data = await response.json();
      const token = data.jwtToken;

      if (token) {
        setToken(token);
        navigate("/meumei", { replace: true });
      } else {
        throw new Error("Token não encontrado");
      }
    } catch (error) {
      setError("Erro ao fazer login");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="login">
          <div className="login-conteudo">
            <h1>Faça seu login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <div>
                <label>E-mail</label>
                <InputText
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label>Senha</label>
                <Password
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  disabled={loading}
                  feedback={false}
                  toggleMask
                />
              </div>

              <div className="botoes-login">
                {!loading && (
                  <input type="submit" value="Entrar" onSubmit={handleSubmit} />
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
            <Link
              className="esqueceu-senha"
              to={"/recuperar"}
              onClick={handleRecuperar}
            >
              Esqueceu a senha?
            </Link>
            {error && <p className="msg-erro">{error}</p>}
          </div>

          <div className="login-logo">
            <h3>Ainda não é cliente e deseja conhecer o MEI A MEI?</h3>
            <div className="fale-conosco-container">
              <Link to={"/#faleconosco"}>Fale conosco!</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
