import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URLS from '../../config/apiUrls';
import Dialog from "react-native-dialog";
import { jwtDecode } from 'jwt-decode';
import Icon from 'react-native-vector-icons/FontAwesome';

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

    setNome('');
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
        mode="outlined"
        label="Nome da categoria"
        onChangeText={setNome}
        value={nome}
        style={{ marginBottom: 10 }}
      />
      <Button
        mode="contained"
        onPress={handleAddCategoria}
        style={{ marginBottom: 10 }}
      > Salvar </Button>

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

      <FlatList
        data={categorias.filter(categoria => categoria.nome && categoria.nome.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.nome}</Text>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.buttonEditar}
                mode="contained"
                onPress={() => handleEdit(item.id)}
              > Editar</Button>
              <Button
                style={styles.buttonExcluir}
                mode="contained"
                onPress={() => handleDelete(item.id)}
              > Excluir</Button>
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
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#a3a3a3',
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
  buttonEditar: {
    marginRight: 8,
  },
  buttonExcluir: {
    backgroundColor: '#c40000',
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

});

export default RegistrarCategorias;

