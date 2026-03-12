
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";

import lembretesData from "../lembretes.json";
import pessoas from "../pessoas.json";

export default function HomeScreen({ navigation }) {

  const pessoa = pessoas[0];

  const [lembretes, setLembretes] = useState(lembretesData);
  const [editando, setEditando] = useState(null);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");

  function removerLembrete(id){
    setLembretes(lembretes.filter((item)=> item.id !== id));
  }

  function iniciarEdicao(item){
    setEditando(item.id);
    setNovoTitulo(item.titulo);
    setNovaDescricao(item.descricao);
  }

  function salvarEdicao(id){

    const atualizados = lembretes.map((item)=>{
      if(item.id === id){
        return {...item, titulo: novoTitulo, descricao: novaDescricao};
      }
      return item;
    });

    setLembretes(atualizados);
    setEditando(null);
  }

  function adicionarLembrete(){

    const novo = {
      id: Date.now(),
      titulo: "Novo lembrete",
      descricao: "Edite este lembrete.",
      icone: "📌"
    };

    setLembretes([...lembretes, novo]);
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Olá, {pessoa.nome}!</Text>
      </View>

      <Text style={styles.section}>Meus Lembretes</Text>

      {lembretes.map((item)=>(
        <View key={item.id} style={styles.card}>

          <Text style={styles.icone}>{item.icone}</Text>

          {editando === item.id ? (

            <View style={{flex:1}}>

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
                onPress={()=> salvarEdicao(item.id)}
              >
                <Text style={{color:"white"}}>Salvar</Text>
              </TouchableOpacity>

            </View>

          ) : (

            <View style={{flex:1}}>

              <Text style={styles.lembreteTitulo}>{item.titulo}</Text>
              <Text style={styles.lembreteDesc}>{item.descricao}</Text>

            </View>

          )}

          <View style={styles.botoes}>

            <TouchableOpacity
              style={styles.editar}
              onPress={()=> iniciarEdicao(item)}
            >
              <Text style={{color:"white"}}>✏️</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.remover}
              onPress={()=> removerLembrete(item.id)}
            >
              <Text style={{color:"white"}}>X</Text>
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
          onPress={() => navigation.navigate("Planilha")}
        >
          <Text style={styles.textBotao}>📊</Text>
          <Text style={styles.label}>Planilhas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate("Investimentos")}
        >
          <Text style={styles.textBotao}>📈</Text>
          <Text style={styles.label}>Investimentos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate("Perfil")}
        >
          <Text style={styles.textBotao}>👤</Text>
          <Text style={styles.label}>Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textBotao}>💡</Text>
          <Text style={styles.label}>Dicas</Text>
        </TouchableOpacity>

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
    borderRadius:5,
    alignItems:"center"
  },

  remover:{
    backgroundColor:"#d9534f",
    padding:6,
    borderRadius:5,
    alignItems:"center"
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
    justifyContent:"space-between",
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
  }

});

