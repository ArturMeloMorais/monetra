import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

import lembretesData from "../lembretes.json";
import despesas from "../despesas.json";

export default function HomeScreen({ navigation, route }) {

  const { usuario } = route.params;

  const dadosUsuario =
    despesas.find((d) => d.usuarioId === usuario.id) ||
    { despesasFixas: [], despesasExtras: [] };

  const despesasExtras = dadosUsuario.despesasExtras;

  const lembretesDoUsuario = lembretesData.filter(
    (l) => l.usuarioId === usuario.id
  );

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
    const atualizados = lembretes.map((item) => {
      if (item.id === id) {
        return { ...item, titulo: novoTitulo, descricao: novaDescricao };
      }
      return item;
    });

    setLembretes(atualizados);
    setEditando(null);
  }

  function adicionarLembrete() {
    const novo = {
      id: Date.now(),
      usuarioId: usuario.id,
      titulo: "Novo lembrete",
      descricao: "Edite este lembrete.",
      icone: "📌"
    };

    setLembretes([...lembretes, novo]);
  }

  const gastosPorDia = {
    Domingo: 0,
    Segunda: 0,
    Terca: 0,
    Quarta: 0,
    Quinta: 0,
    Sexta: 0,
    Sabado: 0
  };

  despesasExtras.forEach((d) => {
    if (gastosPorDia[d.diaSemana] !== undefined) {
      gastosPorDia[d.diaSemana] += Number(d.valor);
    }
  });

  const dadosGrafico = {
    labels: Object.keys(gastosPorDia),
    datasets: [
      {
        data: Object.values(gastosPorDia)
      }
    ]
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Olá, {usuario.nome}!</Text>
      </View>

      <Text style={styles.section}>Meus Lembretes</Text>

      {lembretes.map((item) => (
        <View key={item.id} style={styles.card}>

          <Text style={styles.icone}>{item.icone}</Text>

          {editando === item.id ? (

            <View style={{ flex: 1 }}>

              <TextInput
                style={styles.input}
                value={novoTitulo}
                onChangeText={setNovoTitulo}
              />

              <TextInput
                style={styles.input}
                value={novaDescricao}
                onChangeText={setNovaDescricao}
              />

              <TouchableOpacity
                style={styles.salvar}
                onPress={() => salvarEdicao(item.id)}
              >
                <Text style={{ color: "white" }}>Salvar</Text>
              </TouchableOpacity>

            </View>

          ) : (

            <View style={{ flex: 1 }}>
              <Text style={styles.lembreteTitulo}>{item.titulo}</Text>
              <Text style={styles.lembreteDesc}>{item.descricao}</Text>
            </View>

          )}

          <View style={styles.botoes}>

            <TouchableOpacity
              style={styles.editar}
              onPress={() => iniciarEdicao(item)}
            >
              <Text style={{ color: "white" }}>✏️</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.remover}
              onPress={() => removerLembrete(item.id)}
            >
              <Text style={{ color: "white" }}>X</Text>
            </TouchableOpacity>

          </View>

        </View>
      ))}

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={adicionarLembrete}
      >
        <Text style={styles.textAdicionar}>+ Adicionar lembrete</Text>
      </TouchableOpacity>

      <View style={styles.menu}>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate("Planilha", { usuario })}
        >
          <Text style={styles.textBotao}>📊</Text>
          <Text style={styles.label}>Planilhas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate("Investimentos", { usuario })}
        >
          <Text style={styles.textBotao}>📈</Text>
          <Text style={styles.label}>Investimentos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate("Perfil", { usuario })}
        >
          <Text style={styles.textBotao}>👤</Text>
          <Text style={styles.label}>Conta</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.graficoContainer}>

        <Text style={styles.graficoTitulo}>
          Dias que você mais gastou
        </Text>

        <BarChart
          data={dadosGrafico}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisLabel="R$ "
          chartConfig={{
            backgroundColor: "#1c7c43",
            backgroundGradientFrom: "#1c7c43",
            backgroundGradientTo: "#1c7c43",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
            labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`
          }}
          style={{
            borderRadius: 10
          }}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"#f2f2f2"
  },

  header:{
    backgroundColor:"#1c7c43",
    padding:20,
    borderRadius:10,
    marginBottom:20
  },

  title:{
    color:"white",
    fontSize:22,
    fontWeight:"bold"
  },

  section:{
    fontSize:18,
    fontWeight:"bold",
    marginBottom:10
  },

  card:{
    flexDirection:"row",
    backgroundColor:"white",
    padding:15,
    borderRadius:10,
    marginBottom:10,
    alignItems:"center"
  },

  icone:{
    fontSize:24,
    marginRight:10
  },

  lembreteTitulo:{
    fontWeight:"bold"
  },

  lembreteDesc:{
    color:"#666"
  },

  botoes:{
    gap:5
  },

  editar:{
    backgroundColor:"#f0ad4e",
    padding:6,
    borderRadius:5
  },

  remover:{
    backgroundColor:"#d9534f",
    padding:6,
    borderRadius:5
  },

  salvar:{
    backgroundColor:"#1c7c43",
    padding:6,
    borderRadius:5,
    marginTop:5,
    alignItems:"center"
  },

  input:{
    borderWidth:1,
    borderColor:"#ccc",
    padding:5,
    marginBottom:5,
    borderRadius:5
  },

  botaoAdicionar:{
    marginTop:10,
    backgroundColor:"#1c7c43",
    padding:12,
    borderRadius:8,
    alignItems:"center"
  },

  textAdicionar:{
    color:"white",
    fontWeight:"bold"
  },

  menu:{
    flexDirection:"row",
    justifyContent:"space-around",
    marginTop:20,
    backgroundColor:"#1c7c43",
    padding:15,
    borderRadius:10
  },

  botao:{
    alignItems:"center"
  },

  textBotao:{
    fontSize:22
  },

  label:{
    color:"white",
    fontSize:12
  },

  graficoContainer:{
    marginTop:20,
    backgroundColor:"#1c7c43",
    padding:15,
    borderRadius:10
  },

  graficoTitulo:{
    color:"white",
    fontSize:16,
    fontWeight:"bold",
    marginBottom:10,
    textAlign:"center"
  }

});