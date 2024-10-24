import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const salas = [
  { nome: 'C13', imagem: require('./assets/c13.png') }, // Adicione a imagem correta no caminho
  { nome: 'C19', imagem: require('./assets/c19.png') },
  { nome: 'C20', imagem: require('./assets/c20.png') },
  { nome: 'Eletrica 1', imagem: require('./assets/eletrica1.png') },
  { nome: 'Eletrica 2', imagem: require('./assets/eletrica2.png') },
  { nome: 'Eletrica 3', imagem: require('./assets/eletrica3.png') },
  { nome: 'Nenhum', imagem: require('./assets/nenhum.png') }
];

const NomeSalaScreen = () => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [salaResponsavel, setSalaResponsavel] = useState('');
  const navigation = useNavigation();

  const handleContinuar = () => {
    if (nomeCompleto && salaResponsavel) {
      navigation.navigate('EmailSenha', { nomeCompleto, salaResponsavel });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Título Centralizado */}
      <Text style={styles.title}>Cadastro do Usuário</Text>

      {/* Input de Nome */}
      <TextInput
        value={nomeCompleto}
        onChangeText={setNomeCompleto}
        placeholder="Insira seu nome"
        style={styles.input}
      />

      {/* Texto abaixo do campo de nome */}
      <Text style={styles.subtitle}>Selecione a sala responsável:</Text>

      {/* Lista de salas em quadrados com imagens */}
      <FlatList
        data={salas}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, salaResponsavel === item.nome && styles.cardSelected]}
            onPress={() => setSalaResponsavel(item.nome)}
          >
            <Image source={item.imagem} style={styles.image} />
            <Text style={styles.cardText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        numColumns={3} // Exibe 3 colunas para os quadrados
        columnWrapperStyle={styles.row} // Ajusta as colunas
      />

      {/* Botão de Continuar */}
      <TouchableOpacity style={styles.button} onPress={handleContinuar}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  cardSelected: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  image: {
    width: 50,
    height: 50,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NomeSalaScreen;
