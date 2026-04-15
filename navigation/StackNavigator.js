import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import PlanilhaScreen from "../screens/PlanilhaScreen";
import InvestimentosScreen from "../screens/InvestimentosScreen";
import PerfilScreen from "../screens/PerfilScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen 
           name="Login" 
  component={LoginScreen}
  options={{
    title: "cadastre-se ou faça login",
    headerStyle: {
      backgroundColor: "#FFD700"
    },
    headerTintColor: "#000",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 22
    }
  }}
        />

        <Stack.Screen 
          name="Home" 
  component={HomeScreen}
  options={{
    title: "Página Inicial",
    headerStyle: {
      backgroundColor: "#1E1E1E"
    },
    headerTintColor: "#fff"
  }}
        />

        <Stack.Screen 
          name="Planilha" 
          component={PlanilhaScreen}
          options={{ title: "Minha Planilha" }}
        />

        <Stack.Screen 
          name="Investimentos" 
          component={InvestimentosScreen}
          options={{ title: "Investimentos" }}
        />

        <Stack.Screen 
          name="Perfil" 
          component={PerfilScreen}
          options={{ title: "Meu Perfil" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}