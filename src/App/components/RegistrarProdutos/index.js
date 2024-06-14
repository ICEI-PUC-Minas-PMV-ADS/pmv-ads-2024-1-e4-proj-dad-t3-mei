import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from "react-native-paper"; import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URLS from '../../config/apiUrls';
import Dialog from "react-native-dialog";
import { jwtDecode } from 'jwt-decode';
import Icon from 'react-native-vector-icons/FontAwesome';


const RegistrarProdutos = ({ navigation, route }) => {
  const [produtos, setProdutos] = useState([]);
  const [search, setSearch] = useState('');
  const [nome, setNome] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState("");
  const [newValue, setNewValue] = useState("");
  const [token, setToken] = useState(''); // Adicionado estado para o token

  const fetchProdutos = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('token');

      if (!jwtToken) {
        throw new Error('Token não encontrado');
      }

      const decodedToken = jwtDecode(jwtToken);
      const usuarioId = decodedToken && decodedToken.nameid;

      const response = await axios.get(API_URLS.PRODUTOS, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      if (response.status >= 200 && response.status < 300) {
        const produtosDoUsuario = response.data.filter(produto => produto.usuarioId === usuarioId);
        setProdutos(produtosDoUsuario);
      } else {
        throw new Error('Erro ao buscar produtos: ' + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      Alert.alert('Erro', 'Falha ao buscar produtos: ' + error.message);
    }
    setNome('');
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleAddProduto = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('token');

      if (!jwtToken) {
        throw new Error('Token não encontrado');
      }

      const decodedToken = jwtDecode(jwtToken);
      const usuarioId = decodedToken && decodedToken.nameid;

      const produto = {
        nome,
        usuarioId
      };

      const response = await axios.post(API_URLS.PRODUTOS, produto, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      if (response.status >= 200 && response.status < 300) {
        Alert.alert('Sucesso', 'Produtos adicionado com sucesso!');
        fetchProdutos(); // Atualize a lista de produtos após adicionar um novo
      } else {
        throw new Error('Erro ao adicionar produto: ' + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      Alert.alert('Erro', 'Falha ao adicionar produto: ' + error.message);
    }
  };


  const handleEdit = (id) => {
    const produtoToEdit = produtos.find(produto => produto.id === id);
    setNewValue(produtoToEdit.nome);
    setFieldToEdit(id);
    setDialogVisible(true);
  };

  const handleConfirm = () => {
    const updatedProduto = produtos.map(produto => {
      if (produto.id === fieldToEdit) {
        return { ...produto, nome: newValue };
      }
      return produto;
    });
    setProdutos(updatedProduto);
    setDialogVisible(false);
  };


  const handleDelete = (id) => {
    axios.delete(`${API_URLS.PRODUTOS}/${id}`)
      .then(() => {
        setProdutos(produtos.filter(produto => produto.id !== id));
      })
      .catch(error => {
        console.error('Error deleting produto:', error);
        Alert.alert('Erro', 'Falha ao excluir produto: ' + error.message); // Alerta para o usuário
      });
  };

  const handleSearch = (text) => {
    setSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Nome do Produto"
        onChangeText={setNome}
        value={nome}
        style={{ marginBottom: 10 }}
      />
      <Button
        mode="contained"
        onPress={handleAddProduto}
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
        data={produtos.filter(produto => produto.nome && produto.nome.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>{item.nome}</Text>
            </View>
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
        <Dialog.Title>Editar Produtos</Dialog.Title>
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
  textContainer: {
    flex: 1,
    marginRight: 8, // Espaço entre o texto e os botões de editar e excluir
  },
  itemText: {
    flexShrink: 1, // Encolhe o texto (muda de linha) se não houver espaço suficiente
  },
});

export default RegistrarProdutos;

