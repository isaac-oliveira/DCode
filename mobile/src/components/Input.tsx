import React from "react";
import { View, TextInput, TextInputProps, StyleSheet } from "react-native";

const Input: React.FC<TextInputProps> = (props) => {
  return (
    <View style={styles.container}>
      <TextInput {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "black",
    padding: 10,
    margin: 10,
  },
});

export default Input;
