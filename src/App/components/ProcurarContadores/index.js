import React, { useEffect, useState } from 'react';
import { Button, Alert, Platform, Linking, View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const ProcurarContadores = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Não podemos acessar a localização');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const acharContador = () => {
    if (location) {
      const url = `https://www.google.com/maps/search/?api=1&query=contador&location=${location.coords.latitude},${location.coords.longitude}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Procure um contador próximo a você</Text>
      <Button title="Procurar Contador" onPress={acharContador} />
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
});

export default ProcurarContadores;