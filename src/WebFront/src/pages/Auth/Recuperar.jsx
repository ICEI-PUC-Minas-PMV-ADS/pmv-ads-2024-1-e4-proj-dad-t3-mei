import React from "react";
import logo from "../../assets/logo.svg";
import "./Recuperar.css";
import Navbar from "../../components/Navbar";

const Recuperar = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="recuperar">
          <div className="recuperar-conteudo">
            <h1>Recuperação de Conta</h1>
            <p>Digite seu e-mail para recuperar a senha:</p>
            <form className="recuperar-form" onSubmit={handleSubmit}>
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" name="email" required />
              <div className="botoes-recuperar">
                <input
                  type="submit"
                  value="Recuperar"
                  onSubmit={handleSubmit}
                />
              </div>
            </form>
            <p>
              Caso seja um e-mail válido em nossa base de dados, em breve você
              receberá um e-mail com a nova senha!
            </p>
          </div>
          <div className="recuperar-logo">
            <img src={logo} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Recuperar;
