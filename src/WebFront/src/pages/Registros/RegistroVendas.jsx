import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import { Skeleton } from "primereact/skeleton";

import { Dialog } from "primereact/dialog";
import "./Registros.css";

import { api } from "../../utils/config";
import { useAuth } from "../../provider/authProvider";

const RegistroVendas = () => {
  const [faturamentos, setFaturamentos] = useState([]);
  const [nomeEdit, setNomeEdit] = useState("");
  const [valorEdit, setValorEdit] = useState("");
  const [dataDeFaturamentoEdit, setDataDeFaturamentoEdit] = useState("");
  const [meioDePagamentoEdit, setMeioDePagamentoEdit] = useState("");
  const [produtoIdEdit, setProdutoIdEdit] = useState("");
  const [servicoIdEdit, setServicoIdEdit] = useState("");
  const [servicos, setServicos] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const { usuarioId } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFaturamento, setSelectedFaturamento] = useState(null);
  const [confirmationDialog, setConfirmationDialog] = useState(false); // Novo estado
  const [editDialog, setEditDialog] = useState(false); // Novo estado

  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);

  const meioDePagamentoOptions = [
    { name: "Dinheiro", value: "Dinheiro" },
    { name: "Cartao", value: "Cartao" },
    { name: "PIX", value: "PIX" },
    { name: "Outro", value: "Outro" },
  ];
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

  const buscaIdsProdutos = (rowData) => {
    if (!rowData || !rowData.produtosId || rowData.produtosId.length === 0) {
      return "Sem produto cadastrado";
    }

    const nomes = rowData.produtosId.map((id) => {
      const produto = produtos.find((produto) => produto.id === id);
      return produto ? produto.nome : "Sem produto cadastrado";
    });

    return nomes.join(", ");
  };

  const buscaIdsServicos = (rowData) => {
    if (!rowData || !rowData.servicosId || rowData.servicosId.length === 0) {
      return "Sem serviço cadastrado";
    }

    const nomes = rowData.servicosId.map((id) => {
      const servico = servicos.find((servico) => servico.id === id);
      return servico ? servico.nome : "Sem serviço cadastrado";
    });

    return nomes.join(", ");
  };
  const formatData = (rowData) => {
    const date = new Date(rowData.dataFaturamento);
    return `${date.toLocaleDateString("pt-BR")}`;
  };
  const formatValor = (rowData) => {
    return rowData.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const columns = [
    { field: "nome", header: "Nome" },
    { field: "valor", header: "Valor", body: formatValor },
    {
      field: "dataFaturamento",
      header: "Data de Faturamento",
      body: formatData,
    },
    { field: "meioDePagamento", header: "Meio De Pagamento" },
    { field: "produtosId", header: "Produtos", body: buscaIdsProdutos },
    { field: "servicosId", header: "Serviços", body: buscaIdsServicos },
  ];

  useEffect(() => {
    if (usuarioId) {
      setLoading(true);
      Promise.all([
        fetch(`${api}/Servicos`).then((response) => response.json()),
        fetch(`${api}/Produtos`).then((response) => response.json()),
        fetch(`${api}/Faturamentos`).then((response) => response.json()),
      ])
        .then(([servicosData, produtosData, faturamentosData]) => {
          const produtosFiltrados = produtosData.filter(
            (produto) => produto.usuarioId === usuarioId
          );
          const servicosFiltrados = servicosData.filter(
            (servico) => servico.usuarioId === usuarioId
          );
          const faturamentosFiltrados = faturamentosData.filter(
            (fat) => fat.usuarioId === usuarioId
          );
          setFaturamentos(faturamentosFiltrados);
          setProdutos(produtosFiltrados);
          setServicos(servicosFiltrados);
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

  const fetchFaturamentos = async () => {
    fetch(`${api}/Faturamentos`)
      .then((response) => response.json())
      .then((faturamentoData) => {
        setFaturamentos(
          faturamentoData.filter((fat) => fat.usuarioId === usuarioId)
        );
        setError(null);
      })
      .catch((error) => {
        setError(`Erro ao buscar dados: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleExcluir = async (faturamentoId) => {
    // Abre o diálogo de confirmação antes de excluir
    setSelectedFaturamento(faturamentoId);
    setConfirmationDialog(true);
  };
  const confirmExcluir = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${api}/Faturamentos/${selectedFaturamento}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        setError("Erro ao excluir o faturamento");
      }

      setFaturamentos(
        faturamentos.filter(
          (faturamento) => faturamento.id !== selectedFaturamento
        )
      );
      toast.current.show({
        severity: "success",
        summary: "Sucesso!",
        detail: "Faturamento excluído.",
        life: 3000,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setConfirmationDialog(false);
    }
  };
  const handleEditar = (faturamento) => {
    setNomeEdit(faturamento.nome);
    setValorEdit(faturamento.valor);
    setMeioDePagamentoEdit(faturamento.meioDePagamento);
    setDataDeFaturamentoEdit(new Date(faturamento.dataFaturamento));

    setSelectedFaturamento(faturamento.id);
    setEditDialog(true);
  };
  const handleSalvar = async () => {
    if (selectedFaturamento) {
      if (!nomeEdit.trim()) {
        setError("O campo não pode estar vazio.");
        return;
      }
      // Editar o produto existente
      setLoading(true);
      setError(null);

      const editToSend = {
        nome: nomeEdit,
        valor: valorEdit,
        dataFaturamento: dataDeFaturamentoEdit,
        meioDePagamento: meioDePagamentoEdit,
        produtosId: [produtoIdEdit],
        servicosId: [servicoIdEdit],
        usuarioId,
      };

      try {
        const response = await fetch(
          `${api}/Faturamentos/${selectedFaturamento}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editToSend),
          }
        );

        if (!response.ok) {
          setError("Erro ao editar o faturamento");
        }

        fetchFaturamentos();

        // Exibir uma mensagem de sucesso
        toast.current.show({
          severity: "success",
          summary: "Sucesso!",
          detail: "Faturamento editado.",
          life: 3000,
        });

        // Fechar o diálogo de edição
        setEditDialog(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="botoes-tabela-edit"
          onClick={() => handleEditar(rowData)}
          disabled={loading}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          className="botoes-tabela-excluir"
          severity="danger"
          onClick={() => handleExcluir(rowData.id)}
          disabled={loading}
        />
      </React.Fragment>
    );
  };
  const header = (
    <div className="d-flex">
      <h2>Vendas realizadas</h2>

      <InputText
        type="search"
        onInput={(e) => setGlobalFilter(e.target.value)}
        placeholder="Buscar..."
        className="p-inputtext-sm"
      />
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      {loading && (
        <Skeleton width="max-content" height="max-content">
          <p style={{ padding: "5px 20px" }}>Carregando dados, aguarde...</p>
        </Skeleton>
      )}
      {error && <p className="erro-msg">{error}</p>}
      <div className="card">
        <DataTable
          value={faturamentos}
          selectionMode="single"
          selection={selectedFaturamento}
          onSelectionChange={(e) => setSelectedFaturamento(e.value)}
          dataKey="id"
          paginator
          rows={5}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} de {last} dos {totalRecords} faturamentos"
          globalFilter={globalFilter}
          header={header}
          emptyMessage={loading ? "Carregando..." : "Sem vendas registradas"}
        >
          {columns.map((col, i) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              body={col.body}
            />
          ))}
          <Column
            body={actionBodyTemplate}
            headerStyle={{ width: "8rem", textAlign: "center" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
          />
        </DataTable>
      </div>

      {/* Diálogo de confirmação excluir*/}
      <Dialog
        visible={confirmationDialog}
        style={{ width: "450px" }}
        onHide={() => setConfirmationDialog(false)}
        header="Atenção!"
        modal
        footer={
          <div>
            <Button
              label="Não"
              icon="pi pi-times"
              onClick={() => setConfirmationDialog(false)}
              className="p-button-text"
              disabled={loading}
            />
            <Button
              label="Sim"
              icon="pi pi-check"
              onClick={confirmExcluir}
              disabled={loading}
            />
          </div>
        }
      >
        <div
          className="confirmation-content"
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{
              fontSize: "3rem",
              paddingRight: "15px",
              color: "red",
            }}
          />
          <span>Excluir o faturamento? Confirma?</span>
        </div>
      </Dialog>

      {/* Diálogo de confirmação de edição */}
      <Dialog
        visible={editDialog}
        style={{ width: "450px" }}
        onHide={() => setEditDialog(false)}
        header="Editar faturamento"
        modal
        footer={
          <div>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => setEditDialog(false)}
              className="p-button-text"
              disabled={loading}
            />
            <Button
              label="Editar"
              icon="pi pi-check"
              onClick={handleSalvar}
              disabled={loading}
            />
          </div>
        }
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="nameEdit" style={{ paddingTop: "10px" }}>
              Nome*
            </label>
            <InputText
              id="nameEdit"
              value={nomeEdit}
              onChange={(e) => setNomeEdit(e.target.value)}
            />
            <label htmlFor="valorEdit" style={{ paddingTop: "10px" }}>
              Valor*
            </label>
            <InputText
              id="valorEdit"
              value={valorEdit}
              onChange={(e) => setValorEdit(e.target.value)}
            />
            <label htmlFor="faturamento" style={{ paddingTop: "10px" }}>
              Data do Faturamento*
            </label>
            <Calendar
              id="faturamento"
              value={dataDeFaturamentoEdit}
              onChange={(e) => setDataDeFaturamentoEdit(e.value)}
              showIcon
              showOnFocus={false}
              locale="pt-BR"
              mask="99/99/9999"
              placeholder="__/__/____"
            />
            <label htmlFor="produtoIdEdit" style={{ paddingTop: "10px" }}>
              Produto
            </label>
            <Dropdown
              value={produtoIdEdit}
              onChange={(e) => setProdutoIdEdit(e.value)}
              options={produtos.map((produto) => ({
                name: produto.nome,
                value: produto.id,
              }))}
              optionLabel="name"
              placeholder="Selecione o produto"
              className="w-full md:w-14rem"
            />
            <label htmlFor="servicoIdEdit" style={{ paddingTop: "10px" }}>
              Serviço
            </label>
            <Dropdown
              value={servicoIdEdit}
              onChange={(e) => setServicoIdEdit(e.value)}
              options={servicos.map((servico) => ({
                name: servico.nome,
                value: servico.id,
              }))}
              optionLabel="name"
              placeholder="Selecione o serviço"
              className="w-full md:w-14rem"
            />
            <label htmlFor="meioDePagamentoEdit" style={{ paddingTop: "10px" }}>
              Meio de pagamento*
            </label>
            <Dropdown
              value={meioDePagamentoEdit}
              onChange={(e) => setMeioDePagamentoEdit(e.value)}
              options={meioDePagamentoOptions}
              placeholder="Meio de pagamento"
              optionLabel="name"
              className="w-full md:w-14rem"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default RegistroVendas;
