import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../pages/Home";
import Register from "../pages/Register";
import Read from "../pages/Read";
import Products from "../pages/Products";

const Stack = createStackNavigator();

const AppRouter: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#ECF0F1",
        headerStyle: {
          backgroundColor: "#6F1A07",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Cadastrar" }}
      />
      <Stack.Screen name="Read" component={Read} options={{ title: "Ler" }} />
      <Stack.Screen
        name="Products"
        component={Products}
        options={{ title: "Produtos" }}
      />
    </Stack.Navigator>
  );
};

export default AppRouter;
