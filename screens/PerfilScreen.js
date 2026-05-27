import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function PerfilScreen({ route, navigation }) {
  const { usuario } = route.params;
  const primeiroNome = usuario.nome.split(" ")[0];

  const itens = [
    { icone: "🎂", label: "Idade", valor: `${usuario.idade} anos` },
    { icone: "✉️", label: "E-mail", valor: usuario.email },
    { icone: "💵", label: "Salário Líquido", valor: `R$ ${Number(usuario.salario).toFixed(2)}` },
    { icone: "🌐", label: "Idioma", valor: usuario.idioma },
    { icone: "📱", label: "Telefone", valor: usuario.telefone },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topCard}>
        <View style={styles.avatarRing}>
          {usuario.foto ? (
            <Image source={{ uri: usuario.foto }} style={styles.foto} />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarLetra}>{primeiroNome[0]}</Text>
            </View>
          )}
        </View>
        <Text style={styles.nome}>{usuario.nome}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeTexto}>🟢 Conta Ativa</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: "#1c3a2e" }]}>
            <Text style={[styles.badgeTexto, { color: "#34D399" }]}>Plano Free</Text>
          </View>
        </View>
      </View>

      <Text style={styles.secaoTitulo}>Informações pessoais</Text>

      {itens.map((item) => (
        <View key={item.label} style={styles.itemCard}>
          <Text style={styles.itemIcone}>{item.icone}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemLabel}>{item.label}</Text>
            <Text style={styles.itemValor}>{item.valor}</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.sairBtn} onPress={() => navigation.navigate("Login")} activeOpacity={0.8}>
        <Text style={styles.sairTexto}>Sair da conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F1923" },
  content: { padding: 20, paddingBottom: 40 },
  topCard: { backgroundColor: "#1A2535", borderRadius: 20, padding: 24, alignItems: "center", marginBottom: 24 },
  avatarRing: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: "#1c7c43", justifyContent: "center", alignItems: "center", marginBottom: 14, overflow: "hidden" },
  foto: { width: 100, height: 100, borderRadius: 50 },
  avatarFallback: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#1c7c43", justifyContent: "center", alignItems: "center" },
  avatarLetra: { color: "#fff", fontSize: 40, fontWeight: "800" },
  nome: { color: "#F9FAFB", fontSize: 22, fontWeight: "800", marginBottom: 10 },
  badgeRow: { flexDirection: "row", gap: 8 },
  badge: { backgroundColor: "#1A3020", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  badgeTexto: { color: "#6B7280", fontSize: 12, fontWeight: "600" },
  secaoTitulo: { color: "#6B7280", fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 },
  itemCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#1A2535", borderRadius: 14, padding: 16, marginBottom: 10, borderLeftWidth: 3, borderLeftColor: "#2D3748" },
  itemIcone: { fontSize: 20, marginRight: 14 },
  itemLabel: { color: "#6B7280", fontSize: 12, marginBottom: 2 },
  itemValor: { color: "#F9FAFB", fontSize: 15, fontWeight: "600" },
  sairBtn: { marginTop: 24, backgroundColor: "#3B1A1A", borderRadius: 14, padding: 16, alignItems: "center", borderWidth: 1, borderColor: "#EF4444" },
  sairTexto: { color: "#EF4444", fontWeight: "700", fontSize: 15 },
});
