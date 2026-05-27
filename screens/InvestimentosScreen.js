import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getTopCoins } from "../services/api";

export default function InvestimentoScreen() {
  const [investimentos, setInvestimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("todos");
  const navigation = useNavigation();

  useEffect(() => {
    async function carregarDados() {
      const dados = await getTopCoins();
      setInvestimentos(dados);
      setLoading(false);
    }
    carregarDados();
  }, []);

  const listaFiltrada = investimentos.filter((item) => {
    const variacao = item.price_change_percentage_24h || 0;
    if (filtro === "alta") return variacao >= 0;
    if (filtro === "baixa") return variacao < 0;
    return true;
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1c7c43" />
        <Text style={styles.loadingTexto}>Carregando mercado...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.headerTitulo}>Mercado Cripto</Text>
        <Text style={styles.headerSub}>Top moedas em tempo real</Text>
        <TouchableOpacity style={styles.rendaFixaBtn} onPress={() => navigation.navigate("RendaFixa")}>
          <Text style={styles.rendaFixaTexto}>🏦 Ver Renda Fixa</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filtroRow}>
        {[
          { key: "todos", label: "Todos" },
          { key: "alta", label: "📈 Alta" },
          { key: "baixa", label: "📉 Baixa" },
        ].map((f) => (
          <TouchableOpacity key={f.key} style={[styles.filtroBtn, filtro === f.key && styles.filtroBtnAtivo]} onPress={() => setFiltro(f.key)}>
            <Text style={[styles.filtroTexto, filtro === f.key && styles.filtroTextoAtivo]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={listaFiltrada}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item, index }) => {
          const variacao = item.price_change_percentage_24h || 0;
          const aumento = variacao >= 0;
          const preco = item?.current_price ?? 0;
          const mc = item?.market_cap ?? 0;
          const mcFormatado = mc >= 1e9 ? `$${(mc / 1e9).toFixed(1)}B` : mc >= 1e6 ? `$${(mc / 1e6).toFixed(1)}M` : `$${mc}`;

          return (
            <TouchableOpacity style={styles.card} onPress={() => Linking.openURL(`https://www.coingecko.com/en/coins/${item.id}`)} activeOpacity={0.8}>
              <Text style={styles.rank}>#{index + 1}</Text>
              <Image source={{ uri: item.image }} style={styles.icon} />
              <View style={{ flex: 1 }}>
                <Text style={styles.nome}>{item.name}</Text>
                <Text style={styles.simbolo}>{item.symbol.toUpperCase()} · Cap: {mcFormatado}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.preco}>${preco.toLocaleString()}</Text>
                <View style={[styles.variacaoBadge, { backgroundColor: aumento ? "#052e16" : "#3B1A1A" }]}>
                  <Text style={[styles.variacaoTexto, { color: aumento ? "#34D399" : "#F87171" }]}>
                    {aumento ? "▲" : "▼"} {Math.abs(variacao).toFixed(2)}%
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F1923" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0F1923" },
  loadingTexto: { color: "#6B7280", marginTop: 12, fontSize: 14 },
  headerBox: { backgroundColor: "#1A2535", padding: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: "#2D3748" },
  headerTitulo: { color: "#F9FAFB", fontSize: 20, fontWeight: "800" },
  headerSub: { color: "#6B7280", fontSize: 13, marginTop: 2, marginBottom: 14 },
  rendaFixaBtn: { backgroundColor: "#2D3748", borderRadius: 10, paddingVertical: 8, paddingHorizontal: 14, alignSelf: "flex-start" },
  rendaFixaTexto: { color: "#FBBF24", fontWeight: "700", fontSize: 13 },
  filtroRow: { flexDirection: "row", padding: 12, gap: 8, backgroundColor: "#1A2535", borderBottomWidth: 1, borderBottomColor: "#2D3748" },
  filtroBtn: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20, backgroundColor: "#0F1923", borderWidth: 1, borderColor: "#2D3748" },
  filtroBtnAtivo: { backgroundColor: "#1c7c43", borderColor: "#1c7c43" },
  filtroTexto: { color: "#6B7280", fontSize: 13, fontWeight: "600" },
  filtroTextoAtivo: { color: "#fff" },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#1A2535", marginHorizontal: 16, marginTop: 10, padding: 14, borderRadius: 14, borderWidth: 1, borderColor: "#2D3748" },
  rank: { color: "#374151", fontSize: 12, fontWeight: "700", width: 24, marginRight: 6 },
  icon: { width: 38, height: 38, borderRadius: 19, marginRight: 12 },
  nome: { color: "#F9FAFB", fontWeight: "700", fontSize: 14 },
  simbolo: { color: "#6B7280", fontSize: 12, marginTop: 2 },
  preco: { color: "#F9FAFB", fontWeight: "700", fontSize: 14 },
  variacaoBadge: { borderRadius: 6, paddingHorizontal: 6, paddingVertical: 3, marginTop: 4 },
  variacaoTexto: { fontSize: 12, fontWeight: "700" },
});
