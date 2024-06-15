import React, { useState } from "react";
import "./Gerenciamento.css";

import { TabView, TabPanel } from "primereact/tabview";
import Produtos from "./Produtos";
import Servicos from "./Servicos";
import Categorias from "./Categorias";
import Clientes from "./Clientes";

const Gerenciamento = () => {
  return (
    <div className="container">
      <div className="gerenciamento-container">
        <div className="meumei-tab">
          <TabView>
            <TabPanel header="Produtos">
              <Produtos />
            </TabPanel>
            <TabPanel header="Serviços">
              <Servicos />
            </TabPanel>
            <TabPanel header="Categorias">
              <Categorias />
            </TabPanel>
            <TabPanel header="Clientes">
              <Clientes />
            </TabPanel>
            <TabPanel header="Contador">
              <h1>Em breve uma lista de contadores próximos a você.</h1>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
};

export default Gerenciamento;
