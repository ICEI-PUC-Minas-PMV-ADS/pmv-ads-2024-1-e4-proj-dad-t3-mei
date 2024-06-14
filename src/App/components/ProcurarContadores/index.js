import React, { useEffect, useState } from 'react';
import { Alert, Platform, Linking, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import * as Location from 'expo-location';

const ProcurarContadores = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        setLoading(false);
        return;
      }

      let serviceEnabled = await Location.hasServicesEnabledAsync();
      if (!serviceEnabled) {
        Alert.alert('Serviço de localização desativado', 'Por favor, ative o serviço de localização nas configurações do seu dispositivo.');
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Não foi possível obter a localização');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const acharContador = () => {
    if (location) {
      const url = `https://www.google.com/maps/search/?api=1&query=contador&location=${location.coords.latitude},${location.coords.longitude}`;
      Linking.openURL(url);
    } else {
      Alert.alert('Localização não disponível', 'Não foi possível obter a localização atual.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Procure um contador próximo a você</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          onPress={acharContador}
          mode="contained"
          style={{ marginBottom: 10 }}
        > Procurar Contador </Button>
      )}
      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProcurarContadores;