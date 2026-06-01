import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import despesas from "../despesas.json";
import lembretesData from "../lembretes.json";

export default function HomeScreen({ navigation, route }) {
  const { width: windowWidth } = useWindowDimensions();
  const chartWidth = Math.max(windowWidth - 40, 280);
  const { usuario } = route.params;

  const dadosUsuario =
    despesas.find((d) => d.usuarioId === usuario.id) ||
    { despesasFixas: [], despesasExtras: [] };

  const despesasExtras = dadosUsuario.despesasExtras;
  const totalDespesas =
    dadosUsuario.despesasFixas.reduce((s, d) => s + Number(d.valor), 0) +
    despesasExtras.reduce((s, d) => s + Number(d.valor), 0);
  const saldo = usuario.salario - totalDespesas;
  const pct = ((totalDespesas / usuario.salario) * 100).toFixed(0);

  const lembretesDoUsuario = lembretesData.filter((l) => l.usuarioId === usuario.id);
  const [lembretes, setLembretes] = useState(lembretesDoUsuario);
  const [editando, setEditando] = useState(null);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");

  function removerLembrete(id) {
    setLembretes(lembretes.filter((item) => item.id !== id));
  }

  function iniciarEdicao(item) {
    setEditando(item.id);
    setNovoTitulo(item.titulo);
    setNovaDescricao(item.descricao);
  }

  function salvarEdicao(id) {
    setLembretes(lembretes.map((item) =>
      item.id === id ? { ...item, titulo: novoTitulo, descricao: novaDescricao } : item
    ));
    setEditando(null);
  }

  function adicionarLembrete() {
    setLembretes([...lembretes, {
      id: Date.now(),
      usuarioId: usuario.id,
      titulo: "Novo lembrete",
      descricao: "Toque em ✏️ para editar.",
      icone: "📌",
    }]);
  }

  const gastosPorDia = { Dom: 0, Seg: 0, Ter: 0, Qua: 0, Qui: 0, Sex: 0, Sab: 0 };
  const mapaChaves = {
    domingo: "Dom", segunda: "Seg", "segunda-feira": "Seg",
    terca: "Ter", "terça-feira": "Ter", quarta: "Qua", "quarta-feira": "Qua",
    quinta: "Qui", "quinta-feira": "Qui", sexta: "Sex", "sexta-feira": "Sex",
    sabado: "Sab", "sábado": "Sab",
  };

  despesasExtras.forEach((d) => {
    const key = mapaChaves[(d.diaSemana || "").toLowerCase()];
    if (key) gastosPorDia[key] += Number(d.valor);
  });

  const dadosGrafico = {
    labels: Object.keys(gastosPorDia),
    datasets: [{ data: Object.values(gastosPorDia) }],
  };

  const primeiroNome = usuario.nome.split(" ")[0];
  const hora = new Date().getHours();
  const saudacao = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <View style={styles.header}>
        <View>
          <Text style={styles.saudacao}>{saudacao},</Text>
          <Text style={styles.nomeUsuario}>{primeiroNome} 👋</Text>
        </View>
        <TouchableOpacity
          style={styles.avatarBtn}
          onPress={() => navigation.navigate("Perfil", { usuario })}
        >
          <Text style={styles.avatarLetra}>{primeiroNome[0]}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resumoRow}>
        <View style={[styles.resumoCard, { backgroundColor: "#1c7c43" }]}>
          <Text style={styles.resumoLabel}>Saldo</Text>
          <Text style={styles.resumoValor}>R$ {saldo.toFixed(2)}</Text>
        </View>
        <View style={[styles.resumoCard, { backgroundColor: "#1A2535" }]}>
          <Text style={styles.resumoLabel}>Gasto</Text>
          <Text style={[styles.resumoValor, { color: "#FCA5A5" }]}>R$ {totalDespesas.toFixed(2)}</Text>
          <Text style={styles.resumoPct}>{pct}% do salário</Text>
        </View>
      </View>

      <View style={styles.menuRow}>
        {[
          { icon: "📊", label: "Planilhas", tela: "Planilha" },
          { icon: "📈", label: "Investimentos", tela: "Investimentos" },
          { icon: "👤", label: "Conta", tela: "Perfil" },
        ].map((item) => (
          <TouchableOpacity
            key={item.tela}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.tela, { usuario })}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.secaoHeader}>
        <Text style={styles.secaoTitulo}>Lembretes</Text>
        <TouchableOpacity style={styles.addBtn} onPress={adicionarLembrete}>
          <Text style={styles.addBtnTexto}>+ Novo</Text>
        </TouchableOpacity>
      </View>

      {lembretes.length === 0 && (
        <View style={styles.vazioBox}>
          <Text style={styles.vazioTexto}>Nenhum lembrete. Adicione um!</Text>
        </View>
      )}

      {lembretes.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.icone}>{item.icone}</Text>

          {editando === item.id ? (
            <View style={{ flex: 1 }}>
              <TextInput
                style={styles.inputEdit}
                value={novoTitulo}
                onChangeText={setNovoTitulo}
                placeholder="Título"
                placeholderTextColor="#6B7280"
              />
              <TextInput
                style={styles.inputEdit}
                value={novaDescricao}
                onChangeText={setNovaDescricao}
                placeholder="Descrição"
                placeholderTextColor="#6B7280"
              />
              <TouchableOpacity style={styles.salvarBtn} onPress={() => salvarEdicao(item.id)}>
                <Text style={styles.salvarTexto}>Salvar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <Text style={styles.lembreteTitulo}>{item.titulo}</Text>
              <Text style={styles.lembreteDesc}>{item.descricao}</Text>
            </View>
          )}

          <View style={styles.cardBotoes}>
            <TouchableOpacity style={styles.btnEditar} onPress={() => iniciarEdicao(item)}>
              <Text>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRemover} onPress={() => removerLembrete(item.id)}>
              <Text style={styles.xTexto}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={styles.graficoBox}>
        <Text style={styles.graficoTitulo}>Gastos por dia da semana</Text>
        <BarChart
          data={dadosGrafico}
          width={chartWidth}
          height={180}
          yAxisLabel="R$"
          withInnerLines={false}
          showBarTops={false}
          chartConfig={{
            backgroundColor: "transparent",
            backgroundGradientFrom: "#1A2535",
            backgroundGradientTo: "#1A2535",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(28,124,67,${opacity})`,
            labelColor: () => "#9CA3AF",
            propsForLabels: { fontSize: 11 },
          }}
          style={{ borderRadius: 10, alignSelf: "center" }}
        />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F1923" },
  content: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  saudacao: { color: "#6B7280", fontSize: 14 },
  nomeUsuario: { color: "#F9FAFB", fontSize: 22, fontWeight: "800" },
  avatarBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#1c7c43", alignItems: "center", justifyContent: "center" },
  avatarLetra: { color: "#fff", fontWeight: "800", fontSize: 18 },
  resumoRow: { flexDirection: "row", gap: 12, marginBottom: 20 },
  resumoCard: { flex: 1, borderRadius: 16, padding: 16, elevation: 4 },
  resumoLabel: { color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: "600", marginBottom: 4 },
  resumoValor: { color: "#fff", fontSize: 20, fontWeight: "800" },
  resumoPct: { color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 2 },
  menuRow: { flexDirection: "row", backgroundColor: "#1A2535", borderRadius: 16, padding: 12, justifyContent: "space-around", marginBottom: 24 },
  menuItem: { alignItems: "center", paddingVertical: 6, paddingHorizontal: 16 },
  menuIcon: { fontSize: 24, marginBottom: 4 },
  menuLabel: { color: "#9CA3AF", fontSize: 11, fontWeight: "600" },
  secaoHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  secaoTitulo: { color: "#F9FAFB", fontSize: 17, fontWeight: "700" },
  addBtn: { backgroundColor: "#1c7c43", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  addBtnTexto: { color: "#fff", fontWeight: "700", fontSize: 13 },
  vazioBox: { backgroundColor: "#1A2535", borderRadius: 12, padding: 20, alignItems: "center", marginBottom: 12 },
  vazioTexto: { color: "#4B5563", fontSize: 14 },
  card: { flexDirection: "row", backgroundColor: "#1A2535", padding: 14, borderRadius: 14, marginBottom: 10, alignItems: "center", borderLeftWidth: 3, borderLeftColor: "#1c7c43" },
  icone: { fontSize: 22, marginRight: 12 },
  lembreteTitulo: { color: "#F9FAFB", fontWeight: "700", fontSize: 14 },
  lembreteDesc: { color: "#6B7280", fontSize: 13, marginTop: 2 },
  cardBotoes: { gap: 6 },
  btnEditar: { backgroundColor: "#2D3748", padding: 7, borderRadius: 8, alignItems: "center" },
  btnRemover: { backgroundColor: "#3B1A1A", padding: 7, borderRadius: 8, alignItems: "center" },
  xTexto: { color: "#EF4444", fontWeight: "800", fontSize: 12 },
  inputEdit: { backgroundColor: "#0F1923", color: "#F9FAFB", borderRadius: 8, padding: 8, marginBottom: 6, borderWidth: 1, borderColor: "#2D3748", fontSize: 14 },
  salvarBtn: { backgroundColor: "#1c7c43", borderRadius: 8, padding: 8, alignItems: "center" },
  salvarTexto: { color: "#fff", fontWeight: "700", fontSize: 13 },
  graficoBox: { backgroundColor: "#1A2535", borderRadius: 16, padding: 16, marginTop: 24 },
  graficoTitulo: { color: "#F9FAFB", fontWeight: "700", fontSize: 15, marginBottom: 12 },
});
