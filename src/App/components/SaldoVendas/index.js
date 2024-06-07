import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import API_URLS from "../../config/apiUrls";

const SaldoVendas = () => {
  const [userId, setUserId] = useState(null);
  const [userFaturamentos, setUserFaturamentos] = useState([]);
  const [totalFaturamentos, setTotalFaturamentos] = useState(0);
  const [periodo, setPeriodo] = useState("mes");

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.nameid);
      } else {
        console.log('Token não encontrado');
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    if (userId) {
      fetch(`${API_URLS.FATURAMENTOS}`)
        .then((response) => response.json())
        .then((faturamentosData) => {
          const filteredFaturamentos = faturamentosData.filter(
            (fat) => fat.usuarioId === userId
          );
          setUserFaturamentos(filteredFaturamentos);
          const totalFaturamentos = filteredFaturamentos.reduce(
            (acc, cur) => acc + cur.valor,
            0
          );
          setTotalFaturamentos(totalFaturamentos);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        });
    }
  }, [userId, userFaturamentos]);

  return (
    <View>
      <Text style={styles.text}>Seu faturamento</Text>
      <View style={styles.faturamentoContainer}>
        <View style={styles.containerBotoes}>
          <Text style={{ fontSize: 24 }}>R$</Text>
          <Text style={[{ fontSize: 24, color: "#349c14" }]}>
            {totalFaturamentos.toLocaleString("pt-BR")}
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
