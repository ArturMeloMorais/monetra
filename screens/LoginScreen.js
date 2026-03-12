import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";

import pessoas from "../pessoas.json";

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function validarLogin(){

    const usuario = pessoas.find(
      (p) => p.email === email && p.senha === senha
    );

    if(usuario){

      navigation.navigate("Home", {
        usuario: usuario
      });

    } else {
      Alert.alert("Erro", "Email ou senha inválidos");
    }

  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Bem-vindo de volta!</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={validarLogin}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:"center",padding:20},
  title:{fontSize:24,marginBottom:20,textAlign:"center"},
  input:{borderWidth:1,padding:10,marginBottom:10,borderRadius:10},
  button:{backgroundColor:"#e0dd00",padding:12,borderRadius:10,alignItems:"center"},
  buttonText:{color:"#fff",fontWeight:"bold"}
});