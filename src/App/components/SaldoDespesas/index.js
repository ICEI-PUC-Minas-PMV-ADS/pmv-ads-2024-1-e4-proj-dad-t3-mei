import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import API_URLS from "../../config/apiUrls";

const SaldoVendas = () => {
  const [userId, setUserId] = useState(null);
  const [userDespesas, setUserDespesas] = useState([]);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [periodo, setPeriodo] = useState("mes");

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.nameid);
    };

    getToken();
  }, []);

  useEffect(() => {
    if (userId) {
      fetch(`${API_URLS.DESPESAS}`)
        .then((response) => response.json())
        .then((DespesasData) => {
          const filteredDespesas = DespesasData.filter(
            (des) => des.usuarioId === userId
          );
          setUserDespesas(filteredDespesas);
          const totalDespesas = filteredDespesas.reduce(
            (acc, cur) => acc + cur.valor,
            0
          );
          setTotalDespesas(totalDespesas);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        });
    }
  }, [userId, userDespesas]);

  return (
    <View>
      <Text style={styles.text}>Seu faturamento</Text>
      <View style={styles.faturamentoContainer}>
        <View style={styles.containerBotoes}>
          <Text style={{ fontSize: 24 }}>R$</Text>
          <Text style={[{ fontSize: 24, color: "#e72424" }]}>
            {totalDespesas.toLocaleString("pt-BR")}
          </Text>
        </View>
        <View style={styles.containerBotoes}>
          <Button mode="contained" onPress={() => setPeriodo("mes")}>
            MÊS
          </Button>
          <Button mode="contained" onPress={() => setPeriodo("ano")}>
            ANO
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBotoes: {
    gap: 5,
    flexDirection: "row",
    fontSize: 24,
  },
  faturamentoContainer: {
    backgroundColor: "#D9D9D9",
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    paddingVertical: 3,
    color: "#470459",
  },
});

export default SaldoVendas;
