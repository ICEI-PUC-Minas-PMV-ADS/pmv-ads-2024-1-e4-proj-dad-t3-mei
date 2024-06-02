import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URLS from '../../config/apiUrls';
import Dialog from "react-native-dialog";
import { jwtDecode } from 'jwt-decode';

const RegistrarServicos = ({ navigation, route }) => {
  const [servicos, setServicos] = useState([]);
  const [search, setSearch] = useState('');
  const [nome, setNome] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState("");
  const [newValue, setNewValue] = useState("");
  const [token, setToken] = useState(''); // Adicionado estado para o token

  const fetchServicos = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('token');

      if (!jwtToken) {
        throw new Error('Token não encontrado');
      }

      const decodedToken = jwtDecode(jwtToken);
      const usuarioId = decodedToken && decodedToken.nameid;

      const response = await axios.get(API_URLS.SERVICOS, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      if (response.status >= 200 && response.status < 300) {
        const servicosDoUsuario = response.data.filter(servico => servico.usuarioId === usuarioId);
        setServicos(servicosDoUsuario);
      } else {
        throw new Error('Erro ao buscar servicos: ' + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Erro ao buscar servicos:', error);
      Alert.alert('Erro', 'Falha ao buscar servicos: ' + error.message);
    }
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  const handleAddServico = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('token');

      if (!jwtToken) {
        throw new Error('Token não encontrado');
      }

      const decodedToken = jwtDecode(jwtToken);
      const usuarioId = decodedToken && decodedToken.nameid;

      const servico = {
        nome,
        usuarioId
      };

      const response = await axios.post(API_URLS.SERVICOS, servico, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      if (response.status >= 200 && response.status < 300) {
        Alert.alert('Sucesso', 'Serviço adicionado com sucesso!');
        fetchServicos(); // Atualize a lista de servicos após adicionar um novo
      } else {
        throw new Error('Erro ao adicionar servico: ' + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Erro ao adicionar servico:', error);
      Alert.alert('Erro', 'Falha ao adicionar servico: ' + error.message);
    }
  };


  const handleEdit = (id) => {
    const servicoToEdit = servicos.find(servico => servico.id === id);
    setNewValue(servicoToEdit.nome);
    setFieldToEdit(id);
    setDialogVisible(true);
  };

  const handleConfirm = () => {
    const updatedServicos = servicos.map(servico => {
      if (servico.id === fieldToEdit) {
        return { ...servico, nome: newValue };
      }
      return servico;
    });
    setServicos(updatedServicos);
    setDialogVisible(false);
  };


  const handleDelete = (id) => {
    axios.delete(`${API_URLS.SERVICOS}/${id}`)
      .then(() => {
        setServicos(servicos.filter(servico => servico.id !== id));
      })
      .catch(error => {
        console.error('Error deleting servico:', error);
        Alert.alert('Erro', 'Falha ao excluir servico: ' + error.message); // Alerta para o usuário
      });
  };

  const handleSearch = (text) => {
    setSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Serviço"
        value={nome}
        onChangeText={setNome}
      />
      <Button title="Salvar" onPress={handleAddServico} />

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar..."
        value={search}
        onChangeText={handleSearch}
      />

      <FlatList
        data={servicos.filter(servico => servico.nome && servico.nome.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.nome}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Editar" onPress={() => handleEdit(item.id)} />
              <Button title="Excluir" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Editar Serviço</Dialog.Title>
        <Dialog.Input onChangeText={setNewValue} value={newValue} />
        <Dialog.Button label="Cancelar" onPress={() => setDialogVisible(false)} />
        <Dialog.Button label="OK" onPress={handleConfirm} />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  searchBar: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
});

export default RegistrarServicos;

