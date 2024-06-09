import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import CurrencyInput from "react-native-currency-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import API_URLS from "../../config/apiUrls";

const Vendas = () => {
  const [usuarioId, setUserId] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [open, setOpen] = useState(false);
  const [openP, setOpenP] = useState(false);
  const [openS, setOpenS] = useState(false);
  const [meioDePagamento, setMeioDePagamento] = useState("Dinheiro");
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [valor, setValor] = useState();
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const decodedToken = jwtDecode(token.toString());
        setUserId(decodedToken.nameid);
      } catch (error) {
        console.error("Erro ao buscar o token:", error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (usuarioId) {
      setIsLoading(true);
      Promise.all([
        fetch(API_URLS.PRODUTOS).then((response) => response.json()),
        fetch(API_URLS.SERVICOS).then((response) => response.json()),
      ])
        .then(([produtosData, servicosData]) => {
          setProdutos(
            produtosData.filter((produto) => produto.usuarioId === usuarioId)
          );

          setServicos(
            servicosData.filter((servico) => servico.usuarioId === usuarioId)
          );
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [usuarioId]);

  const limparCampos = () => {
    setNome("");
    setData(new Date());
    setValor("");
    setProdutos([]);
    setServicos([]);
    setMeioDePagamento("Pix");
  };

  const handleSubmit = async () => {
    if (!nome.trim()) {
      setError("O campo 'Nome' não pode estar vazio.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const dataToSend = {
      nome,
      valor,
      dataFaturamento: data,
      meioDePagamento,
      usuarioId,
      produtoId: selectedProduct,
      servicoId: selectedService,
    };

    try {
      const response = await fetch(API_URLS.FATURAMENTOS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados");
      }
      Alert.alert("Atenção!", "Venda adicionada com sucesso", [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => {
            limparCampos();
          },
        },
      ]);
      const newData = await response.json();
      setFaturamentos([...faturamentos, newData]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nome") {
      setNome(value);
    } else if (name === "valor") {
      setValor(value);
    } else if (name === "Data") {
      setData(value);
    } else if (name === "meioDePagamento") {
      setMeioDePagamento(value);
    } else if (name === "selectedProduct") {
      setSelectedProduct(value);
    } else if (name === "selectedService") {
      setSelectedService(value);
    }
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowDatePicker(false);
    setData(currentDate);
  };

  return (
    <View>
      <Text style={styles.title}>Adicione uma venda</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.coluna}>
          <View>
            <TextInput
              style={styles.input}
              label="Venda de ..."
              value={nome}
              onChange={handleChange}
              onChangeText={(text) => setNome(text)}
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={showDatePickerHandler}
              style={styles.dateContainer}
            >
              <Button icon="calendar">
                <Text style={{ fontSize: 16 }}>
                  {data.toLocaleDateString("pt-BR")}
                </Text>
              </Button>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={data}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
          <View style={styles.container}>
            <CurrencyInput
              placeholder="R$ 0,00"
              style={styles.currencyInput}
              value={valor}
              onChangeValue={setValor}
              prefix="R$"
              delimiter="."
              separator=","
              precision={2}
              minValue={0}
              onChangeText={() => { }}
            />
          </View>
        </View>
        <View style={styles.coluna}>
          <View style={styles.inputContainer}>
            <DropDownPicker
              placeholder="Produto"
              open={openP}
              value={selectedProduct}
              items={produtos.map((produto) => ({
                label: produto.nome,
                value: produto.id,
              }))}
              setOpen={setOpenP}
              setValue={setSelectedProduct}
              style={styles.ddp}
              listMode="MODAL"
              modalAnimationType="fade"
              modalContentContainerStyle={{
                backgroundColor: "#d9d9d9",
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <DropDownPicker
              placeholder="Serviço"
              open={openS}
              value={selectedService}
              items={servicos.map((servico) => ({
                label: servico.nome,
                value: servico.id,
              }))}
              setOpen={setOpenS}
              setValue={setSelectedService}
              style={styles.ddp}
              listMode="MODAL"
              modalAnimationType="fade"
              modalContentContainerStyle={{
                backgroundColor: "#d9d9d9",
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <DropDownPicker
              placeholder="Meio de pagamento"
              open={open}
              value={meioDePagamento}
              items={[
                { label: "Pix", value: 0 },
                { label: "Dinheiro", value: 1 },
                { label: "Cartão", value: 2 },
                { label: "Outros", value: 3 },
              ]}
              setOpen={setOpen}
              setValue={setMeioDePagamento}
              style={styles.ddp}
              listMode="MODAL"
              modalAnimationType="fade"
              modalContentContainerStyle={{
                backgroundColor: "#d9d9d9",
              }}
            />
          </View>
        </View>
      </View>
      <Button
        style={{ marginTop: 15, backgroundColor: "#349c14" }}
        mode="contained"
        onPress={handleSubmit}
      >
        Adicionar venda
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  coluna: {
    flexDirection: "column",
    flex: 1,
    gap: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
    color: "#470459",
  },
  ddp: {
    borderRadius: 0,
    borderWidth: 0,
    height: 55,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    height: 55,
    fontSize: 16,
  },
  inputContainer: {
    marginLeft: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    height: 55,
  },
  currencyInput: {
    backgroundColor: "#fff",
    padding: 15,
    fontSize: 16,
    height: 55,
  },
});

export default Vendas;
