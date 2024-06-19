import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URLS from '../../config/apiUrls';
import { jwtDecode } from 'jwt-decode';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

const GerenciarClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState(new Date()); // Inicializado com um objeto Date
  const [usuarioId, setUsuarioId] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const buscarClientes = async () => {
    setLoading(true);
    try {
      const jwtToken = await AsyncStorage.getItem('token');
      if (!jwtToken) {
        Alert.alert('Erro', 'Token não encontrado');
        return;
      }
      const response = await axios.get(API_URLS.CLIENTES, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      const usuarioIdCorreto = usuarioId;
      const clientesFiltrados = response.data.filter(cliente => cliente.usuarioId === usuarioIdCorreto);

      setClientes(clientesFiltrados);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      Alert.alert('Erro', 'Falha ao buscar clientes');
    }
    setLoading(false);
  };

  useEffect(() => {
    const obterTokenEUsuario = async () => {
      setLoading(true);
      const jwtToken = await AsyncStorage.getItem('token');
      if (!jwtToken) {
        Alert.alert('Erro', 'Token não encontrado');
        return;
      }
      const decodedToken = jwtDecode(jwtToken);
      setUsuarioId(decodedToken && decodedToken.nameid);
      setLoading(false);
    };
    obterTokenEUsuario();
    buscarClientes();
  }, []);

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

      Alert.alert("Atenção!", "Cliente adicionada com sucesso", [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => {
            limparCampos();

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
    setDataDeNascimento(currentDate);
  };

  function handleDeleteCliente(clienteId) {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja excluir este cliente?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Confirmar", onPress: async () => {
            try {
              const jwtToken = await AsyncStorage.getItem('token');
              const config = {
                headers: { Authorization: `Bearer ${jwtToken}` }
              };
              await axios.delete(`${API_URLS.CLIENTES}/${clienteId}`, config);
              // Atualizar a lista de clientes
              const novaListaClientes = clientes.filter(cliente => cliente.id !== clienteId);
              setClientes(novaListaClientes);
              Alert.alert("Sucesso", "Cliente excluído com sucesso.");
            } catch (error) {
              console.error('Erro ao excluir cliente:', error);
              Alert.alert("Erro", "Não foi possível excluir o cliente.");

            }
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={clientesFiltrados} // clientes filtrados
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.nome}</Text> // Exibe os nomes
        )}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <TextInput
              mode="outlined"
              label="Nome"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Telefone"
              value={telefone}
              onChangeText={setTelefone}
              style={styles.input}
            />

            <View style={styles.inputData}>
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
            <Button style={styles.smallButton} onPress={buscarClientes}></Button>
            <View style={styles.searchContainer}>
              <Icon
                name="search"
                size={20}
                color="#313131"
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Buscar..."
                value={search}
                onChangeText={handleSearch}
                style={styles.searchInput}
              />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.container}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" /> // Indicador de carregamento para a renderização dos itens
            ) : (
              <FlatList
                data={clientes}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.clienteItem}>
                    <Text>{item.nome}</Text>
                    <Text>{item.email}</Text>
                    <Text>{item.telefone}</Text>
                    <Text>{new Date(item.dataDeNascimento).toLocaleDateString("pt-BR")}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                      <Button>Editar</Button>
                      <Button>Excluir</Button>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};


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
  smallButton: {
    marginBottom: 10,
    padding: 0,
    height: 3,
    backgroundColor: '#afafaf',
  },
  clienteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  datePickerTouch: {
    padding: 12,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 10,
    fontSize: 16,
    borderRadius: 5,
  },
});

export default GerenciarClientes;