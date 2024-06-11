import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const urlDespesas = "https://swaggerapimeiamei.azurewebsites.net/api/Despesas";

const SaldoDespesa = () => {
  const [despesas, setDespesas] = useState([]);
  const [userId, setUserId] = useState(null);
  const [totalDespesas, setTotalDespesas] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.nameid);
  }, []);

  useEffect(() => {
    if (userId) {
      Promise.all([fetch(urlDespesas).then((response) => response.json())])
        .then(([despesaData]) => {
          const userDespesas = despesaData.filter(
            (fat) => fat.usuarioId === userId
          );

          const totalDespesas = userDespesas.reduce(
            (acc, cur) => acc + cur.valor,
            0
          );

          setDespesas(userDespesas);
          setTotalDespesas(totalDespesas);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        });
    }
  }, [userId]);

  return <>{totalDespesas}</>;
};

export default SaldoDespesa;
