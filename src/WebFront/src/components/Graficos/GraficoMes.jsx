import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "./Graficos.css";

Chart.register(...registerables);
const GraficoMes = () => {
  const data = {
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
    ], // 31 days
    datasets: [
      {
        label: "Despesas",
        data: [
          100, 1200, 300, 400, 500, 600, 0, 13, 82, 56, 80, 50, 100, 1200, 300,
          400, 500, 600, 0, 13, 82, 56, 80, 50, 100, 1200, 300, 400, 500, 600,
          0,
        ],
        fill: false,
        borderColor: "red",
        borderWidth: 2,
        pointStyle: "circle",
        pointRadius: 3,
        backgroundColor: "red",
        pointBrabackgroundColor: "red",
        pointBorderWidth: 1,
      },
      {
        label: "Receitas",
        data: [
          1200, 1100, 1000, 2477, 2341, 700, 600, 500, 400, 2000, 1600, 1200,
          1200, 1100, 1000, 2477, 2341, 700, 600, 500, 400, 2000, 1600, 1200,
          1200, 1100, 1000, 2477, 2341, 700,
        ],
        fill: false,
        borderColor: "#b83dff",
        borderWidth: 2,
        pointStyle: "circle",
        pointRadius: 3,
        backgroundColor: "#b83dff",
        pointBrabackgroundColor: "#b83dff",
        pointBorderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="FlexContainer">
      <div className="ChartContainer dchart">
        <Line data={data} options={options} />
        <p className="text-center">Mês</p>
      </div>
    </div>
  );
};
export default GraficoMes;
