import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Linking } from "react-native";
import investimentos from "../investimentos.json";

export default function InvestimentosScreen() {

  function abrirLink(link){
    Linking.openURL(link);
  }

  function renderItem({item}){

    return(
      <View style={styles.card}>

        <Image
          source={{uri: item.imagem}}
          style={styles.imagem}
        />

        <View style={styles.info}>

          <Text style={styles.nome}>{item.nome}</Text>

          <Text style={styles.descricao}>
            {item.descricao}
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => abrirLink(item.link)}
          >
            <Text style={styles.textoBotao}>Saiba mais</Text>
          </TouchableOpacity>

        </View>

      </View>
    )
  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Recomendações de Investimentos
      </Text>

      <FlatList
        data={investimentos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

    </View>

  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"#f2f2f2"
  },

  titulo:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:20,
    color:"#1c5f3a"
  },

  card:{
    flexDirection:"row",
    backgroundColor:"white",
    padding:15,
    borderRadius:10,
    marginBottom:15,
    elevation:3
  },

  imagem:{
    width:60,
    height:60,
    marginRight:15
  },

  info:{
    flex:1
  },

  nome:{
    fontSize:18,
    fontWeight:"bold",
    color:"#1c5f3a"
  },

  descricao:{
    fontSize:14,
    marginVertical:5,
    color:"#555"
  },

  botao:{
    backgroundColor:"#1c7c43",
    padding:8,
    borderRadius:6,
    alignSelf:"flex-start",
    marginTop:5
  },

  textoBotao:{
    color:"white",
    fontWeight:"bold"
  }

});