import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressBar, MD3Colors } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URLS from "../config/apiUrls";
import { jwtDecode } from "jwt-decode";

const BarraProgresso = ({ progress }) => {
  const [userId, setUserId] = useState(null);
  const [userFaturamentos, setUserFaturamentos] = useState([]);
  const [totalFaturamentos, setTotalFaturamentos] = useState(0);
  const [barra, setBarra] = useState();
  const [meiAno, setMeiAno] = useState(81000);
  const [meiMes, setMeiMes] = useState(6750);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.nameid);
        }
      } catch (error) {
        console.error("Erro ao buscar o token:", error);
      }
    }
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

  useEffect(() => {
    const barra = totalFaturamentos / meiMes;
    setBarra(barra);
  }, [totalFaturamentos, meiMes]);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
      <ProgressBar
        progress={barra}
        color={
          barra <= 0.6 ? "#2d59dbee" : barra <= 0.9 ? "#fff170ee" : "#e72121ee"
        }
        style={{
          height: 25,
          borderRadius: 5,
          marginRight: 5,
          width: 370,
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.progressText}>{`${Math.round(barra * 100)}%`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  progressText: {
    color: "black",
    fontSize: 16,
  },
});

export default BarraProgresso;
