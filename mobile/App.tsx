import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Router from "./src";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Router />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
