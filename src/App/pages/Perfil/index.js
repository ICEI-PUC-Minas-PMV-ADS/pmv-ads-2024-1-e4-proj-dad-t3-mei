import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { Button, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Dialog from "react-native-dialog";
import { useNavigation } from '@react-navigation/native';

import API_URLS from '../../config/apiUrls';

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState("");
  const [newValue, setNewValue] = useState("");
  const [token, setToken] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('Token não encontrado');
          return;
        }
        setToken(token);
        const decodedToken = jwtDecode(token);
        const userId = decodedToken && decodedToken.nameid;

        console.log('userId:', userId);
        console.log(`Fazendo requisição para: ${API_URLS.USUARIOS}/${userId}`);
        console.log(`Com token: ${token}`);

        if (userId) {
          fetch(`${API_URLS.USUARIOS}/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then((response) => {
              setUsuario(response.data);
            })
            .catch((error) => {
              console.error('Erro ao recuperar os dados do usuário:', error);
            });
        } else {
          console.error('Erro: userId está indefinido');
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    };
    fetchUser();
  }, []);

  const handleEdit = (field) => {
    setFieldToEdit(field);
    setNewValue(''); // Limpa o estado newValue
    setDialogVisible(true);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };


  const handleConfirm = () => {
    const updatedUser = { ...usuario, [fieldToEdit.toLowerCase()]: newValue };
    axios.put(`${API_URLS.USUARIOS}/${usuario.id}`, updatedUser, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          setUsuario(updatedUser);
        } else {
          throw new Error(`Erro ao atualizar o usuário: ${response.status} ${response.statusText}`);
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar o usuário:", error);
      });
    setDialogVisible(false);
  };

  const handleLogoff = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
    setUsuario(null);
    navigation.navigate('Home');
    // Redefine o histórico de navegação após o Logoff
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  if (!usuario) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 30, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 45 }}>Seus dados</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, width: '100%' }}>
        <Text><Text style={{ fontWeight: 'bold' }}>Nome:</Text> {usuario.nome}</Text>
        <Button mode="contained" onPress={() => handleEdit('Nome')}>Editar</Button>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, width: '100%' }}>
        <Text><Text style={{ fontWeight: 'bold' }}>Email:</Text> {usuario.email}</Text>
        <Button mode="contained" onPress={() => handleEdit('Email')}>Editar</Button>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, width: '100%' }}>
        <Text><Text style={{ fontWeight: 'bold' }}>CNPJ:</Text> {usuario.cnpj}</Text>
        <Button mode="contained" onPress={() => handleEdit('CNPJ')}>Editar</Button>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Button mode="contained" color="red" onPress={handleLogoff}>Sair</Button>
        <Dialog.Container visible={dialogVisible}>
          <Dialog.Title>Editar {fieldToEdit}</Dialog.Title>
          <Dialog.Input onChangeText={setNewValue} value={newValue} />
          <Dialog.Button label="Cancelar" onPress={handleCancel} />
          <Dialog.Button label="OK" onPress={handleConfirm} />
        </Dialog.Container>
      </View>
    </View>
  );
}

export default Perfil;