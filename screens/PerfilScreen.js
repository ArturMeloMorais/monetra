import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function PerfilScreen({ route }) {

  const { usuario } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Image
        source={{ uri: usuario.foto }}
        style={styles.foto}
      />

      <Text style={styles.nome}>{usuario.nome}</Text>

      <View style={styles.card}>
        <Text style={styles.item}>Idade: {usuario.idade} anos</Text>
        <Text style={styles.item}>Email: {usuario.email}</Text>
        <Text style={styles.item}>Salário Líquido: R$ {usuario.salario}</Text>
        <Text style={styles.item}>Idioma: {usuario.idioma}</Text>
        <Text style={styles.item}>Telefone: {usuario.telefone}</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    alignItems:"center",
    paddingTop:60,
    backgroundColor:"#f2f2f2"
  },

  foto:{
    width:120,
    height:120,
    borderRadius:60,
    marginBottom:10
  },

  nome:{
    fontSize:22,
    fontWeight:"bold",
    marginBottom:20
  },

  card:{
    width:"90%",
    backgroundColor:"white",
    padding:20,
    borderRadius:10
  },

  item:{
    fontSize:16,
    marginBottom:10
  }

});