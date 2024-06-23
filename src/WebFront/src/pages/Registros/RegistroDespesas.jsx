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

const RegistroDespesas = () => {
  const [despesas, setDespesas] = useState([]);
  const [nomeEdit, setNomeEdit] = useState("");
  const [valorEdit, setValorEdit] = useState("");
  const [dataDeDespesaEdit, setDataDeDespesaEdit] = useState("");

  const [categoriaIdEdit, setCategoriaIdEdit] = useState("");
  const [categorias, setCategorias] = useState([]);

  const { usuarioId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedDespesa, setSelectedDespesa] = useState(null);
  const [confirmationDialog, setConfirmationDialog] = useState(false); // Novo estado
  const [editDialog, setEditDialog] = useState(false); // Novo estado

  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);

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
  const buscaIdsCategorias = (rowData) => {
    if (
      !rowData ||
      !rowData.categoriasId ||
      rowData.categoriasId.length === 0
    ) {
      return "Sem categoria cadastrada";
    }

    const nomes = rowData.categoriasId.map((id) => {
      const categoria = categorias.find((categoria) => categoria.id === id);
      return categoria ? categoria.nome : "Sem categoria cadastrada";
    });

    return nomes.join(", ");
  };

  const formatData = (rowData) => {
    const date = new Date(rowData.dataDespesa);
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
      header: "Data da Despesa",
      body: formatData,
    },
    { field: "categoriasId", header: "Categorias", body: buscaIdsCategorias },
  ];

  useEffect(() => {
    if (usuarioId) {
      setLoading(true);
      Promise.all([
        fetch(api + "/Categorias").then((response) => response.json()),
        fetch(api + "/Despesas").then((response) => response.json()),
      ])
        .then(([categoriasData, despesasData]) => {
          const categoriasFiltradas = categoriasData.filter(
            (categoria) => categoria.usuarioId === usuarioId
          );
          const despesasFiltradas = despesasData.filter(
            (despesa) => despesa.usuarioId === usuarioId
          );

          setCategorias(categoriasFiltradas);
          setDespesas(despesasFiltradas);

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

  const fetchDespesas = async () => {
    fetch(`${api}/Despesas`)
      .then((response) => response.json())
      .then((despesaData) => {
        setDespesas(despesaData.filter((des) => des.usuarioId === usuarioId));
        setError(null);
      })
      .catch((error) => {
        setError(`Erro ao buscar dados: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleExcluir = async (despesaId) => {
    // Abre o diálogo de confirmação antes de excluir
    setSelectedDespesa(despesaId);
    setConfirmationDialog(true);
  };
  const confirmExcluir = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${api}/Despesas/${selectedDespesa}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setError("Erro ao excluir o faturamento");
      }

      setDespesas(despesas.filter((despesa) => despesa.id !== selectedDespesa));
      toast.current.show({
        severity: "success",
        summary: "Sucesso!",
        detail: "Despesa excluída.",
        life: 3000,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setConfirmationDialog(false);
    }
  };
  const handleEditar = (despesa) => {
    setNomeEdit(despesa.nome);
    setValorEdit(despesa.valor);
    setCategoriaIdEdit(despesa.categorias);
    setDataDeDespesaEdit(new Date(despesa.dataDespesa));

    setSelectedDespesa(despesa.id);
    setEditDialog(true);
  };
  const handleSalvar = async () => {
    if (selectedDespesa) {
      if (!nomeEdit.trim()) {
        setError("O campo não pode estar vazio.");
        return;
      }
      // Editar o despesa existente
      setLoading(true);
      setError(null);

      const editToSend = {
        nome: nomeEdit,
        valor: valorEdit,
        dataDespesa: dataDeDespesaEdit,
        categoriasId: [categoriaIdEdit],
        usuarioId,
      };

      try {
        const response = await fetch(`${api}/Despesas/${selectedDespesa}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editToSend),
        });

        if (!response.ok) {
          setError("Erro ao editar a despesa");
        }

        fetchDespesas();

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
      <h2>Despesas realizadas</h2>

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
      {error && <p className="erro-msg">{error}</p>}
      {loading && (
        <Skeleton width="max-content" height="max-content">
          <p style={{ padding: "5px 20px" }}>Carregando dados, aguarde...</p>
        </Skeleton>
      )}
      <div className="card">
        <DataTable
          value={despesas}
          selectionMode="single"
          selection={selectedDespesa}
          onSelectionChange={(e) => setSelectedDespesa(e.value)}
          dataKey="id"
          paginator
          rows={5}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} de {last} das {totalRecords} despesas"
          globalFilter={globalFilter}
          header={header}
          emptyMessage={loading ? "Carregando..." : "Sem despesas registradas"}
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
          <span>Excluir a despesa? Confirma?</span>
        </div>
      </Dialog>

      {/* Diálogo de confirmação de edição */}
      <Dialog
        visible={editDialog}
        style={{ width: "450px" }}
        onHide={() => setEditDialog(false)}
        header="Editar despesa"
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
            <label htmlFor="despesa" style={{ paddingTop: "10px" }}>
              Data da Despesa*
            </label>
            <Calendar
              id="despesa"
              value={dataDeDespesaEdit}
              onChange={(e) => setDataDeDespesaEdit(e.value)}
              showIcon
              showOnFocus={false}
              locale="pt-BR"
              mask="99/99/9999"
              placeholder="__/__/____"
            />
            <label htmlFor="categoriaEdit" style={{ paddingTop: "10px" }}>
              Categoria
            </label>
            <Dropdown
              value={categoriaIdEdit}
              onChange={(e) => setCategoriaIdEdit(e.value)}
              options={categorias.map((categoria) => ({
                name: categoria.nome,
                value: categoria.id,
              }))}
              optionLabel="name"
              placeholder="Selecione a categoria"
              className="w-full md:w-14rem"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default RegistroDespesas;
