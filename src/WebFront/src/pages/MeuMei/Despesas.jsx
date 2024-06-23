import React, { useState, useEffect, useRef } from "react";

// PrimeReact
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

// CSS
import "./Despesas.css";

// BaseUrl e config
import { api, requestConfig } from "../../utils/config";
import { useAuth } from "../../provider/authProvider";

const Despesas = ({ fetchDespesa }) => {
  // Mensagem de sucesso ao envio dos dados
  const toast = useRef(null);
  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "Sucesso!",
      detail: "Despesa adicionada.",
      life: 5000,
    });
  };

  // Vai enviar para o backend
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [dataDespesa, setDataDespesa] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("");

  // Monta o array com filter para mostrar as opções
  const [categoria, setCategoria] = useState([]);
  const [despesas, setDespesas] = useState([]);

  const { usuarioId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // busca do backend e filtra de acordo com o id do usuário
  useEffect(() => {
    if (usuarioId) {
      setLoading(true);

      fetch(api + "/Categorias")
        .then((response) => response.json())
        .then((categoriaData) => {
          setCategoria(
            categoriaData.filter((cat) => cat.usuarioId === usuarioId)
          );
          setError(null);
        })
        .catch((error) => {
          setError(`Erro ao buscar dados: ${error.message}`);
        })
        .finally(() => {
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

  // limpar campos após submit
  const limparCampos = () => {
    setNome("");
    setValor("");
    setDataDespesa("");
    setSelectedCategoria("");
  };

  // mandar formulário para o backend
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    // Validar os dados antes de enviar
    if (!nome || !valor || !dataDespesa) {
      setError("Preencha os campos com *.");
      setLoading(false);
      return;
    }

    const des = {
      usuarioId,
      nome,
      valor,
      dataDespesa,
      categoriasId: [selectedCategoria],
    };

    const config = requestConfig("POST", des);
    try {
      const res = await fetch(api + "/Despesas", config);

      if (!res.ok) {
        const errorData = await res.json();
        setError(`Erro no envio: ${errorData.message || res.statusText}`);
      } else {
        const newData = await res.json();
        setDespesas([...despesas, newData]);
        // Mostrar mensagem de sucesso
        show();
        // Limpar campos
        limparCampos();
        // Limpa os erros
        setError("");
        // Atualizar a lista de faturamentos
        await fetchDespesa();
      }
    } catch (error) {
      setError(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="despesas">
      <h1 className="titulo-h1-meumei">Registre uma despesa</h1>
      <Toast ref={toast} position="bottom-right" />
      {error && <p className="erro-msg">{error}</p>}
      <div className="despesas-conteudo">
        <InputText
          value={nome}
          placeholder="Despesa com...*"
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
          value={dataDespesa}
          onChange={(e) => setDataDespesa(e.value)}
          showIcon
          showOnFocus={false}
          locale="pt-BR"
          placeholder="Data*"
          mask="99/99/9999"
        />
        <Dropdown
          value={selectedCategoria}
          onChange={(e) => setSelectedCategoria(e.value)}
          options={categoria.map((categoria) => ({
            name: categoria.nome,
            value: categoria.id,
          }))}
          optionLabel="name"
          placeholder="Selecione a categoria"
          className="w-full md:w-14rem"
          emptyMessage="Sem categorias cadastradas"
        />
        <button
          className="btn-despesa"
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Adicionando..." : "Adicionar despesa"}
        </button>
      </div>
    </div>
  );
};

export default Despesas;
