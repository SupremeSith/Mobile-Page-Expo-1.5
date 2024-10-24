import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface EditarPerfilProps {
  onNavigate: (screen: string, params?: any) => void;  // Função de navegação
  route: {
    params?: {
      nome?: string;
      senha?: string;
      id?: string;
      sala?: string;
      email?: string;
      profileImage?: string;
    };
  };
}

const EditarPerfil: React.FC<EditarPerfilProps> = ({ onNavigate, route }) => {
  const { nome, senha, id, sala, email, profileImage } = route.params || {};
  const [newNome, setNewNome] = useState(nome || '');
  const [newSenha, setNewSenha] = useState(senha || '');
  const [newID, setNewID] = useState(id || '');
  const [newSala, setNewSala] = useState(sala || '');
  const [newEmail, setNewEmail] = useState(email || '');
  const [newProfileImage, setNewProfileImage] = useState(profileImage || '');

  // Função para escolher imagem
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewProfileImage(result.assets[0].uri);
    }
  };

  // Função para salvar os dados e navegar de volta para o perfil
  const handleSave = () => {
    onNavigate('VisualizarPerfil', {
      nome: newNome,
      senha: newSenha,
      id: newID,
      sala: newSala,
      email: newEmail,
      profileImage: newProfileImage,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      {/* Imagem de Perfil - Clique para alterar */}
      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        <Image
          source={{ uri: newProfileImage || 'https://randomuser.me/api/portraits/women/68.jpg' }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {/* Campo de Nome */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={newNome}
          onChangeText={setNewNome}
        />
      </View>

      {/* Campo de ID */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>ID</Text>
        <TextInput
          style={styles.input}
          value={newID}
          onChangeText={setNewID}
        />
      </View>

      {/* Campo de Sala */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sala</Text>
        <TextInput
          style={styles.input}
          value={newSala}
          onChangeText={setNewSala}
        />
      </View>

      {/* Campo de Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={newEmail}
          onChangeText={setNewEmail}
        />
      </View>

      {/* Campo de Senha */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={newSenha}
          onChangeText={setNewSenha}
          secureTextEntry
        />
      </View>

      {/* Botão de Salvar */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#B22222',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditarPerfil;
