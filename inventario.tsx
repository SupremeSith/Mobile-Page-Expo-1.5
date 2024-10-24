import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TextInput,} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Footer from '@/components/footer';
import axios from 'axios';
import IconButton from '@/components/IconButton';

interface Room {
  id: number;
  sala: string;
  descricao: string;
  localizacao: string;
  link_imagem: string;
  responsavel: string;
  quantidade_itens: number;
}

interface InventarioScreenProps {
  onNavigate: (screen: string) => void;
}

const InventarioScreen: React.FC<InventarioScreenProps> = ({ onNavigate }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await axios.get('http://192.168.0.215:8000/api/salas');
        setRooms(response.data);
      } catch (error: any) { // Definindo o tipo como 'any'
        console.error(
          'Erro ao buscar as salas:',
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    getRooms();
  }, []);

  const renderItem = ({ item }: { item: Room }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.link_imagem }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.roomName}>{item.sala}</Text>
        <Text style={styles.professor}>Responsável: {item.responsavel}</Text>
        <Text style={styles.description}>{item.descricao}</Text>
        <Text style={styles.quantidade}>Itens: {item.quantidade_itens}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header com ícones */}
      <View style={styles.header}>
      <IconButton iconName="arrow-back" onPress={() => onNavigate('ServiceHome')} />
      <IconButton iconName="menu" onPress={() => onNavigate('Menu')} />
      </View>

      <Image source={require('@/assets/images/Logo.png')} style={styles.logo} />
      <Text style={styles.subtitle}>Salas</Text>

      {/* Search and Action Buttons */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Pesquisar..." style={styles.searchInput} />
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="filter-list" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="add" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Room List */}
      <View style={styles.listContainer}>
        <FlatList
          data={rooms}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      </View>

      <Footer onNavigate={onNavigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  iconButton: {
    backgroundColor: '#8B0000',
    borderRadius: 20,
    padding: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: '#B30000',
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
  list: {
    paddingBottom: 80,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginVertical: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  professor: {
    fontSize: 14,
    color: '#555',
    marginLeft: 20,
  },
  description: {
    fontSize: 12,
    color: '#777',
    marginLeft: 20,
  },
  quantidade: {
    fontSize: 12,
    color: '#777',
    marginLeft: 20,
  },
  logo: {
    width: 170,
    height: 70,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default InventarioScreen;