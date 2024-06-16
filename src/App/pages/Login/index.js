import React, { useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_URLS from "../../config/apiUrls";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Função de validação
  const validarLogin = (email, senha) => {
    if (email.trim() === "" || senha.trim() === "") {
      alert("E-mail e senha são obrigatórios.");
      return false;
    }
    if (senha.length < 5) {
      alert("A senha deve ter pelo menos 5 caracteres.");
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      alert("E-mail inválido.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    // Chama a função de validação
    if (!validarLogin(email, senha)) {
      return; // Interrompe a execução se a validação falhar
    }
    try {
      const response = await axios.post(`${API_URLS.USUARIOS_AUTHENTICATE}`, {
        email: email,
        senha: senha,
      });

      const data = response.data;
      const token = data.jwtToken;

      // Verifica se o token existe e é uma string antes de tentar armazená-lo
      if (token) {
        console.log("Token JWT via E-mail: " + token);
        // Redefine o histórico de navegação após o login
        navigation.reset({
          index: 0,
          routes: [{ name: "MyTabs" }],
        });
        // Armazena o token JWT no AsyncStorage diretamente
        await AsyncStorage.setItem("token", token);
      } else {
        // Lança um erro se o token não for encontrado
        throw new Error("Token inválido: não encontrado");
      }
    } catch (error) {
      if (error.response) {
        // O servidor respondeu com um status fora do intervalo 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        // Aqui você pode adicionar lógica baseada no status ou na mensagem de erro
        if (error.response.status === 401) {
          alert("E-mail ou senha incorretos.");
        } else {
          alert("Erro ao fazer login. Tente novamente mais tarde.");
        }
        // Por exemplo, se status for 401 ou 404, você pode assumir que o usuário não existe ou a senha está incorreta
      } else if (error.request) {
        // O pedido foi feito, mas não houve resposta
        console.log(error.request);
        alert("Erro ao fazer a requisição. Tente novamente mais tarde.");
      } else {
        // Algo aconteceu na configuração do pedido que causou um erro
        console.log('Error', error.message);
      }
    }
  }



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
        value={senha}
        onChangeText={setSenha}
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