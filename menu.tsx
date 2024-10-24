import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ConfigProps {
  onNavigate: (screen: string) => void;
}

const Menu: React.FC<ConfigProps> = ({ onNavigate }) => {
  const [userName, setUserName] = useState<string | null>('Carregando...');

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('username');
      console.log('Usuário desconectado');
      onNavigate('Home');
      Alert.alert('Logout', 'Você foi desconectado com sucesso!');
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
      Alert.alert('Erro', 'Não foi possível realizar logout.');
    }
  };

  // Função para carregar o nome do usuário do AsyncStorage
  useEffect(() => {
    const loadUserName = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('username');
        if (storedUserName) {
          setUserName(storedUserName); // Atualiza o nome do usuário
        } else {
          setUserName('Usuário Desconhecido');
        }
      } catch (error) {
        console.error('Erro ao carregar o nome do usuário:', error);
        setUserName('Erro ao carregar');
      }
    };

    loadUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/image 46.png')} style={styles.user_icon} />
        <View>
          <Text style={styles.user_name}>{userName ? userName : 'Usuário Desconhecido'}</Text>
        </View>
        <TouchableOpacity onPress={() => onNavigate('ServiceHome')}>
          <AntDesign name="closecircle" size={48} color="#B01818" style={styles.close_icon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logout_button} onPress={handleLogout}>
        <Ionicons name="exit-outline" size={24} color="white" />
        <Text style={styles.logout_text}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  user_icon: {
    height: 53,
    width: 53,
    borderRadius: 26.5,
    marginLeft: 26,
  },
  user_name: {
    marginLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  close_icon: {
    marginRight: 26,
  },
  logout_button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#B01818',
    borderRadius: 5,
  },
  logout_text: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Menu;
