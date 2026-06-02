import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import PlanilhaScreen from "../screens/PlanilhaScreen";
import InvestimentosScreen from "../screens/InvestimentosScreen";
import PerfilScreen from "../screens/PerfilScreen";
import RendaFixaScreen from "../screens/RendaFixaScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#1A2535" },
          headerTintColor: "#F9FAFB",
          headerTitleStyle: { fontWeight: "700", fontSize: 17 },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: "#0F1923" },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Monetra", headerBackVisible: false }}
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
        <Stack.Screen
          name="RendaFixa"
          component={RendaFixaScreen}
          options={{ title: "Renda Fixa" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
