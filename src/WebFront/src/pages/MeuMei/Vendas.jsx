import React, { useState, useEffect, useRef } from "react";

// PrimeReact
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

// CSS
import "./Vendas.css";

// BaseUrl e config
import { api } from "../../utils/config";
import { useAuth } from "../../provider/authProvider";

const Vendas = ({ fetchFaturamento }) => {
  // Mensagem de sucesso ao envio dos dados
  const toast = useRef(null);
  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "Sucesso!",
      detail: "Venda adicionada.",
      life: 5000,
    });
  };

  // Vai enviar para o backend
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [dataFaturamento, setDataFaturamento] = useState("");
  const [meioDePagamento, setMeioDePagamento] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedService, setSelectedService] = useState("");

  // Monta o array com filter para mostrar as opções
  const [servicos, setServicos] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const { usuarioId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // busca do backend e filtra de acordo com o id do usuário
  useEffect(() => {
    if (usuarioId) {
      setLoading(true);
      Promise.all([
        fetch(api + "/Servicos").then((response) => response.json()),
        fetch(api + "/Produtos").then((response) => response.json()),
      ])
        .then(([servicosData, produtosData]) => {
          const produtosFiltrados = produtosData.filter(
            (produto) => produto.usuarioId === usuarioId
          );
          const servicosFiltrados = servicosData.filter(
            (servico) => servico.usuarioId === usuarioId
          );

          setProdutos(produtosFiltrados);
          setServicos(servicosFiltrados);
          setError(null);
          setLoading(false);
        })
        .catch((error) => {
          setError(`Erro ao buscar dados: ${error.message}`);
          setLoading(false);
        });
    }
  }, [usuarioId]);

  // Adicionar local (pt-BR) ao Datapicker
  addLocale("pt-BR", {
    dateFormat: "dd/mm/yy",
    dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    showMonthAfterYear: false,
    today: "Hoje",
  });

  // Opções do botão meio de pagamento
  const meioDePagamentoOptions = [
    { name: "Dinheiro", value: "Dinheiro" },
    { name: "Cartao", value: "Cartao" },
    { name: "PIX", value: "PIX" },
    { name: "Outro", value: "Outro" },
  ];

  // limpar campos após submit
  const limparCampos = () => {
    setNome("");
    setValor("");
    setDataFaturamento("");
    setMeioDePagamento("");
    setSelectedProduct("");
    setSelectedService("");
  };

  // mandar formulário para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validar os dados antes de enviar
    if (!meioDePagamento || !nome || !valor || !dataFaturamento) {
      setError("Preencha os campos com *.");
      setLoading(false);
      return;
    }

    const fat = {
      usuarioId,
      nome,
      valor,
      dataFaturamento,
      meioDePagamento,
      produtosId: [selectedProduct],
      servicosId: [selectedService],
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fat),
    };

    try {
      const res = await fetch(`${api}/Faturamentos`, config);

      if (!res.ok) {
        const errorData = await res.json();
        setError(`Erro no envio: ${errorData.message || res.statusText}`);
      } else {
        // Mostrar mensagem de sucesso
        show();
        // Limpar campos
        limparCampos();
        // Limpa os erros
        setError("");
        // Atualizar a lista de faturamentos
        await fetchFaturamento();
      }
    } catch (error) {
      setError(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="vendas">
      <h1 className="titulo-h1-meumei">Registre uma venda</h1>
      <Toast ref={toast} position="bottom-right" />
      {error && <p className="erro-msg">{error}</p>}
      <div className="vendas-conteudo">
        <InputText
          value={nome}
          placeholder="Venda de...*"
          onChange={(e) => setNome(e.target.value)}
        />
        <InputNumber
          value={valor}
          placeholder="R$*"
          onValueChange={(e) => setValor(e.value)}
          locale="pt-BR"
          minFractionDigits={2}
        />
        <Calendar
          value={dataFaturamento}
          onChange={(e) => setDataFaturamento(e.value)}
          showIcon
          showOnFocus={false}
          locale="pt-BR"
          placeholder="Data*"
          mask="99/99/9999"
        />
        <Dropdown
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.value)}
          options={produtos.map((produto) => ({
            name: produto.nome,
            value: produto.id,
          }))}
          optionLabel="name"
          placeholder="Selecione o produto"
          className="w-full md:w-14rem"
          emptyMessage="Sem produtos cadastrados"
        />
        <Dropdown
          value={selectedService}
          onChange={(e) => setSelectedService(e.value)}
          options={servicos.map((servico) => ({
            name: servico.nome,
            value: servico.id,
          }))}
          optionLabel="name"
          placeholder="Selecione o serviço"
          className="w-full md:w-14rem"
          emptyMessage="Sem serviços cadastrados"
        />
        <Dropdown
          value={meioDePagamento}
          onChange={(e) => setMeioDePagamento(e.value)}
          options={meioDePagamentoOptions}
          placeholder="Meio de pagamento*"
          optionValue="name"
          optionLabel="name"
          className="w-full md:w-14rem"
          required={true}
        />
        <button
          className="btn-venda"
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Adicionando..." : "Adicionar venda"}
        </button>
      </div>
    </div>
  );
};

export default Vendas;
