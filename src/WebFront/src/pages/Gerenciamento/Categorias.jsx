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

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState("");
  const [nomeEdit, setNomeEdit] = useState("");

  const { usuarioId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [confirmationDialog, setConfirmationDialog] = useState(false); // Novo estado
  const [editDialog, setEditDialog] = useState(false); // Novo estado

  const [categoriaDialog, setCategoriaDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);

  const toast = useRef(null);
  const columns = [{ field: "nome", header: "Nome" }];

  useEffect(() => {
    if (usuarioId) {
      setLoading(true);
      fetch(`${api}/Categorias`)
        .then((response) => {
          if (!response.ok) {
            setError("Erro ao buscar os dados");
          }
          return response.json();
        })
        .then((data) => {
          setCategorias(
            data.filter((categoria) => categoria.usuarioId === usuarioId)
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

  const fetchCategorias = async () => {
    fetch(`${api}/Categorias`)
      .then((response) => response.json())
      .then((categoriaData) => {
        setCategorias(
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
      const response = await fetch(`${api}/Categorias`, {
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
      setCategorias([...categorias, newData]);
      setNome("");
      toast.current.show({
        severity: "success",
        summary: "Sucesso!",
        detail: "Categoria adicionada.",
        life: 3000,
      });
      setCategoriaDialog(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleExcluir = async (categoriaId) => {
    // Abre o diálogo de confirmação antes de excluir
    setSelectedCategoria(categoriaId);
    setConfirmationDialog(true);
  };
  const confirmExcluir = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${api}/Categorias/${selectedCategoria}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setError("Erro ao excluir a categoria");
      }

      setCategorias(
        categorias.filter((categoria) => categoria.id !== selectedCategoria)
      );
      toast.current.show({
        severity: "success",
        summary: "Sucesso!",
        detail: "Categoria excluída.",
        life: 3000,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setConfirmationDialog(false);
    }
  };
  const handleEditar = (categoria) => {
    setNomeEdit(categoria.nome);
    setSelectedCategoria(categoria.id);
    setEditDialog(true);
  };
  const handleSalvar = async () => {
    if (selectedCategoria) {
      if (!nomeEdit.trim()) {
        setError("O campo não pode estar vazio.");
        return;
      }
      // Editar a categoria existente
      setLoading(true);
      setError(null);

      const editToSend = {
        nome: nomeEdit,
        usuarioId,
      };

      try {
        const response = await fetch(`${api}/Categorias/${selectedCategoria}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editToSend),
        });

        if (!response.ok) {
          setError("Erro ao editar a categoria");
        }

        fetchCategorias();

        // Exibir uma mensagem de sucesso
        toast.current.show({
          severity: "success",
          summary: "Sucesso!",
          detail: "Categoria editada.",
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
      // Adicionar um novo categoria
      handleSubmit();
    }
  };
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Categoria"
          icon="pi pi-plus"
          severity="success"
          onClick={() => setCategoriaDialog(true)}
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
          value={categorias}
          selectionMode="single"
          selection={selectedCategoria}
          onSelectionChange={(e) => setSelectedCategoria(e.value)}
          dataKey="id"
          paginator
          rows={5}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} de {last} das {totalRecords} categorias"
          globalFilter={globalFilter}
          header={header}
          emptyMessage={
            loading ? "Carregando..." : "Sem categorias cadastradas"
          }
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
          <span>Excluir a categoria? Confirma?</span>
        </div>
      </Dialog>

      {/* Diálogo de confirmação de edição */}
      <Dialog
        visible={editDialog}
        style={{ width: "450px" }}
        onHide={() => setEditDialog(false)}
        header="Editar categoria"
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

      {/* Diálogo de confirmação criar uma nova categoria */}
      <Dialog
        visible={categoriaDialog}
        style={{ width: "450px" }}
        onHide={() => setCategoriaDialog(false)}
        header="Digite o nome da categoria:"
        modal
        footer={
          <div>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => setCategoriaDialog(false)}
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

export default Categorias;
