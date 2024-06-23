import { useEffect, useRef, useState } from "react";

import "./MeuMei.css";
import { ProgressBar } from "primereact/progressbar";
import ganho from "../../assets/ganho.png";
import despesas from "../../assets/despesas.png";

// Mensagens do mei
import { Messages } from "primereact/messages";
import Vendas from "./Vendas";

// Tab
import { TabView, TabPanel } from "primereact/tabview";
import { Skeleton } from "primereact/skeleton";
import Despesas from "./Despesas";
import GraficoVendas from "./GraficoVendas";

import { api } from "../../utils/config";
import { useAuth } from "../../provider/authProvider";

import { RadioButton } from "primereact/radiobutton";

const MeuMei = () => {
  const msgs = useRef(null);
  const [msgContent, setMsgContent] = useState("");
  const [msgSeverity, setMsgSeverity] = useState("");
  const [valorProgresso, setValorProgresso] = useState(0);
  const [corProgresso, setCorProgresso] = useState("");

  const [totalFaturamentos, setTotalFaturamentos] = useState("");
  const [totalDespesas, setTotalDespesas] = useState("");

  const { usuarioId } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [tipoMei, setTipoMei] = useState(1);

  let meiValor;
  tipoMei === 1 ? (meiValor = "R$81.000") : (meiValor = "R$251.600");

  // Atualizar saldo faturamento
  const fetchFaturamento = async () => {
    setLoading(true);
    fetch(api + "/Faturamentos")
      .then((response) => response.json())
      .then((faturamentosData) => {
        const fatFiltrado = faturamentosData.filter(
          (fat) => fat.usuarioId === usuarioId
        );
        const totalFat = fatFiltrado.reduce((acc, cur) => acc + cur.valor, 0);
        const valorFatFinal = Number(((totalFat / 81000) * 100).toFixed(1));

        setValorProgresso(valorFatFinal);
        setTotalFaturamentos(totalFat);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Erro ao buscar dados: ${error.message}`);
        setLoading(false);
      });
  };

  // Atualizar saldo despesa
  const fetchDespesa = async () => {
    setLoading(true);
    fetch(api + "/Despesas")
      .then((response) => response.json())
      .then((despesasData) => {
        const desFiltrado = despesasData.filter(
          (des) => des.usuarioId === usuarioId
        );
        const totalDes = desFiltrado.reduce((acc, cur) => acc + cur.valor, 0);
        setTotalDespesas(totalDes);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Erro ao buscar dados: ${error.message}`);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    if (usuarioId) {
      Promise.all([
        fetch(api + "/Faturamentos").then((response) => response.json()),
        fetch(api + "/Despesas").then((response) => response.json()),
      ])
        .then(([faturamentosData, despesasData]) => {
          const desFiltrado = despesasData.filter(
            (des) => des.usuarioId === usuarioId
          );
          const totalDes = desFiltrado.reduce((acc, cur) => acc + cur.valor, 0);
          setTotalDespesas(totalDes);

          const fatFiltrado = faturamentosData.filter(
            (fat) => fat.usuarioId === usuarioId
          );
          const totalFat = fatFiltrado.reduce((acc, cur) => acc + cur.valor, 0);
          const valorFatFinal = Number(((totalFat / 81000) * 100).toFixed(1));

          setValorProgresso(valorFatFinal);
          setTotalFaturamentos(totalFat);

          setLoading(false);
        })
        .catch((error) => {
          setError("Erro ao buscar dados:", error);
          setLoading(false);
        });
    }
  }, [usuarioId]);

  useEffect(() => {
    if (valorProgresso >= 100) {
      setCorProgresso("black");
      setMsgSeverity("contrast");
      setMsgContent("⚠️ PROCURE URGENTE UM CONTADOR!");
    } else if (valorProgresso >= 80) {
      setCorProgresso("red");
      setMsgSeverity("error");
      setMsgContent("Cuidado! Limite prestes a estourar!");
    } else if (valorProgresso >= 50) {
      setCorProgresso("#f8b248");
      setMsgSeverity("warn");
      setMsgContent("Hmm, seu limite já passou da metade!");
    } else if (valorProgresso > 1) {
      setCorProgresso("green");
      setMsgSeverity("success");
      setMsgContent("Tudo tranquilo com seu limite!");
    } else {
      setCorProgresso("blue");
      setMsgSeverity("info");
      setMsgContent("Vamos vender para aumentar essa barrinha!");
    }
    if (msgs.current) {
      msgs.current.clear();
      msgs.current.show({
        id: "1",
        sticky: true,
        severity: msgSeverity,
        detail: msgContent,
        closable: false,
      });
    }
  }, [msgs, valorProgresso, msgSeverity, msgContent]);

  return (
    <div className="container info-meumei-botao">
      <div className="meumei-conteudo">
        {loading && (
          <Skeleton width="max-content" height="max-content">
            <p style={{ padding: "5px 20px" }}>Carregando dados, aguarde...</p>
          </Skeleton>
        )}
        {error && (
          <div>
            <Skeleton width="max-content" height="max-content">
              <p style={{ padding: "5px 20px" }}>{error}</p>
            </Skeleton>
          </div>
        )}
        <div className="meumei-faturamento-despesa">
          <div className="meumei-painel">
            <h1>Seu Faturamento</h1>
            <div className="meumei-painel-img">
              <img className="ganho-img" src={ganho} alt="" />
              <p>2024</p>
            </div>

            <span className="meumei-saldo-fat">
              R$ {totalFaturamentos.toLocaleString("pt-BR")}
            </span>
          </div>
          <div className="meumei-painel">
            <h1>Sua Despesa</h1>
            <div className="meumei-painel-img">
              <img className="ganho-img" src={despesas} alt="" />
              <p>2024</p>
            </div>
            <span className="meumei-saldo-des">
              R$ {totalDespesas.toLocaleString("pt-BR")}
            </span>
          </div>
        </div>
        <div className="limite-mei">
          <h1>
            Seu limite MEI <span id="meivalorbase">{meiValor} ao ano</span>
          </h1>
          <Messages ref={msgs} />
        </div>
        <div className="barra-de-progresso">
          <ProgressBar
            value={valorProgresso}
            color={corProgresso}
          ></ProgressBar>
        </div>

        <div className="meumei-tab">
          <TabView>
            <TabPanel header="Vendas">
              <Vendas fetchFaturamento={fetchFaturamento} />
            </TabPanel>
            <TabPanel header="Despesas">
              <Despesas fetchDespesa={fetchDespesa} />
            </TabPanel>
          </TabView>
        </div>
        <GraficoVendas />
      </div>
    </div>
  );
};

export default MeuMei;
