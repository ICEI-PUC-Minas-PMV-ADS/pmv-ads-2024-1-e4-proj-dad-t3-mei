import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URLS from '../../config/apiUrls';
import { jwtDecode } from 'jwt-decode';
import DateTimePicker from '@react-native-community/datetimepicker';


const GerenciarClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState(new Date()); // Inicializado com um objeto Date
  const [usuarioId, setUsuarioId] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false); // Renomeado para showDatePicker para clareza

  useEffect(() => {
    const obterTokenEUsuario = async () => {
      const jwtToken = await AsyncStorage.getItem('token');
      if (!jwtToken) {
        Alert.alert('Erro', 'Token não encontrado');
        return;
      }
      const decodedToken = jwtDecode(jwtToken);
      setUsuarioId(decodedToken && decodedToken.nameid);
      buscarClientes();
    };

    obterTokenEUsuario();
  }, []);

  const buscarClientes = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('token');
      const response = await axios.get(API_URLS.CLIENTES, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ usuarioId }),
      });
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      Alert.alert('Erro', 'Falha ao buscar clientes');
    }
  };

  const limparCampos = () => {
    setNome('');
    setEmail('');
    setTelefone('');
    setDataDeNascimento(new Date());
  }

  const handleRegister = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('token');
      if (!jwtToken) {
        Alert.alert('Erro', 'Token não encontrado');
        return;
      }

      Alert.alert("Atenção!", "Venda adicionada com sucesso", [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => {
            limparCampos();
            buscarClientes();
          },
        },
      ]);

      const cliente = {
        Nome: nome,
        Email: email,
        Telefone: telefone,
        DataDeNascimento: new Date(dataDeNascimento).toISOString(), // Formatar a data
        UsuarioId: usuarioId,
      };

      const config = {
        headers: { Authorization: `Bearer ${jwtToken}` }
      };

      const response = await axios.post(API_URLS.CLIENTES, cliente, config);
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Cliente registrado com sucesso');
        // Atualizar a lista de clientes ou realizar outras ações necessárias
      }
    } catch (error) {
      console.error('Erro ao registrar cliente:', error);
      Alert.alert('Erro', 'Erro ao registrar cliente');
    }
  };


  const handleSearch = (text) => {
    setSearch(text);
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(search.toLowerCase())
  );

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dataDeNascimento;
    setShowDatePicker(false);
    setDataDeNascimento(currentDate); // Corrigido para usar o nome correto do estado
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={clientesFiltrados} // Alterado para usar clientes filtrados
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.nome}</Text> // Exemplo simples de como exibir os nomes dos clientes
        )}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <TextInput
              label="Nome"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              label="Telefone"
              value={telefone}
              onChangeText={setTelefone}
              style={styles.input}
            />

            <View style={styles.input}>
              <TouchableOpacity
                onPress={showDatePickerHandler}
                style={styles.datePickerTouch}
              >
                <Text style={styles.datePickerText}>
                  Data de nascimento: {dataDeNascimento.toLocaleDateString("pt-BR")}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={dataDeNascimento}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
            <Button mode="contained" onPress={handleRegister} style={styles.button}>
              Registrar Cliente
            </Button>
            <TextInput
              label="Buscar"
              value={search}
              onChangeText={handleSearch}
              style={styles.input}
            />
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.clienteItem}>
            <Text>{item.nome}</Text>
            <Text>{item.email}</Text>
            <Text>{item.telefone}</Text>
            <Text>{item.dataDeNascimento}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
  clienteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default GerenciarClientes;