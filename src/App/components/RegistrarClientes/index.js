import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from "react-native-paper";

const RegistrarClientes = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState('');

  const handleRegister = () => {
    const cliente = {
      nome,
      email,
      telefone,
      dataDeNascimento,
    };

    console.log(cliente);
  };

  return (
    <View style={{ padding: 16, }}>
      <TextInput
        mode="outlined"
        label="Nome"
        value={nome}
        onChangeText={setNome}
        style={{ marginBottom: 10 }}
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
        label="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        mode="outlined"
        label="Data de Nascimento"
        value={dataDeNascimento}
        onChangeText={setDataDeNascimento}
        style={{ marginBottom: 10 }}
      />
      <Button mode="contained" onPress={handleRegister}> Registrar </Button>

    </View>
  );
};

export default RegistrarClientes;