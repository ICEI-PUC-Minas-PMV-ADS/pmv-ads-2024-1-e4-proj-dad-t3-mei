import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
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
        });
    }
  }, [userId]);

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

  const getNomeById = (id, array) => {
    const item = array.find(item => item.id === id);
    return item ? item.nome : '';
  };


  const renderFaturamentosRow = (fat) => {
    return {
      data: fat.dataFaturamento,
      venda: fat.nome,
      produto: getNomeById(fat.produtoId, produtos),
      servico: getNomeById(fat.servicoId, servicos),
      meioDePagamento: fat.meioDePagamento,
      valor: fat.valor.toString(),
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
      dataDespesa: des.dataDespesa,
      nome: des.nome,
      categoria: getNomeById(des.categoriaId, categorias),
      valor: des.valor.toString(),
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
      <View style={styles.box}>
        {renderTable(
          ["Data", "Venda", "Produto", "Serviço", "Meio de Pagamento", "Valor", ""],
          faturamentos,
          renderFaturamentosRow,
          "Registros de vendas"
        )}
        {renderTable(
          ["Data", "Despesa", "Categoria", "Valor", ""],
          despesas,
          renderDespesasRow,
          "Registros de despesas"
        )}
      </View>
    </View>
  );



  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {renderFaturamentosTable(
          ["Data", "Venda", "Produto", "Serviço", "Meio de Pagamento", "Valor", ""],
          faturamentos,
          renderFaturamentosRow,
          "Registros de vendas"
        )}
        {renderTable(
          ["Data", "Despesa", "Categoria", "Valor", ""],
          despesas,
          renderDespesasRow,
          "Registros de despesas"
        )}
      </View>
    </View>
  );
};

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