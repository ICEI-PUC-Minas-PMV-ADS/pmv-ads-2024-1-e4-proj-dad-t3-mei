import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URLS from '../../config/apiUrls';
import Dialog from "react-native-dialog";
import { jwtDecode } from 'jwt-decode';

const RegistrarCategorias = ({ navigation, route }) => {
  const [categorias, setCategorias] = useState([]);
  const [search, setSearch] = useState('');
  const [nome, setNome] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState("");
  const [newValue, setNewValue] = useState("");
  const [token, setToken] = useState(''); // Adicionado estado para o token

  const fetchCategorias = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('token');

      if (!jwtToken) {
        throw new Error('Token não encontrado');
      }

      const decodedToken = jwtDecode(jwtToken);
      const usuarioId = decodedToken && decodedToken.nameid;

      const response = await axios.get(API_URLS.CATEGORIAS, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      if (response.status >= 200 && response.status < 300) {
        const categoriasDoUsuario = response.data.filter(categoria => categoria.usuarioId === usuarioId);
        setCategorias(categoriasDoUsuario);
      } else {
        throw new Error('Erro ao buscar categorias: ' + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      Alert.alert('Erro', 'Falha ao buscar categorias: ' + error.message);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleAddCategoria = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('token');

      if (!jwtToken) {
        throw new Error('Token não encontrado');
      }

      const decodedToken = jwtDecode(jwtToken);
      const usuarioId = decodedToken && decodedToken.nameid;

      const categoria = {
        nome,
        usuarioId
      };

      const response = await axios.post(API_URLS.CATEGORIAS, categoria, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      if (response.status >= 200 && response.status < 300) {
        Alert.alert('Sucesso', 'categoria adicionado com sucesso!');
        fetchCategorias(); // Atualize a lista de categorias após adicionar um novo
      } else {
        throw new Error('Erro ao adicionar categoria: ' + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      Alert.alert('Erro', 'Falha ao adicionar categoria: ' + error.message);
    }
  };


  const handleEdit = (id) => {
    const categoriaToEdit = categorias.find(categoria => categoria.id === id);
    setNewValue(categoriaToEdit.nome);
    setFieldToEdit(id);
    setDialogVisible(true);
  };

  const handleConfirm = () => {
    const updatedCategorias = categorias.map(categoria => {
      if (categoria.id === fieldToEdit) {
        return { ...categoria, nome: newValue };
      }
      return categoria;
    });
    setCategorias(updatedCategorias);
    setDialogVisible(false);
  };


  const handleDelete = (id) => {
    axios.delete(`${API_URLS.CATEGORIAS}/${id}`)
      .then(() => {
        setCategorias(categorias.filter(categoria => categoria.id !== id));
      })
      .catch(error => {
        console.error('Error deleting categoria:', error);
        Alert.alert('Erro', 'Falha ao excluir categoria: ' + error.message); // Alerta para o usuário
      });
  };

  const handleSearch = (text) => {
    setSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do categoria"
        value={nome}
        onChangeText={setNome}
      />
      <Button title="Salvar" onPress={handleAddCategoria} />

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar..."
        value={search}
        onChangeText={handleSearch}
      />

      <FlatList
        data={categorias.filter(categoria => categoria.nome && categoria.nome.toLowerCase().includes(search.toLowerCase()))}
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
        <Dialog.Title>Editar categoria</Dialog.Title>
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

export default RegistrarCategorias;

