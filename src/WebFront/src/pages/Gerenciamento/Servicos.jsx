import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import "./Gerenciamento.css";

import { api } from "../../utils/config";
import { useAuth } from "../../provider/authProvider";

const Servicos = () => {
  const [servicos, setServicos] = useState([]);
  const [nome, setNome] = useState("");
  const [nomeEdit, setNomeEdit] = useState("");

  const { usuarioId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedServico, setSelectedServico] = useState(null);
  const [confirmationDialog, setConfirmationDialog] = useState(false); // Novo estado
  const [editDialog, setEditDialog] = useState(false); // Novo estado

  const [servicoDialog, setServicoDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);

  const toast = useRef(null);
  const columns = [{ field: "nome", header: "Nome" }];

  useEffect(() => {
    if (usuarioId) {
      setLoading(true);

      fetch(`${api}/Servicos`)
        .then((response) => {
          if (!response.ok) {
            setError("Erro ao buscar os dados");
          }
          setError(null);
          return response.json();
        })
        .then((data) => {
          setServicos(
            data.filter((servico) => servico.usuarioId === usuarioId)
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

  const fetchServico = async () => {
    fetch(api + "/Servicos")
      .then((response) => response.json())
      .then((servicoData) => {
        setServicos(servicoData.filter((ser) => ser.usuarioId === usuarioId));
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
      usuarioId,
    };

    try {
      const response = await fetch(`${api}/Servicos`, {
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
      setServicos([...servicos, newData]);
      setNome("");

      toast.current.show({
        severity: "success",
        summary: "Sucesso!",
        detail: "Serviço adicionado.",
        life: 3000,
      });

      setServicoDialog(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExcluir = async (servicoId) => {
    // Abre o diálogo de confirmação antes de excluir
    setSelectedServico(servicoId);
    setConfirmationDialog(true);
  };

  const confirmExcluir = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${api}/Servicos/${selectedServico}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setError("Erro ao excluir o serviço");
      }

      setServicos(servicos.filter((servico) => servico.id !== selectedServico));
      toast.current.show({
        severity: "success",
        summary: "Sucesso!",
        detail: "Serviço excluído.",
        life: 3000,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setConfirmationDialog(false);
    }
  };
  const handleEditar = (servico) => {
    setNomeEdit(servico.nome);
    setSelectedServico(servico.id);
    setEditDialog(true);
  };
  const handleSalvar = async () => {
    if (selectedServico) {
      if (!nomeEdit.trim()) {
        setError("O campo 'Serviço' não pode estar vazio.");
        return;
      }
      // Editar o serviço existente
      setLoading(true);
      setError(null);

      const editToSend = {
        nome: nomeEdit,
        usuarioId,
      };

      try {
        const response = await fetch(`${api}/Servicos/${selectedServico}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editToSend),
        });

        if (!response.ok) {
          setError("Erro ao editar o serviço");
        }

        fetchServico();

        // Exibir uma mensagem de sucesso
        toast.current.show({
          severity: "success",
          summary: "Sucesso!",
          detail: "Serviço editado.",
          life: 3000,
        });

        setEditDialog(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      // Adicionar um novo serviço se falhar a edição
      handleSubmit();
    }
  };
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Serviço"
          icon="pi pi-plus"
          severity="success"
          onClick={() => setServicoDialog(true)}
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
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          className="botoes-tabela-excluir"
          severity="danger"
          onClick={() => handleExcluir(rowData.id)}
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
          value={servicos}
          selectionMode="single"
          selection={selectedServico}
          onSelectionChange={(e) => setSelectedServico(e.value)}
          dataKey="id"
          paginator
          rows={5}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} de {last} dos {totalRecords} serviços"
          globalFilter={globalFilter}
          header={header}
          emptyMessage={loading ? "Carregando..." : "Sem serviços cadastrados"}
        >
          {columns.map((col, i) => (
            <Column key={col.field} field={col.field} header={col.header} />
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
          <span>Excluir o serviço? Confirma?</span>
        </div>
      </Dialog>

      {/* Diálogo de confirmação de edição */}
      <Dialog
        visible={editDialog}
        style={{ width: "450px" }}
        onHide={() => setEditDialog(false)}
        header="Editar serviço"
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
            <label htmlFor="nameEdit"></label>
            <InputText
              id="nameEdit"
              value={nomeEdit}
              onChange={(e) => setNomeEdit(e.target.value)}
            />
          </div>
        </div>
      </Dialog>

      {/* Diálogo de confirmação criar um novo serviço */}
      <Dialog
        visible={servicoDialog}
        style={{ width: "450px" }}
        onHide={() => setServicoDialog(false)}
        header="Digite o nome do serviço:"
        modal
        footer={
          <div>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => setServicoDialog(false)}
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
            <label htmlFor="name"></label>
            <InputText
              id="name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Servicos;
