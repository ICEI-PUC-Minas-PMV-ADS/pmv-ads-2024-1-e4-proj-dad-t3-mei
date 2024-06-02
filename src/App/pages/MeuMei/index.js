import * as React from "react";
import { IconButton, MD3Colors, Button } from "react-native-paper";

import { View, ScrollView, StyleSheet, Text } from "react-native";

import GraficoMes from "../../components/Graficos/GraficoMes";
import GraficoAno from "../../components/Graficos/GraficoAno";
import SaldoDespesas from "../../components/SaldoDespesas";
import SaldoVendas from "../../components/SaldoVendas";
import Container from "../../components/Container";
import BarraProgresso from "../../components/BarraProgresso";
import VendasDespesas from "../../components/VendasDespesas";

const Faturamento = () => {
  const [grafico, setGrafico] = React.useState("mes");

  return (
    <View style={styles.mainContainer}>
      <Container>
        <ScrollView>
          <View style={styles.buttonIcon}>
            <Text style={styles.text}>Limite MEI</Text>
            <View style={styles.buttonIcon}>
              <Text style={styles.textInfo}>faturamento / mês</Text>
              <IconButton
                icon="information-outline"
                iconColor={"#470459"}
                size={24}
                onPress={() => console.log("Pressed")}
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <BarraProgresso progress={0.33} />
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.equalFlexItem}>
              <SaldoVendas />
            </View>
            <View style={styles.equalFlexItem}>
              <SaldoDespesas />
            </View>
          </View>
          <VendasDespesas />
        </ScrollView>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
    paddingVertical: 3,
    color: "#470459",
  },
  textInfo: {
    fontSize: 12,
    color: "#aaa",
  },
});

export default Faturamento;
