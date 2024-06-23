import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";

import "./Gerenciamento.css";

import { api } from "../../utils/config";
import { useAuth } from "../../provider/authProvider";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState("");
  const [nomeEdit, setNomeEdit] = useState("");
  const [email, setEmail] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [telefone, setTelefone] = useState("");
  const [telefoneEdit, setTelefoneEdit] = useState("");
  const [dataDeNascimento, setDataDeNascimento] = useState("");
  const [dataDeNascimentoEdit, setDataDeNascimentoEdit] = useState("");

  const { usuarioId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedClientes, setSelectedClientes] = useState(null);
  const [confirmationDialog, setConfirmationDialog] = useState(false); // Novo estado
  const [editDialog, setEditDialog] = useState(false); // Novo estado

  const [clienteDialog, setClientDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);

  const toast = useRef(null);

  const formatDate = (rowData) => {
    const date = new Date(rowData.dataDeNascimento);
    return `${date.toLocaleDateString("pt-BR")}`;
  };

  const columns = [
    { field: "nome", header: "Nome" },
    { field: "email", header: "Email" },
    { field: "telefone", header: "Telefone" },
    {
      field: "dataDeNascimento",
      header: "Data de Nascimento",
      body: formatDate,
    },
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

  useEffect(() => {
    if (usuarioId) {
      setLoading(true);
      fetch(`${api}/Clientes`)
        .then((response) => {
          if (!response.ok) {
            setError("Erro ao buscar os dados");
          }
          return response.json();
        })
        .then((data) => {
          setClientes(
            data.filter((cliente) => cliente.usuarioId === usuarioId)
          );
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [usuarioId]);

  const fetchClientes = async () => {
    fetch(`${api}/Clientes`)
      .then((response) => response.json())
      .then((clienteData) => {
        setClientes(clienteData.filter((cli) => cli.usuarioId === usuarioId));
        setError(null);
      })
      .catch((error) => {
        setError(`Erro ao buscar dados: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = async () => {
    if (!nome.trim()) {
      setError("O campo não pode estar vazio.");
      return;
    }

    setLoading(true);
    setError(null);

    const dataToSend = {
      nome,
      email,
      telefone,
      dataDeNascimento,
      usuarioId,
    };

    try {
      const response = await fetch(`${api}/Clientes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        setError("Erro ao enviar os dados");
      }

      const newData = await response.json();
      setClientes([...clientes, newData]);
      setNome("");
      setEmail("");
      setTelefone("");
      setDataDeNascimento("");

      toast.current.show({
        severity: "success",
        summary: "Sucesso!",
        detail: "Cliente adicionado.",
        life: 3000,
      });
      setClientDialog(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleExcluir = async (clienteId) => {
    // Abre o diálogo de confirmação antes de excluir
    setSelectedClientes(clienteId);
    setConfirmationDialog(true);
  };
  const confirmExcluir = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${api}/Clientes/${selectedClientes}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setError("Erro ao excluir o cliente");
      }

      setClientes(
        clientes.filter((cliente) => cliente.id !== selectedClientes)
      );
      toast.current.show({
        severity: "success",
        summary: "Sucesso!",
        detail: "Cliente excluído.",
        life: 3000,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setConfirmationDialog(false);
    }
  };
  const handleEditar = (cliente) => {
    setNomeEdit(cliente.nome);
    setEmailEdit(cliente.email);
    setTelefoneEdit(cliente.telefone);
    setDataDeNascimentoEdit(new Date(cliente.dataDeNascimento));

    setSelectedClientes(cliente.id);
    setEditDialog(true);
  };
  const handleSalvar = async () => {
    if (selectedClientes) {
      if (!nomeEdit.trim()) {
        setError("O campo não pode estar vazio.");
        return;
      }
      // Editar o cliente existente
      setLoading(true);
      setError(null);

      const editToSend = {
        nome: nomeEdit,
        email: emailEdit,
        telefone: telefoneEdit,
        dataDeNascimento: dataDeNascimentoEdit,
        usuarioId,
      };

      try {
        const response = await fetch(`${api}/Clientes/${selectedClientes}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editToSend),
        });

        if (!response.ok) {
          setError("Erro ao editar o cliente");
        }

        fetchClientes();

        // Exibir uma mensagem de sucesso
        toast.current.show({
          severity: "success",
          summary: "Sucesso!",
          detail: "Cliente editado.",
          life: 3000,
        });

        // Fechar o diálogo de edição
        setEditDialog(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      // Adicionar um novo cliente
      handleSubmit();
    }
  };
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Cliente"
          icon="pi pi-plus"
          severity="success"
          onClick={() => setClientDialog(true)}
          disabled={loading}
        />
      </div>
    );
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
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Filtrar</h4>
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
      <div className="card">
        <Toolbar className="mb-4" start={leftToolbarTemplate}></Toolbar>
        {error && <p className="erro-msg">{error}</p>}
        <DataTable
          value={clientes}
          selectionMode="single"
          selection={selectedClientes}
          onSelectionChange={(e) => setSelectedClientes(e.value)}
          dataKey="id"
          paginator
          rows={5}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} de {last} dos {totalRecords} clientes"
          globalFilter={globalFilter}
          header={header}
          emptyMessage={loading ? "Carregando..." : "Sem clientes cadastrados"}
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
          <span>Excluir o cliente? Confirma?</span>
        </div>
      </Dialog>

      {/* Diálogo de confirmação de edição */}
      <Dialog
        visible={editDialog}
        style={{ width: "450px" }}
        onHide={() => setEditDialog(false)}
        header="Editar cliente"
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
              Alterar nome:
            </label>
            <InputText
              id="nameEdit"
              value={nomeEdit}
              onChange={(e) => setNomeEdit(e.target.value)}
            />
            <label htmlFor="emailEdit" style={{ paddingTop: "10px" }}>
              Alterar email:
            </label>
            <InputText
              id="emailEdit"
              value={emailEdit}
              onChange={(e) => setEmailEdit(e.target.value)}
            />

            <label htmlFor="telefoneEdit" style={{ paddingTop: "10px" }}>
              Alterar telefone
            </label>
            <InputText
              id="telefoneEdit"
              value={telefoneEdit}
              onChange={(e) => setTelefoneEdit(e.target.value)}
            />
            <label htmlFor="nascimentoEdit" style={{ paddingTop: "10px" }}>
              Data de Nascimento:
            </label>

            <Calendar
              id="nascimentoEdit"
              value={dataDeNascimentoEdit}
              onChange={(e) => setDataDeNascimentoEdit(e.value)}
              showIcon
              locale="pt-BR"
              mask="99/99/9999"
              placeholder="__/__/____"
            />
          </div>
        </div>
      </Dialog>

      {/* Diálogo de confirmação criar um novo cliente */}
      <Dialog
        visible={clienteDialog}
        style={{ width: "450px" }}
        onHide={() => setClientDialog(false)}
        header="Cadastrar um cliente:"
        modal
        footer={
          <div>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => setClientDialog(false)}
              className="p-button-text"
              disabled={loading}
            />
            <Button
              label="Cadastrar"
              icon="pi pi-check"
              onClick={handleSubmit}
              disabled={loading}
            />
          </div>
        }
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="name" style={{ paddingTop: "10px" }}>
              Nome:
            </label>
            <InputText
              id="name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <label htmlFor="email" style={{ paddingTop: "10px" }}>
              E-mail:
            </label>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="telefone" style={{ paddingTop: "10px" }}>
              Telefone:
            </label>
            <InputMask
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              mask="(099)99999-9999"
              autoClear={false}
            />
            <label htmlFor="nascimento" style={{ paddingTop: "10px" }}>
              Data de Nascimento:
            </label>
            <Calendar
              id="nascimento"
              value={dataDeNascimento}
              onChange={(e) => setDataDeNascimento(e.value)}
              showIcon
              locale="pt-BR"
              mask="99/99/9999"
              placeholder="__/__/____"
              showOnFocus={false}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Clientes;
