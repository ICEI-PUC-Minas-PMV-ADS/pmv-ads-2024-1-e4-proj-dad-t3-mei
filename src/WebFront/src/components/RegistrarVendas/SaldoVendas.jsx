import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const urlFaturamentos = "https://swaggerapimeiamei.azurewebsites.net/api/Faturamentos";

const SaldoFaturamento = () => {
  const [faturamentos, setFaturamentos] = useState([]);
  const [userId, setUserId] = useState(null);
  const [totalFaturamentos, setTotalFaturamentos] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.nameid);
  }, []);

  useEffect(() => {
    if (userId) {
      Promise.all([fetch(urlFaturamentos).then((response) => response.json())])
        .then(([faturamentosData]) => {
          const userFaturamentos = faturamentosData.filter(
            (fat) => fat.usuarioId === userId
          );

          const totalFaturamentos = userFaturamentos.reduce(
            (acc, cur) => acc + cur.valor,
            0
          );

          setFaturamentos(userFaturamentos);
          setTotalFaturamentos(totalFaturamentos);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        });
    }
  }, [userId]);

  return <>{totalFaturamentos}</>;
};

export default SaldoFaturamento;
