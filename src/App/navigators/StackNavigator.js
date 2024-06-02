import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Stack } from './navigation'; // Importe Stack de navigation.js

import Home from '../pages/Home';
import Login from '../pages/Login';
import RecuperarSenha from '../pages/RecuperarSenha';
import Cadastro from '../pages/Cadastro';
import TabNavigator from './TabNavigator';
import ProcurarContadores from '../components/ProcurarContadores';
import RegistrarProdutos from '../components/RegistrarProdutos';
import RegistrarCategorias from '../components/RegistrarCategorias';
import RegistrarClientes from '../components/RegistrarClientes';
import RegistrarServicos from '../components/RegistrarServicos';

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="MyTabs" component={TabNavigator} options={{ headerShown: false }} />
        {/* Rotas de Gerenciamento */}
        <Stack.Screen name="Registrar Produtos" component={RegistrarProdutos} />
        <Stack.Screen name="Registrar Serviços" component={RegistrarServicos} />
        <Stack.Screen name="Registrar Categorias" component={RegistrarCategorias} />
        <Stack.Screen name="Registrar Clientes" component={RegistrarClientes} />
        <Stack.Screen name="Procurar Contadores" component={ProcurarContadores} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}