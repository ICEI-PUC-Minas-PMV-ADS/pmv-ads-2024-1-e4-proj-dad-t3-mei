import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import CurrencyInput from "react-native-currency-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const urlCategorias = "http://10.0.2.2:5062/api/Categorias";
const url = "http://10.0.2.2:5062/api/Despesas";

const Despesas = () => {
  const [usuarioId, setUserId] = useState("");
  const [despesas, setDespesas] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [openD, setOpenD] = useState(false);
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [valor, setValor] = useState();
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const decodedToken = jwtDecode(token);
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
      fetch(urlCategorias)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao carregar categorias.");
          }
          return response.json();
        })
        .then((data) => {
          setCategorias(data.filter((cat) => cat.usuarioId === usuarioId));
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
    setCategorias([]);
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
      dataDespesa: data,
      usuarioId,
      categoriaId: selectedCategoria,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados");
      }
      Alert.alert("Atenção!", "Despesa adicionada com sucesso", [
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
      setDespesas([...despesas, newData]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "nome":
        setNomeDespesa(value);
        break;
      case "valor":
        setValorDespesa(value);
        break;
      case "dataDespesa":
        setDataDespesa(value);
        break;
      case "categoria":
        setSelectedCategoria(value);
        break;
      default:
        break;
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
      <Text style={styles.title}>Adicione uma despesa</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.coluna}>
          <View>
            <TextInput
              style={styles.input}
              label="Mais informações"
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
              placeholder="Categorias"
              open={openD}
              value={selectedCategoria}
              items={categorias.map((categoria) => ({
                label: categoria.nome,
                value: categoria.id,
              }))}
              setOpen={setOpenD}
              setValue={setSelectedCategoria}
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
        style={{ marginTop: 15, backgroundColor: "#e72424" }}
        mode="contained"
        onPress={handleSubmit}
      >
        Adicionar despesa
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

export default Despesas;
