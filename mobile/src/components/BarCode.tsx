import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  BarCodeScanner,
  BarCodeScannedCallback,
  BarCodeEvent,
} from "expo-barcode-scanner";

interface BarCodeProps {
  onScanned: BarCodeScannedCallback;
}

const BarCode: React.FC<BarCodeProps> = (props) => {
  const { children, onScanned } = props;
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [timeOutID, setTimeOutID] = useState<number | null>(null);

  useEffect(() => {
    BarCodeScanner.requestPermissionsAsync().then(({ status }) => {
      setHasPermission(status === "granted");
    });
  }, []);

  function onBarCodeScanned(event: BarCodeEvent) {
    if (timeOutID) clearTimeout(timeOutID);
    if (!scanned) {
      setScanned(true);
    }
    onScanned(event);
    const id = setTimeout(() => {
      setScanned(false);
      setTimeOutID(null);
    }, 1000);

    setTimeOutID(id);
  }

  if (hasPermission === null)
    return (
      <View style={styles.errorMessage}>
        <Text>Esperando permissão</Text>
      </View>
    );

  if (hasPermission === false)
    return (
      <View style={styles.errorMessage}>
        <Text>Sem acesso a câmera</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={styles.barCode}
        onBarCodeScanned={onBarCodeScanned}
      />
      <View
        style={[
          styles.line,
          { backgroundColor: scanned ? "#1A6F07" : "#6F1A07" },
        ]}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  barCode: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 28,
    top: 0,
    zIndex: 0,
  },
  line: {
    height: 5,
    position: "absolute",
    left: 0,
    right: 0,
    top: 75,
    zIndex: 1,
  },
  content: {
    backgroundColor: "#ECF0F1",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 150,
    zIndex: 1,
  },
});

export default BarCode;
