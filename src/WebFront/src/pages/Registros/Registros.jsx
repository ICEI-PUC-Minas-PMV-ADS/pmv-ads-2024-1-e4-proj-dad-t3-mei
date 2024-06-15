import React, { useState } from "react";
import "./Registros.css";

import { TabView, TabPanel } from "primereact/tabview";
import RegistroVendas from "./RegistroVendas";
import RegistroDespesas from "./RegistroDespesas";

const Registros = () => {
  return (
    <div className="container">
      <div className="Registros-container">
        <div className="meumei-tab">
          <TabView>
            <TabPanel header="Registro das Vendas">
              <RegistroVendas />
            </TabPanel>
            <TabPanel header="Registro das Despesas">
              <RegistroDespesas />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
};

export default Registros;
