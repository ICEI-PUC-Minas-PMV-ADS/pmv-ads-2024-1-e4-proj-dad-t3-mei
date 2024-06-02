import React, { useState } from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../assets/Logo.png';
import API_URLS from '../../config/apiUrls';
import { validarCNPJ } from '../../utils/validations';

export default function Registrar({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");

  const handleSubmit = async () => {
    if (!validarCNPJ(cnpj)) {
      Alert.alert("Erro", "CNPJ inválido");
      return;
    }
    try {
      const response = await axios.post(`${API_URLS.USUARIOS}`, {
        email,
        senha,
        nome,
        cnpj,
      });

      console.log(response.data);

      const token = response.data.token;

      if (token) {
        await AsyncStorage.setItem("jwtToken", token);
        console.log("Token JWT via E-mail: " + token);
        if (response.status === 200 || response.status === 201) {
          Alert.alert("Sucesso", "Conta criada com sucesso!");
        }
        navigation.navigate('Home');
      } else {
        console.error("Token não recebido");
      }
    } catch (error) {
      console.error("Erro ao registrar", error);
      Alert.alert("Erro ao registrar", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <TextInput
        mode="outlined"
        label="Razão Social"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="CNPJ"
        value={cnpj}
        onChangeText={setCnpj}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Cadastrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    marginBottom: 80,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});