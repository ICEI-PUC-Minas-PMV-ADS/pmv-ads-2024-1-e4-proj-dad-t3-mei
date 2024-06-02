import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const GerenciamentoScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.linkContainer}>
        <Text style={styles.linkText} onPress={() => navigation.navigate('Registrar Produtos')}>Produtos</Text>
        <View style={styles.arrow}></View>
      </View>
      <View style={styles.linkContainer}>
        <Text style={styles.linkText} onPress={() => navigation.navigate('Registrar Serviços')}>Servicos</Text>
        <View style={styles.arrow}></View>
      </View>
      <View style={styles.linkContainer}>
        <Text style={styles.linkText} onPress={() => navigation.navigate('Registrar Categorias')}>Categorias</Text>
        <View style={styles.arrow}></View>
      </View>
      <View style={styles.linkContainer}>
        <Text style={styles.linkText} onPress={() => navigation.navigate('Registrar Clientes')}>Clientes</Text>
        <View style={styles.arrow}></View>
      </View>
      <View style={styles.linkContainer}>
        <Text style={styles.linkText} onPress={() => navigation.navigate('Procurar Contadores')}>Contador</Text>
        <View style={styles.arrow}></View>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.9,
    padding: 20,
    backgroundColor: '#f2cb57',
    borderRadius: 10,
    margin: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  linkText: {
    color: '#470459',
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrow: {
    width: 10,
    height: 10,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'black',
    transform: [{ rotate: '45deg' }],
  },
});

export default GerenciamentoScreen;
