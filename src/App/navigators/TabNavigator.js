import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Tab } from './navigation';
import MeuMei from '../pages/MeuMei';
import Gerenciamento from '../pages/Gerenciamento';
import Registros from '../pages/Registros';
import Perfil from '../pages/Perfil';


const ICON_MAP = {
  'Meu Mei': 'briefcase',
  Gerenciamento: 'settings',
  Registros: 'list',
  Perfil: 'person',
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = `${ICON_MAP[route.name]}${focused ? '' : '-outline'}`;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Meu Mei" component={MeuMei} />
      <Tab.Screen name="Gerenciamento" component={Gerenciamento} />
      <Tab.Screen name="Registros" component={Registros} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}