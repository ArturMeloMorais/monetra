import React from "react";
import { View, Text, StyleSheet, FlatList, Linking, TouchableOpacity } from "react-native";

export default function RendaFixaScreen() {
    const rendaFixa = [
        { id: 'tesourodireto',
          nome: 'Tesouro Direto',
          descricao: 'Programa onde uma pessoa física investe em títulos públicos para financiar atividades do governo. É garantido pelo Tesouro Nacional, garantindo segurança e liquidez.',
          risco: 'Baixo',
        }
    ]

    return (
        <View style={styles.container}>
            <FlatList
            data={rendaFixa}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {

                return (
                    <TouchableOpacity style={styles.card}
                    onPress = {() =>
                    Linking.openURL(`https://www.tesourodireto.com.br/`)}>
                <View style={styles.card}>
                    <Text style={styles.nome}>{item.nome}</Text>
                    <Text style={styles.descricao}>{item.descricao}</Text>
                    <Text style={styles.risco}>Risco: {item.risco}</Text>
                </View>
                </TouchableOpacity>
                )
            }}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    card: { flexDirection: 'row', padding: 15, marginBottom: 10, backgroundColor: '#f9f9f9', borderRadius: 8, alignItems: 'center' },
    icon: { width: 40, height: 40, marginRight: 15 },
    nome: { fontWeight: 'bold', fontSize: 16 },
    descricao: { fontSize: 12, color: '#333' },
    risco: { fontSize: 12, color: '#666' }
    })
