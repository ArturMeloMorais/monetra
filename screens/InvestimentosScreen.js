import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity, Linking } from 'react-native';
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
        renderItem={({ item }) => {

          const variacao = item.price_change_percentage_24h || 0;
          const aumento = variacao >= 0;
          const preco = item?.current_price ?? 0;

          return (
          <TouchableOpacity style={styles.card}
          onPress = {() =>
            Linking.openURL(`https://www.coingecko.com/en/coins/${item.id}`)}>
          
            <Image source={{ uri: item.image }} style={styles.icon} />
            <View>
              <Text style={styles.nome}>{item.name} ({item.symbol.toUpperCase()})</Text>
              <Text style={styles.preco}>Preço: ${preco.toLocaleString()}
                ({aumento ? '+' : '-'} {Math.abs(variacao).toFixed(2)}%)
              </Text>
              
            </View>
          </TouchableOpacity>)
        }}
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