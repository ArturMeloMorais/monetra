import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import despesasData from "../despesas.json";

export default function PlanilhaScreen({ route }) {

  const { usuario } = route.params;

  const dadosUsuario = despesasData.find(
    (d) => d.usuarioId === usuario.id
  );

  const [despesasFixas, setDespesasFixas] = useState(dadosUsuario.despesasFixas);
  const [despesasExtras, setDespesasExtras] = useState(dadosUsuario.despesasExtras);

  const [editando, setEditando] = useState(null);
  const [nomeEdit, setNomeEdit] = useState("");
  const [valorEdit, setValorEdit] = useState("");

  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");

  function iniciarEdicao(item){
    setEditando(item.id);
    setNomeEdit(item.nome);
    setValorEdit(String(item.valor));
  }

  function salvarEdicaoFixa(id){

  const atualizadas = despesasFixas.map((d)=>{
    if(d.id === id){
      return {
        ...d,
        nome: nomeEdit,
        valor: Number(valorEdit)
      };
    }
    return d;
  });

  setDespesasFixas(atualizadas);
  setEditando(null);
}

  function salvarEdicaoExtra(id){

  const atualizadas = despesasExtras.map((d)=>{
    if(d.id === id){
      return {
        ...d,
        nome: nomeEdit,
        valor: Number(valorEdit)
      };
    }
    return d;
  });

  setDespesasExtras(atualizadas);
  setEditando(null);
}

  function adicionarFixa(){

    const nova = {
      id: Date.now(),
      nome,
      valor: Number(valor)
    };

    setDespesasFixas([...despesasFixas, nova]);
    setNome("");
    setValor("");
  }

  function adicionarExtra(){

    const hoje = new Date();

    const nova = {
      id: Date.now(),
      nome,
      valor: Number(valor),
      data: hoje.toLocaleDateString(),
      diaSemana: hoje.toLocaleDateString("pt-BR",{weekday:"long"})
    };

    setDespesasExtras([...despesasExtras, nova]);
    setNome("");
    setValor("");
  }

  function removerFixa(id){
    setDespesasFixas(despesasFixas.filter(d => d.id !== id));
  }

  function removerExtra(id){
    setDespesasExtras(despesasExtras.filter(d => d.id !== id));
  }

  const totalFixas = despesasFixas.reduce((soma,d)=> soma + Number(d.valor),0);
  const totalExtras = despesasExtras.reduce((soma,d)=> soma + Number(d.valor),0);

  const totalDespesas = totalFixas + totalExtras;

  const saldo = usuario.salario - totalDespesas;

  const porcentagemGasta = ((totalDespesas / usuario.salario) * 100).toFixed(1);

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.salario}>
        Salário: R$ {usuario.salario}
      </Text>

      <Text style={styles.titulo}>Despesas Fixas</Text>

      {despesasFixas.map((d)=>(

        <View key={d.id} style={styles.linha}>

          {editando === d.id ? (

            <View style={{flex:1}}>

              <TextInput
                style={styles.inputEdit}
                value={nomeEdit}
                onChangeText={setNomeEdit}
              />

              <TextInput
                style={styles.inputEdit}
                value={valorEdit}
                onChangeText={setValorEdit}
                keyboardType="numeric"
              />

              <TouchableOpacity
                style={styles.salvar}
                onPress={()=> salvarEdicaoFixa(d.id)}
              >
                <Text style={{color:"white"}}>Salvar</Text>
              </TouchableOpacity>

            </View>

          ) : (

            <>
              <Text>{d.nome} - R$ {d.valor}</Text>

              <View style={styles.botoes}>

                <TouchableOpacity onPress={()=> iniciarEdicao(d)}>
                  <Text>✏️</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> removerFixa(d.id)}>
                  <Text style={styles.remover}>X</Text>
                </TouchableOpacity>

              </View>
            </>

          )}

        </View>

      ))}

      <Text style={styles.titulo}>Despesas Extras</Text>

      {despesasExtras.map((d)=>(

        <View key={d.id} style={styles.linha}>

          {editando === d.id ? (

            <View style={{flex:1}}>

              <TextInput
                style={styles.inputEdit}
                value={nomeEdit}
                onChangeText={setNomeEdit}
              />

              <TextInput
                style={styles.inputEdit}
                value={valorEdit}
                onChangeText={setValorEdit}
                keyboardType="numeric"
              />

              <TouchableOpacity
                style={styles.salvar}
                onPress={()=> salvarEdicaoExtra(d.id)}
              >
                <Text style={{color:"white"}}>Salvar</Text>
              </TouchableOpacity>

            </View>

          ) : (

            <>
              <View>
                <Text>{d.nome}</Text>
                <Text style={styles.data}>{d.data} - {d.diaSemana}</Text>
              </View>

              <View style={styles.botoes}>

                <Text>R$ {d.valor}</Text>

                <TouchableOpacity onPress={()=> iniciarEdicao(d)}>
                  <Text>✏️</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> removerExtra(d.id)}>
                  <Text style={styles.remover}>X</Text>
                </TouchableOpacity>

              </View>
            </>

          )}

        </View>

      ))}

      <TextInput
        placeholder="Nome da despesa"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Valor"
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.botao} onPress={adicionarFixa}>
        <Text style={styles.botaoTexto}>+ Adicionar Fixa</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={adicionarExtra}>
        <Text style={styles.botaoTexto}>+ Adicionar Extra</Text>
      </TouchableOpacity>

      <View style={styles.totalBox}>

        <Text>Total de Despesas: R$ {totalDespesas}</Text>

        <Text>Você gastou {porcentagemGasta}% do salário</Text>

        <Text style={[
          styles.saldo,
          {color: saldo >= 0 ? "green" : "red"}
        ]}>
          Saldo Restante: R$ {saldo}
        </Text>

      </View>

    </ScrollView>

  );
}

const styles = StyleSheet.create({

container:{flex:1,padding:20,backgroundColor:"#f2f2f2"},

salario:{fontSize:18,fontWeight:"bold",marginBottom:20},

titulo:{fontSize:16,fontWeight:"bold",marginTop:10},

linha:{
flexDirection:"row",
justifyContent:"space-between",
backgroundColor:"white",
padding:10,
borderRadius:8,
marginTop:5
},

botoes:{
flexDirection:"row",
gap:10,
alignItems:"center"
},

remover:{color:"red",fontWeight:"bold"},

data:{fontSize:12,color:"#777"},

input:{
backgroundColor:"white",
padding:10,
borderRadius:8,
marginTop:10
},

inputEdit:{
borderWidth:1,
borderColor:"#ccc",
padding:5,
marginBottom:5,
borderRadius:5
},

salvar:{
backgroundColor:"#1c7c43",
padding:6,
borderRadius:5,
alignItems:"center"
},

botao:{
backgroundColor:"#1c7c43",
padding:12,
borderRadius:8,
alignItems:"center",
marginTop:10
},

botaoTexto:{color:"white",fontWeight:"bold"},

totalBox:{
marginTop:20,
backgroundColor:"white",
padding:15,
borderRadius:10
},

saldo:{
fontSize:18,
fontWeight:"bold",
marginTop:5
}

});