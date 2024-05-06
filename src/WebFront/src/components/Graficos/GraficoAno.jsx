import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "./Graficos.css";

Chart.register(...registerables);
const GraficoAno = () => {
  const data = {
    labels: [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ],
    datasets: [
      {
        label: "Despesas",
        data: [100, 1200, 300, 400, 500, 600, 0, 13, 82, 56, 80, 50],
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
        <p className="text-center">Ano</p>
      </div>
    </div>
  );
};

export default GraficoAno;
