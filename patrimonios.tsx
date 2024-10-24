import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import axios from 'axios';
import Footer from '@/components/footer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import IconButton from '@/components/IconButton';

interface Room {
  id: string;
  num_inventario: string;
  denominacao: string;
  localizacao: string;
  sala: string;
  link_imagem: string;
}

interface PatrimonioScreenProps {
  onNavigate: (screen: string) => void;
}

const PatrimonioScreen: React.FC<PatrimonioScreenProps> = ({ onNavigate }) => {
  const [inventarios, setInventarios] = useState<Room[]>([]);
  const [newItem, setNewItem] = useState({
    num_inventario: '',
    denominacao: '',
    localizacao: '',
    sala: '',
    link_imagem: '',
  });
  const [modalVisible, setModalVisible] = useState(false); // Estado da modal

  useEffect(() => {
    const fetchInventarios = async () => {
      try {
        const response = await axios.get('http://192.168.0.215:8000/api/inventarios/');
        setInventarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar os inventários", error);
        Alert.alert("Erro", "Falha ao buscar os inventários.");
      }
    };

    fetchInventarios();
  }, []);

  const handleAddItem = async () => {
    console.log("Adicionando patrimônio:", newItem); // Log dos dados que estão sendo enviados
    try {
      const response = await axios.post('http://192.168.0.215:8000/api/add_inventario/', newItem);
      console.log("Resposta do servidor:", response.data); // Log da resposta do servidor
      if (response.status === 201) {
        Alert.alert("Sucesso", "Patrimônio adicionado com sucesso!");
        setInventarios([...inventarios, response.data]);
        setModalVisible(false); // Fecha a modal após adicionar
      } else {
        Alert.alert("Erro", "Falha ao adicionar o patrimônio.");
      }
    } catch (error) {
      console.error("Erro ao adicionar patrimônio", error);
      Alert.alert("Erro", "Falha ao adicionar o patrimônio.");
      console.log('Dados recebidos:', inventarios);
    }
  };
  

  const renderItem = ({ item }: { item: Room }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.link_imagem }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.patrimonioName}>{item.denominacao || 'N/A'}</Text>
        <Text style={styles.location}>{item.sala || 'Localização não disponível'}</Text>
        <Text style={styles.inventoryNumber}>{item.num_inventario || 'Número de inventário não disponível'}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton iconName="arrow-back" onPress={() => onNavigate('ServiceHome')} />
        <IconButton iconName="menu" onPress={() => onNavigate('Menu')} />
      </View>

      <Image source={require('@/assets/images/Logo.png')} style={styles.logo} />
      <Text style={styles.subtitle}>Patrimônios</Text>

      <View style={styles.searchContainer}>
        <TextInput placeholder="Pesquisar..." style={styles.searchInput} />
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="filter-list" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
            <MaterialIcons name="add" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal para adicionar patrimônio */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Patrimônio</Text>

            <TextInput
              placeholder="Denominação"
              style={styles.input}
              value={newItem.denominacao}
              onChangeText={(text) => setNewItem({ ...newItem, denominacao: text })}
            />
            <TextInput
              placeholder="Localização"
              style={styles.input}
              value={newItem.localizacao}
              onChangeText={(text) => setNewItem({ ...newItem, localizacao: text })}
            />
            <TextInput
              placeholder="Sala"
              style={styles.input}
              value={newItem.sala}
              onChangeText={(text) => setNewItem({ ...newItem, sala: text })}
            />
            <TextInput
              placeholder="Link da Imagem"
              style={styles.input}
              value={newItem.link_imagem}
              onChangeText={(text) => setNewItem({ ...newItem, link_imagem: text })}
            />
            <TextInput
              placeholder="Número de Inventário"
              style={styles.input}
              value={newItem.num_inventario}
              onChangeText={(text) => setNewItem({ ...newItem, num_inventario: text })}
            />

            {/* Botões da modal com espaçamento e estilização */}
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddItem}>
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.listContainer}>
        <FlatList
          data={inventarios}
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginVertical: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  logo: {
    width: 170,
    height: 70,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  patrimonioName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#555',
  },
  inventoryNumber: {
    fontSize: 14,
    color: '#777',
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
  list: {
    paddingBottom: 80,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#B30000',
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PatrimonioScreen;
