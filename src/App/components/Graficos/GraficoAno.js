import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const GraficoAno = () => {
  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    datasets: [
      {
        data: [1200, 1100, 1000, 2477, 2341, 700, 600, 500, 400, 2000, 1600, 1200],
        color: (opacity = 1) => `rgba(184, 61, 255, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  return (
    <View>
      <LineChart
        data={data}
        width={320}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      <Text style={{ textAlign: 'center' }}>Ano</Text>
    </View>
  );
};

export default GraficoAno;