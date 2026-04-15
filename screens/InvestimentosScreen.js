import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { getTopCoins } from '../services/api'; // Importe a função criada acima

export default function InvestimentoScreen() {
  const [investimentos, setInvestimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      const dados = await getTopCoins();
      setInvestimentos(dados);
      setLoading(false);
    }
    carregarDados();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={investimentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.icon} />
            <View>
              <Text style={styles.nome}>{item.name} ({item.symbol.toUpperCase()})</Text>
              <Text style={styles.preco}>Preço: ${item.current_price.toLocaleString()}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { flexDirection: 'row', padding: 15, marginBottom: 10, backgroundColor: '#f9f9f9', borderRadius: 8, alignItems: 'center' },
  icon: { width: 40, height: 40, marginRight: 15 },
  nome: { fontWeight: 'bold', fontSize: 16 },
  preco: { color: 'green' }
});