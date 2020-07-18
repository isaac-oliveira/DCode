import React, { useState } from "react";
import { View, KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import { BarCodeEvent } from "expo-barcode-scanner";

import BarCode from "../components/BarCode";
import Input from "../components/Input";
import Button from "../components/Button";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";

type ProductKey = "barcode" | "name" | "price" | "amount";

interface Product {
  barcode: string;
  name: string;
  price: number;
  amount: number;
}

const Read: React.FC = () => {
  const [product, setProduct] = useState<Product>({} as Product);
  const [barcodeScanned, setBarcodeScanned] = useState<string>("");

  const navigation = useNavigation();

  function changeProductProperties(name: string, value: string | number) {
    setProduct({ ...product, [name]: value });
  }

  async function getProduct(barcode: string) {
    const { data } = await api.get(`/products/${barcode}`);
    if (data) {
      setProduct(data as Product);
    } else {
      alert("Produto não encontrado!");
      setProduct({} as Product);
    }
  }

  async function onScanned(props: BarCodeEvent) {
    const { data } = props;
    if (barcodeScanned !== data || !barcodeScanned) {
      await getProduct(data);
      setBarcodeScanned(data);
    }
  }

  async function handleFetchList() {
    navigation.navigate("Products");
  }

  function getValue(name: ProductKey) {
    if (!product) return "";

    const value = product[name];
    if (!value) return "";

    return String(value);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <BarCode onScanned={onScanned}>
        <View style={styles.content}>
          <View>
            <View style={styles.inputContainer}>
              <Input
                style={styles.inputCode}
                placeholder="Digite o código de barra"
                keyboardType="number-pad"
                onChangeText={(value) =>
                  changeProductProperties("barcode", value)
                }
                onSubmitEditing={() => getProduct(product.barcode)}
                value={getValue("barcode")}
              />
            </View>
            <Text style={styles.title}>Informações do Produto</Text>
            <View style={styles.inputContainer}>
              <Input
                placeholder="Nome"
                editable={false}
                onChangeText={(value) => changeProductProperties("name", value)}
                value={getValue("name")}
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                placeholder="Preço"
                editable={false}
                keyboardType="decimal-pad"
                onChangeText={(value) =>
                  changeProductProperties("price", value)
                }
                value={getValue("price")}
              />
              <Input
                placeholder="Quantidade"
                editable={false}
                keyboardType="number-pad"
                onChangeText={(value) =>
                  changeProductProperties("amount", value)
                }
                value={getValue("amount")}
              />
            </View>
          </View>
          <Button
            text="Listar Produtos"
            textColor="#ECF0F1"
            backgroundColor="#2B2118"
            onPress={handleFetchList}
          />
        </View>
      </BarCode>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
  },
  inputCode: {
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2B2118",
    textAlign: "center",
    padding: 15,
  },
  inputContainer: {
    flexDirection: "row",
  },
});

export default Read;
