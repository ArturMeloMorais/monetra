import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Bem-vindo de volto!</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
      />

    <TouchableOpacity 
  style={styles.button}
  onPress={() => navigation.navigate("Home")}
>
  <Text style={styles.buttonText}>Entrar</Text>
</TouchableOpacity>

    <Text style={styles.EsqueceuSenha}>esqueceu sua senha?</Text>
    <Text style={styles.CriarConta}>não tem uma conta?</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    padding:20
  },
  title:{
    fontSize:24,
    marginBottom:20,
    textAlign:"center"
  },
  input:{
    borderWidth:1,
    padding:10,
    marginBottom:10,
    borderRadius:10
  },
  button:{
  marginTop:10,
  backgroundColor:"#e0dd00",
  padding:12,
  borderRadius:10,
  alignItems:"center"
},

buttonText:{
  color:"#fff",
  fontSize:16,
  fontWeight:"bold"},

EsqueceuSenha:{
  marginTop:15,
  color:"#888",
  textAlign:"center",
borderBottomWidth:2,
  borderBottomColor:"#888"},

CriarConta:{
  marginTop:10,
  color:"#888",
  textAlign:"center"},



});