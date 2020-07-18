import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";

const Home: React.FC = () => {
  const barCode = require("../assets/bar-code.png");
  const navigation = useNavigation();

  function handleRegister() {
    navigation.navigate("Register");
  }

  function handleRead() {
    navigation.navigate("Read");
  }

  return (
    <View style={styles.container}>
      <View style={styles.barCodeContainer}>
        <View style={styles.barCode}>
          <Image source={barCode} resizeMode="contain" />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="Cadastrar"
          textColor="#ECF0F1"
          backgroundColor="#2B2118"
          onPress={handleRegister}
        />
        <Button
          text="Ler"
          textColor="#2B2118"
          backgroundColor="#ECF0F1"
          onPress={handleRead}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6F1A07",
  },
  barCodeContainer: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  barCode: {
    width: 140,
    height: 140,
    padding: 20,
    borderRadius: 120,
    backgroundColor: "#ECF0F1",
  },
  buttonContainer: {
    height: "60%",
    marginHorizontal: 20,
  },
});

export default Home;
