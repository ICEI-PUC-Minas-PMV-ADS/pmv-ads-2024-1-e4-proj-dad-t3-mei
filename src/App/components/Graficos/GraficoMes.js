import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const GraficoMes = () => {
  const data = {
    labels: [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
      "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
      "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
    ],
    datasets: [
      {
        data: [
          1200, 1100, 1000, 2477, 2341, 700, 600, 500, 400, 2000, 1600, 1200,
          1200, 1100, 1000, 2477, 2341, 700, 600, 500, 400, 2000, 1600, 1200,
          1200, 1100, 1000, 2477, 2341, 700,
        ],
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
      <Text style={{ textAlign: 'center' }}>Mês</Text>
    </View>
  );
};

export default GraficoMes;