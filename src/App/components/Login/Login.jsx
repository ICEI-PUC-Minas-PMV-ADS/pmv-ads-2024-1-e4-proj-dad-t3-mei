import React, { useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_URLS from "../../config/apiUrls";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await axios.post(`${API_URLS.USUARIOS_AUTHENTICATE}`, {
      email: email,
      senha: password,
    });

    const data = response.data;
    const token = data.jwtToken;

    if (token && typeof token === "string") {
      console.log("Token JWT via E-mail: " + token);
      // Redefine o histórico de navegação após o login
      navigation.reset({
        index: 0,
        routes: [{ name: "MyTabs" }],
      });
    } else {
      throw new Error("Token não encontrado ou não é uma string");
    }

    // Armazena o token JWT no AsyncStorage
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      // handle error
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 16,
        marginBottom: 80,
      }}
    >
      <Image
        source={require("../../assets/Logo.png")}
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          marginBottom: 16,
        }}
      />
      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        mode="outlined"
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10 }}
      />
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
      <Button mode="text" onPress={() => navigation.navigate("RecuperarSenha")}>
        Esqueceu a senha?
      </Button>
    </View>
  );
}
