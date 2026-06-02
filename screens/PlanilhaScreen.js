import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import despesasData from "../despesas.json";

export default function PlanilhaScreen({ route }) {
  const { usuario } = route.params;
  const dadosUsuario = despesasData.find((d) => d.usuarioId === usuario.id) || { despesasFixas: [], despesasExtras: [] };
  const [despesasFixas, setDespesasFixas] = useState(dadosUsuario.despesasFixas);
  const [despesasExtras, setDespesasExtras] = useState(dadosUsuario.despesasExtras);
  const [editando, setEditando] = useState(null);
  const [nomeEdit, setNomeEdit] = useState("");
  const [valorEdit, setValorEdit] = useState("");
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("fixas");

  function iniciarEdicao(item) { setEditando(item.id); setNomeEdit(item.nome); setValorEdit(String(item.valor)); }
  function salvarEdicaoFixa(id) { setDespesasFixas(despesasFixas.map((d) => d.id === id ? { ...d, nome: nomeEdit, valor: Number(valorEdit) } : d)); setEditando(null); }
  function salvarEdicaoExtra(id) { setDespesasExtras(despesasExtras.map((d) => d.id === id ? { ...d, nome: nomeEdit, valor: Number(valorEdit) } : d)); setEditando(null); }
  function adicionarFixa() { if (!nome || !valor) return; setDespesasFixas([...despesasFixas, { id: Date.now(), nome, valor: Number(valor) }]); setNome(""); setValor(""); }
  function adicionarExtra() {
    if (!nome || !valor) return;
    const hoje = new Date();
    setDespesasExtras([...despesasExtras, { id: Date.now(), nome, valor: Number(valor), data: hoje.toLocaleDateString("pt-BR"), diaSemana: hoje.toLocaleDateString("pt-BR", { weekday: "long" }) }]);
    setNome(""); setValor("");
  }
  function removerFixa(id) { setDespesasFixas(despesasFixas.filter((d) => d.id !== id)); }
  function removerExtra(id) { setDespesasExtras(despesasExtras.filter((d) => d.id !== id)); }

  const totalFixas = despesasFixas.reduce((s, d) => s + Number(d.valor), 0);
  const totalExtras = despesasExtras.reduce((s, d) => s + Number(d.valor), 0);
  const totalDespesas = totalFixas + totalExtras;
  const saldo = usuario.salario - totalDespesas;
  const pct = ((totalDespesas / usuario.salario) * 100).toFixed(1);
  const barWidth = Math.min(100, Number(pct));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.resumoCard}>
        <View style={styles.resumoRow}>
          <View>
            <Text style={styles.resumoLabel}>Salário</Text>
            <Text style={styles.resumoValor}>R$ {Number(usuario.salario).toFixed(2)}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.resumoLabel}>Saldo restante</Text>
            <Text style={[styles.resumoValor, { color: saldo >= 0 ? "#34D399" : "#F87171" }]}>R$ {saldo.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.barraFundo}>
          <View style={[styles.barraPreenchimento, { width: `${barWidth}%` }]} />
        </View>
        <Text style={styles.pctTexto}>{pct}% do salário comprometido</Text>
        <View style={styles.totalRow}>
          <View style={styles.totalItem}><Text style={styles.totalLabel}>Fixas</Text><Text style={styles.totalValor}>R$ {totalFixas.toFixed(2)}</Text></View>
          <View style={styles.totalSep} />
          <View style={styles.totalItem}><Text style={styles.totalLabel}>Extras</Text><Text style={styles.totalValor}>R$ {totalExtras.toFixed(2)}</Text></View>
          <View style={styles.totalSep} />
          <View style={styles.totalItem}><Text style={styles.totalLabel}>Total</Text><Text style={[styles.totalValor, { color: "#F87171" }]}>R$ {totalDespesas.toFixed(2)}</Text></View>
        </View>
      </View>

      <View style={styles.abaRow}>
        <TouchableOpacity style={[styles.aba, abaAtiva === "fixas" && styles.abaAtiva]} onPress={() => setAbaAtiva("fixas")}>
          <Text style={[styles.abaTexto, abaAtiva === "fixas" && styles.abaTextoAtivo]}>Fixas ({despesasFixas.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.aba, abaAtiva === "extras" && styles.abaAtiva]} onPress={() => setAbaAtiva("extras")}>
          <Text style={[styles.abaTexto, abaAtiva === "extras" && styles.abaTextoAtivo]}>Extras ({despesasExtras.length})</Text>
        </TouchableOpacity>
      </View>

      {abaAtiva === "fixas" && (
        <>
          {despesasFixas.map((d) => (
            <View key={d.id} style={styles.linha}>
              {editando === d.id ? (
                <View style={{ flex: 1 }}>
                  <TextInput style={styles.inputEdit} value={nomeEdit} onChangeText={setNomeEdit} placeholder="Nome" placeholderTextColor="#4B5563" />
                  <TextInput style={styles.inputEdit} value={valorEdit} onChangeText={setValorEdit} keyboardType="numeric" placeholder="Valor" placeholderTextColor="#4B5563" />
                  <TouchableOpacity style={styles.salvarBtn} onPress={() => salvarEdicaoFixa(d.id)}><Text style={styles.salvarTexto}>Salvar</Text></TouchableOpacity>
                </View>
              ) : (
                <>
                  <View style={styles.linhaInfo}><Text style={styles.linhaNome}>{d.nome}</Text><Text style={styles.linhaValor}>R$ {Number(d.valor).toFixed(2)}</Text></View>
                  <View style={styles.linhaBotoes}>
                    <TouchableOpacity style={styles.btnEditar} onPress={() => iniciarEdicao(d)}><Text>✏️</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.btnRemover} onPress={() => removerFixa(d.id)}><Text style={styles.xTexto}>✕</Text></TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ))}
          <TouchableOpacity style={styles.addBotao} onPress={adicionarFixa}><Text style={styles.addBotaoTexto}>+ Adicionar Fixa</Text></TouchableOpacity>
        </>
      )}

      {abaAtiva === "extras" && (
        <>
          {despesasExtras.map((d) => (
            <View key={d.id} style={styles.linha}>
              {editando === d.id ? (
                <View style={{ flex: 1 }}>
                  <TextInput style={styles.inputEdit} value={nomeEdit} onChangeText={setNomeEdit} placeholder="Nome" placeholderTextColor="#4B5563" />
                  <TextInput style={styles.inputEdit} value={valorEdit} onChangeText={setValorEdit} keyboardType="numeric" placeholder="Valor" placeholderTextColor="#4B5563" />
                  <TouchableOpacity style={styles.salvarBtn} onPress={() => salvarEdicaoExtra(d.id)}><Text style={styles.salvarTexto}>Salvar</Text></TouchableOpacity>
                </View>
              ) : (
                <>
                  <View style={styles.linhaInfo}><Text style={styles.linhaNome}>{d.nome}</Text><Text style={styles.linhaData}>{d.data} · {d.diaSemana}</Text></View>
                  <View style={styles.linhaBotoes}>
                    <Text style={styles.linhaValor}>R$ {Number(d.valor).toFixed(2)}</Text>
                    <TouchableOpacity style={styles.btnEditar} onPress={() => iniciarEdicao(d)}><Text>✏️</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.btnRemover} onPress={() => removerExtra(d.id)}><Text style={styles.xTexto}>✕</Text></TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ))}
          <TouchableOpacity style={styles.addBotao} onPress={adicionarExtra}><Text style={styles.addBotaoTexto}>+ Adicionar Extra</Text></TouchableOpacity>
        </>
      )}

      <View style={styles.novaBox}>
        <Text style={styles.novaLabel}>Nova despesa</Text>
        <TextInput style={styles.inputNova} placeholder="Nome" placeholderTextColor="#4B5563" value={nome} onChangeText={setNome} />
        <TextInput style={styles.inputNova} placeholder="Valor (R$)" placeholderTextColor="#4B5563" value={valor} onChangeText={setValor} keyboardType="numeric" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F1923" },
  content: { padding: 20, paddingBottom: 40 },
  resumoCard: { backgroundColor: "#1A2535", borderRadius: 18, padding: 18, marginBottom: 20 },
  resumoRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  resumoLabel: { color: "#6B7280", fontSize: 12, fontWeight: "600", marginBottom: 4 },
  resumoValor: { color: "#F9FAFB", fontSize: 20, fontWeight: "800" },
  barraFundo: { backgroundColor: "#2D3748", borderRadius: 6, height: 8, marginBottom: 6 },
  barraPreenchimento: { backgroundColor: "#EF4444", borderRadius: 6, height: 8 },
  pctTexto: { color: "#9CA3AF", fontSize: 12, marginBottom: 16 },
  totalRow: { flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
  totalItem: { alignItems: "center" },
  totalLabel: { color: "#6B7280", fontSize: 11, marginBottom: 2 },
  totalValor: { color: "#F9FAFB", fontWeight: "700", fontSize: 14 },
  totalSep: { width: 1, height: 30, backgroundColor: "#2D3748" },
  abaRow: { flexDirection: "row", backgroundColor: "#1A2535", borderRadius: 12, padding: 4, marginBottom: 16 },
  aba: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: "center" },
  abaAtiva: { backgroundColor: "#1c7c43" },
  abaTexto: { color: "#6B7280", fontWeight: "600", fontSize: 14 },
  abaTextoAtivo: { color: "#fff" },
  linha: { flexDirection: "row", backgroundColor: "#1A2535", padding: 14, borderRadius: 12, marginBottom: 8, alignItems: "center", justifyContent: "space-between" },
  linhaInfo: { flex: 1 },
  linhaNome: { color: "#F9FAFB", fontWeight: "600", fontSize: 14 },
  linhaValor: { color: "#34D399", fontWeight: "700", fontSize: 14 },
  linhaData: { color: "#6B7280", fontSize: 12, marginTop: 2 },
  linhaBotoes: { flexDirection: "row", gap: 8, alignItems: "center" },
  btnEditar: { backgroundColor: "#2D3748", padding: 7, borderRadius: 8 },
  btnRemover: { backgroundColor: "#3B1A1A", padding: 7, borderRadius: 8 },
  xTexto: { color: "#EF4444", fontWeight: "800", fontSize: 12 },
  inputEdit: { backgroundColor: "#0F1923", color: "#F9FAFB", borderRadius: 8, padding: 8, marginBottom: 6, borderWidth: 1, borderColor: "#2D3748", fontSize: 14 },
  salvarBtn: { backgroundColor: "#1c7c43", borderRadius: 8, padding: 8, alignItems: "center" },
  salvarTexto: { color: "#fff", fontWeight: "700" },
  addBotao: { backgroundColor: "#FBBF24", borderRadius: 12, padding: 14, alignItems: "center", marginTop: 6, marginBottom: 20 },
  addBotaoTexto: { color: "#0F1923", fontWeight: "800", fontSize: 14 },
  novaBox: { backgroundColor: "#1A2535", borderRadius: 16, padding: 16 },
  novaLabel: { color: "#9CA3AF", fontWeight: "700", fontSize: 13, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.8 },
  inputNova: { backgroundColor: "#0F1923", color: "#F9FAFB", borderRadius: 10, padding: 12, marginBottom: 10, borderWidth: 1.5, borderColor: "#2D3748", fontSize: 14 },
});
