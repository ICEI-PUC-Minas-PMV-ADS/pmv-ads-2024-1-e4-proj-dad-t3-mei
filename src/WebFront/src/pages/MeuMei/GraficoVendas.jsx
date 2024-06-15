import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

import { api } from "../../utils/config";
import { useAuth } from "../../provider/authProvider";

const GraficoVendas = () => {
  const [totalFaturamentos, setTotalFaturamentos] = useState([]);
  const [totalDespesas, setTotalDespesas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { usuarioId } = useAuth();

  useEffect(() => {
    if (usuarioId) {
      setLoading(true);
      Promise.all([
        fetch(`${api}/Faturamentos`).then((response) => response.json()),
        fetch(`${api}/Despesas`).then((response) => response.json()),
      ])
        .then(([faturamentosData, despesasData]) => {
          const desFiltrado = despesasData.filter(
            (des) => des.usuarioId === usuarioId
          );
          setTotalDespesas(desFiltrado);

          const fatFiltrado = faturamentosData.filter(
            (fat) => fat.usuarioId === usuarioId
          );
          setTotalFaturamentos(fatFiltrado);
          setLoading(false);
          setError("");
        })
        .catch((error) => {
          setError("Erro ao buscar dados:", error);
          setLoading(false);
        });
    }
  }, [usuarioId]);

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    // Inicializando os valores do faturamento e despesa para cada mês com 0
    const faturamentoPorMes = Array(12).fill(0);
    const despesaPorMes = Array(12).fill(0);

    // Calculando o valor de faturamento para cada mês
    totalFaturamentos.forEach((faturamento) => {
      const mes = new Date(faturamento.dataFaturamento).getMonth(); // Obtendo o mês (0 a 11)
      faturamentoPorMes[mes] += faturamento.valor;
    });

    // Calculando o valor de despesa para cada mês
    totalDespesas.forEach((despesa) => {
      const mes = new Date(despesa.dataDespesa).getMonth(); // Obtendo o mês (0 a 11)
      despesaPorMes[mes] += despesa.valor;
    });

    const data = {
      labels: meses,
      datasets: [
        {
          label: "Receitas",
          fill: false,
          data: faturamentoPorMes,
          backgroundColor: documentStyle.getPropertyValue("--green-500"),
          borderColor: documentStyle.getPropertyValue("--green-500"),
          tension: 0,
        },
        {
          label: "Despesas",
          data: despesaPorMes,
          fill: false,
          backgroundColor: documentStyle.getPropertyValue("--red-500"),
          borderColor: documentStyle.getPropertyValue("--red-500"),
          tension: 0,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [totalFaturamentos, totalDespesas]);

  return (
    <div className="grafico-conteudo">
      {error && <p className="erro-msg">{error}</p>}
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
};

export default GraficoVendas;
