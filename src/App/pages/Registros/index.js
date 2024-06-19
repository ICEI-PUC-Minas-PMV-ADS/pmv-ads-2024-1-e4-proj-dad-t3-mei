import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { IconButton } from 'react-native-paper';
import API_URLS from '../../config/apiUrls';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode';

const Registros = () => {
  const [faturamentos, setFaturamentos] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [userId, setUserId] = useState(null);
  const [atualizar, setAtualizar] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokenAndDecode = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.nameid);
      }
    };

    fetchTokenAndDecode();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchData = () => {
        setLoading(true);
        Promise.all([
          fetch(`${API_URLS.FATURAMENTOS}`).then((response) => response.json()),
          fetch(`${API_URLS.DESPESAS}`).then((response) => response.json()),
          fetch(`${API_URLS.PRODUTOS}`).then((response) => response.json()),
          fetch(`${API_URLS.SERVICOS}`).then((response) => response.json()),
          fetch(`${API_URLS.CATEGORIAS}`).then((response) => response.json())
        ])
          .then(
            ([faturamentosData, despesasData, produtosData, servicosData, categoriasData]) => {
              setFaturamentos(
                faturamentosData.filter((fat) => fat.usuarioId === userId)
              );
              setDespesas(despesasData.filter((des) => des.usuarioId === userId));
              setProdutos(produtosData.filter((pro) => pro.usuarioId === userId));
              setServicos(servicosData.filter((ser) => ser.usuarioId === userId));
              setCategorias(categoriasData.filter((cat) => cat.usuarioId === userId));
            }
          )
          .catch((error) => {
            console.error("Erro ao buscar dados:", error);
          })
          .finally(() => setLoading(false));
      };

      fetchData(); // Chama imediatamente ao entrar

      const intervalId = setInterval(fetchData, 8000); // Atualiza a cada 5 segundos

      return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar
    }
  }, [userId, atualizar]);

  const handleExcluirRegistro = async (tipo, id) => {
    try {
      let url;
      switch (tipo) {
        case "Faturamentos":
          url = `${API_URLS.FATURAMENTOS}/${id}`;
          break;
        case "Despesas":
          url = `${API_URLS.DESPESAS}/${id}`;
          break;
        case "Produtos":
          url = `${API_URLS.PRODUTOS}/${id}`;
          break;
        case "Servicos":
          url = `${API_URLS.SERVICOS}/${id}`;
          break;
        case "Categorias":
          url = `${API_URLS.CATEGORIAS}/${id}`;
          break;
        default:
          throw new Error(`Tipo desconhecido: ${tipo}`);
      }

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Erro ao excluir o ${tipo}`);
      }

      // Restante do código...
    } catch (error) {
      console.error(`Erro ao excluir o ${tipo}: `, error);
    }
  };

  const buscaIdsCategorias = (rowData, categorias) => {
    if (
      !rowData ||
      !rowData.categoriasId ||
      rowData.categoriasId.length === 0
    ) {
      return "Contas";
    }

    const nomes = rowData.categoriasId.map((id) => {
      const categoria = categorias.find((categoria) => categoria.id === id);
      return categoria ? categoria.nome : "Sem categoria cadastrada";
    });

    return nomes.join(", ");
  };


  const buscarIdsProdutos = (rowData, produtos, servicos) => {
    if (!rowData) {
      return "Tênis"; // exemplo

    }
  }

  const buscarIdsServicos = (rowData, servicos) => {
    if (!rowData) {
      return "N/A";
    }
  }



  const renderFaturamentosRow = (fat) => {
    return {
      venda: fat.nome,
      produto: buscarIdsProdutos(fat.produtoId, produtos),
      servico: buscarIdsServicos(fat.servicoId, servicos),
      meioDePagamento: fat.meioDePagamento,
      valor: fat.valor.toString(),
      data: fat.dataFaturamento,
      button: <IconButton
        icon="delete"
        color="red"
        size={20}
        onPress={() => handleExcluirRegistro("Faturamentos", fat.id)}
      />
    };
  };

  const renderDespesasRow = (des) => {
    return {
      nome: des.nome,
      categoria: buscaIdsCategorias(des.categoriaId, categorias),
      valor: des.valor.toString(),
      dataDespesa: des.dataDespesa,
      button: <IconButton
        icon="delete"
        color="red"
        size={20}
        onPress={() => handleExcluirRegistro("Despesas", des.id)}
      />
    };
  };


  const renderTable = (head, data, renderRow, title) => {
    const widthArr = new Array(head.length).fill(80); // Altere 80 para a largura desejada

    return (
      <ScrollView vertical={true}>
        <ScrollView horizontal={true}>
          <View>
            <Text>{title}</Text>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
              <Row data={head} style={styles.head} widthArr={widthArr} />
              {data.map((rowData, index) => (
                <Row key={index} data={Object.values(renderRow(rowData))} widthArr={widthArr} />
              ))}
            </Table>
          </View>
        </ScrollView>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.box}>
          {renderTable(
            ["Venda", "Produto", "Serviço", "Meio de Pagamento", "Valor", "Data", ""],
            faturamentos,
            renderFaturamentosRow,
            "Registros de vendas"
          )}
          {renderTable(
            ["Despesa", "Categoria", "Valor", "Data", ""],
            despesas,
            renderDespesasRow,
            "Registros de despesas"
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  box: {
    flex: 1,
    margin: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ffc107',
    borderRadius: 8
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff'
  },
});

export default Registros;