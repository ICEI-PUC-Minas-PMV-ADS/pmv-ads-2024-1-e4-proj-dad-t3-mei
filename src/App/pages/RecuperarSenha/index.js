import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';


export default function RecuperarSenha({ navigation }) {
  const [email, setEmail] = useState('');

  const handleRecuperarSenha = () => {
    // Aqui você pode lidar com a lógica de recuperação de senha
    console.log(email);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('../../assets/Logo.png')} // Substitua pelo caminho para a sua logo
        style={{ width: 100, height: 100 }}
      />
      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={{ width: '80%', marginBottom: 10 }}
      />
      <Button mode="contained" onPress={handleRecuperarSenha}>
        Recuperar Senha
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('Login')}>
        Voltar ao Login
      </Button>
    </View>
  );
}