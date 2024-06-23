import React from "react";
import "./Home.css";
import logo from "../../assets/logo.svg";
import gerenciamento from "../../assets/gerenciamento.png";
import acompanhe from "../../assets/acompanhe.png";
import multiplataforma from "../../assets/multiplataforma.png";
import whatsapp from "../../assets/whatsapp.png";
import email from "../../assets/e-mail.png";
import endereco from "../../assets/endereco.png";
import google from "../../assets/googleplay.png";
import apphome from "../../assets/apphome.svg";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <section className="home-conteudo-principal">
          <h1>
            Organize seu negócio<span>!</span>
          </h1>
          <div className="logo">
            <img src={apphome} alt="" />
          </div>
          <div className="registre-gerencie">
            <p>Registre e gerencie tudo com mais facilidade!</p>
            <ul>
              <li>Sistema Financeiro simples e seguro.</li>
              <li>Automatize as rotinas financeiras do seu MEI</li>
              <li>Tenha suas informações organizadas.</li>
              <li>Cadastre seus clientes.</li>
              <li>Produtos e serviços de cadastrar.</li>
              <li>Relatório anual e mensal.</li>
            </ul>
          </div>
        </section>
        <section>
          <h2 id="funcionalidades">Funcionalidades</h2>
          <div className="funcionalidades-container">
            <div className="funcionalidades-item item1">
              <img src={gerenciamento} alt="" />
              <h2>Gerenciamento Financeiro</h2>
              <p>
                Registre e gerencie todas as suas transações financeiras de
                forma fácil e intuitiva.
              </p>
            </div>

            <div className="funcionalidades-item item2">
              <img src={multiplataforma} alt="" />
              <h2>Multiplataforma</h2>
              <p>Use o sistema pelo Website ou baixe em seu smartphone!</p>
            </div>

            <div className="funcionalidades-item item3">
              <img src={acompanhe} alt="" />
              <h2>Acompanhe seus Limites</h2>
              <p>
                Acompanhe suas finanças para não ultrapassar o limite definido
                por lei para a categoria MEI.
              </p>
            </div>
          </div>
        </section>
        <section className="fale-conosco">
          <h2 id="fale-conosco">Fale Conosco</h2>
          <div className="fale-conosco-conteudo">
            <div className="contatos">
              <div className="fale-conosco-telefone">
                <img src={whatsapp} alt="" />
                <p>55 31 99999-9999</p>
              </div>
              <div className="fale-conosco-email">
                <img src={email} alt="" />
                <p>meiamei@contato.com</p>
              </div>
              <div className="fale-conosco-endereco">
                <img src={endereco} alt="" />
                <p>
                  R. Dom José Gaspar, 501 - Coração Eucarístico - Belo
                  Horizonte/MG. CEP: 30.535-901
                </p>
                <p></p>
              </div>
            </div>
            <div className="baixe-nosso-app">
              <p>Baixe nosso aplicativo</p>
              <a
                href="https://play.google.com/store/apps/details?id=com.example.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={google}
                  alt="Download na Play Store"
                  className="store-logo"
                />
              </a>
            </div>
          </div>
        </section>
        <footer className="copy">
          <p>Todos os direitos reservados &copy; a mei a mei</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
