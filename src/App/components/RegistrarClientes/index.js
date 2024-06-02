import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const RegistrarClientes = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState('');
  const [usuarioId, setUsuarioId] = useState('');

  const handleRegister = () => {
    const cliente = {
      id,
      nome,
      email,
      telefone,
      dataDeNascimento,
      usuarioId,
    };

    console.log(cliente);
  };

  return (
    <View>
      <Text>Registrar Clientes</Text>
      <TextInput placeholder="Nome" onChangeText={setNome} value={nome} />
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Telefone" onChangeText={setTelefone} value={telefone} />
      <TextInput placeholder="Data de Nascimento" onChangeText={setDataDeNascimento} value={dataDeNascimento} />
      <TextInput placeholder="ID do Usuário" onChangeText={setUsuarioId} value={usuarioId} />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
};

export default RegistrarClientes;