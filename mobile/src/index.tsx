import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppRouter from "./routes/AppRouter";

const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#6F1A07" />
      <AppRouter />
    </NavigationContainer>
  );
};

export default Router;
