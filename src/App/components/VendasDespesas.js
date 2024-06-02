import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import Vendas from "./RegistrarVendas";
import Despesas from "./RegistrarDespesas";

const VendasDespesas = () => {
  const [mostrarVendas, setMostrarVendas] = useState(true);

  const toggleMostrarVendas = () => {
    setMostrarVendas(true);
  };

  const toggleMostrarDespesas = () => {
    setMostrarVendas(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Button
          labelStyle={[
            styles.buttonLabel,
            mostrarVendas && styles.activeButton,
          ]}
          mode="text"
          onPress={toggleMostrarVendas}
        >
          Vendas
        </Button>
        <Button
          labelStyle={[
            styles.buttonLabel,
            !mostrarVendas && styles.activeButton,
          ]}
          mode="text"
          onPress={toggleMostrarDespesas}
        >
          Despesas
        </Button>
      </View>
      <View style={styles.separator} />
      <View style={{ margin: 15 }}>
        {mostrarVendas ? <Vendas /> : <Despesas />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#d9d9d9",
    marginVertical: 10,
    paddingVertical: 10,
  },
  buttonLabel: {
    fontSize: 18,
    color: "#470459",
    textDecorationLine: "none",
  },
  activeButton: {
    textDecorationLine: "underline",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default VendasDespesas;
