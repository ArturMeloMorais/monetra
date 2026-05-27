import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Linking, TouchableOpacity } from "react-native";

const rendaFixa = [
  { id: "tesourodireto", nome: "Tesouro Direto", sigla: "TD", descricao: "Títulos públicos federais para pessoa física. Garantia do Tesouro Nacional com liquidez diária e rentabilidade acima da poupança.", risco: "Baixo", rendimento: "Selic / IPCA+", minimo: "R$ 30", url: "https://www.tesourodireto.com.br/", cor: "#1c7c43" },
  { id: "cdb", nome: "CDB", sigla: "CDB", descricao: "Certificado de Depósito Bancário. Empréstimo ao banco com rendimento prefixado ou pós-fixado, coberto pelo FGC até R$ 250 mil.", risco: "Baixo", rendimento: "CDI+", minimo: "R$ 1", url: "https://www.b3.com.br/", cor: "#2563EB" },
  { id: "lci", nome: "LCI / LCA", sigla: "LCI", descricao: "Letras de Crédito Imobiliário e do Agronegócio. Isenção de IR para pessoa física, garantidas pelo FGC, boa alternativa ao CDB.", risco: "Baixo", rendimento: "CDI %", minimo: "R$ 500", url: "https://www.b3.com.br/", cor: "#7C3AED" },
  { id: "debentures", nome: "Debêntures", sigla: "DEB", descricao: "Títulos emitidos por empresas privadas para captar recursos. Rentabilidade geralmente superior ao CDB com risco moderado.", risco: "Médio", rendimento: "IPCA+ / CDI+", minimo: "R$ 1.000", url: "https://www.b3.com.br/", cor: "#B45309" },
];

const RISCO_COR = { Baixo: "#34D399", Médio: "#FBBF24", Alto: "#F87171" };

export default function RendaFixaScreen() {
  const [expandido, setExpandido] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Renda Fixa</Text>
        <Text style={styles.headerSub}>Comparativo de investimentos conservadores</Text>
      </View>
      <FlatList
        data={rendaFixa}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        renderItem={({ item }) => {
          const aberto = expandido === item.id;
          return (
            <TouchableOpacity
              style={[styles.card, aberto && { borderColor: item.cor }]}
              onPress={() => setExpandido(aberto ? null : item.id)}
              activeOpacity={0.85}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.siglaBox, { backgroundColor: item.cor + "33" }]}>
                  <Text style={[styles.sigla, { color: item.cor }]}>{item.sigla}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardNome}>{item.nome}</Text>
                  <View style={styles.metaRow}>
                    <View style={[styles.riscoBadge, { backgroundColor: RISCO_COR[item.risco] + "22" }]}>
                      <Text style={[styles.riscoTexto, { color: RISCO_COR[item.risco] }]}>{item.risco}</Text>
                    </View>
                    <Text style={styles.rendimento}>{item.rendimento}</Text>
                  </View>
                </View>
                <Text style={styles.chevron}>{aberto ? "▲" : "▼"}</Text>
              </View>
              {aberto && (
                <View style={styles.expandido}>
                  <Text style={styles.descricao}>{item.descricao}</Text>
                  <View style={styles.detalhesRow}>
                    <View style={styles.detalheItem}>
                      <Text style={styles.detalheLabel}>Mínimo</Text>
                      <Text style={styles.detalheValor}>{item.minimo}</Text>
                    </View>
                    <View style={styles.detalheItem}>
                      <Text style={styles.detalheLabel}>Risco</Text>
                      <Text style={[styles.detalheValor, { color: RISCO_COR[item.risco] }]}>{item.risco}</Text>
                    </View>
                    <View style={styles.detalheItem}>
                      <Text style={styles.detalheLabel}>Rendimento</Text>
                      <Text style={styles.detalheValor}>{item.rendimento}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.verBtn, { backgroundColor: item.cor }]}
                    onPress={() => Linking.openURL(item.url)}
                  >
                    <Text style={styles.verTexto}>Saber mais →</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F1923" },
  header: { backgroundColor: "#1A2535", padding: 20, borderBottomWidth: 1, borderBottomColor: "#2D3748" },
  headerTitulo: { color: "#F9FAFB", fontSize: 20, fontWeight: "800" },
  headerSub: { color: "#6B7280", fontSize: 13, marginTop: 4 },
  card: { backgroundColor: "#1A2535", borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1.5, borderColor: "#2D3748" },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  siglaBox: { width: 48, height: 48, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  sigla: { fontWeight: "800", fontSize: 13 },
  cardNome: { color: "#F9FAFB", fontWeight: "700", fontSize: 15 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  riscoBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  riscoTexto: { fontSize: 11, fontWeight: "700" },
  rendimento: { color: "#9CA3AF", fontSize: 12 },
  chevron: { color: "#4B5563", fontSize: 12 },
  expandido: { marginTop: 16, borderTopWidth: 1, borderTopColor: "#2D3748", paddingTop: 14 },
  descricao: { color: "#9CA3AF", fontSize: 13, lineHeight: 20, marginBottom: 14 },
  detalhesRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 14 },
  detalheItem: { alignItems: "center" },
  detalheLabel: { color: "#4B5563", fontSize: 11, marginBottom: 3 },
  detalheValor: { color: "#F9FAFB", fontWeight: "700", fontSize: 13 },
  verBtn: { borderRadius: 10, padding: 12, alignItems: "center" },
  verTexto: { color: "#fff", fontWeight: "800", fontSize: 14 },
});
