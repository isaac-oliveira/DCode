import React, { useState, useEffect } from "react";
import { FlatList, ListRenderItemInfo, Text, StyleSheet } from "react-native";
import api from "../services/api";

interface Product {
  id: number;
  barcode: string;
  name: string;
  price: number;
  amount: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([] as Product[]);

  useEffect(() => {
    api.get("/products").then(({ data }) => {
      setProducts(data as Product[]);
    });
  }, []);

  const renderItem = ({ item }: ListRenderItemInfo<Product>) => {
    return <Text style={styles.title}>{item.name}</Text>;
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#2B2118",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    margin: 10,
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#ECF0F1",
    borderWidth: 3,
    borderColor: "#2B2118",
  },
});

export default Products;
