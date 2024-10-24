import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const GerarIdScreen = () => {
  const [id, setId] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  const gerarId = () => {
    const novoId = `${route.params.nomeCompleto}-${Math.random().toString(36).substr(2, 9)}`;
    setId(novoId);
  };

  const handleConcluir = () => {
    if (id) {
      navigation.navigate('Confirmacao', { ...route.params, id });
    } else {
      alert('Por favor, gere um ID.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro - Gerar ID</Text>

      <TouchableOpacity style={styles.button} onPress={gerarId}>
        <Text style={styles.buttonText}>Gerar Novo ID</Text>
      </TouchableOpacity>

      {id ? <Text style={styles.idText}>ID Gerado: {id}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleConcluir}>
        <Text style={styles.buttonText}>Concluir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  idText: {
    fontSize: 18,
    marginVertical: 15,
    textAlign: 'center',
  },
});

export default GerarIdScreen;
