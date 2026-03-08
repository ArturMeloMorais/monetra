import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Bem Vindo ao Monetra!</Text>
      </View>
 
      <Text style={styles.subtitle}>Olá, Lucas!</Text>
      <Text style={styles.section}>Meus Lembretes</Text>

      <View style={styles.buttons}>
        <Button
          title="Ir para Planilha"
          onPress={() => navigation.navigate("Planilha")}
        />

        <Button
          title="Investimentos"
          onPress={() => navigation.navigate("Investimentos")}
        />

        <Button
          title="Perfil"
          onPress={() => navigation.navigate("Perfil")}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },

  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },

  section: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },

  buttons: {
    gap: 10,
    flexDirection: "row",
  },
});