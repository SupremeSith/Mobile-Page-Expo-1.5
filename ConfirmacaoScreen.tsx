import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ConfirmacaoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const handleNovoCadastro = () => {
    navigation.navigate('NomeSala');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro Completo</Text>

      <Text style={styles.confirmText}>Nome: {route.params.nomeCompleto}</Text>
      <Text style={styles.confirmText}>Sala: {route.params.salaResponsavel}</Text>
      <Text style={styles.confirmText}>Email: {route.params.email}</Text>
      <Text style={styles.confirmText}>ID: {route.params.id}</Text>

      <TouchableOpacity style={styles.button} onPress={handleNovoCadastro}>
        <Text style={styles.buttonText}>Novo Cadastro</Text>
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
  confirmText: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfirmacaoScreen;
