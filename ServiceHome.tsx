import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '@/components/footer'; // Importando o Footer
import IconButton from '@/components/IconButton';

// Define a interface para as props
interface ServiceHomeScreenProps {
  onNavigate: (screen: string) => void; 
  userType: 'coordenador' | 'professor'; // Adicionando o tipo de usuário
}

// Define o componente usando React.FC e a interface
const ServiceHomeScreen: React.FC<ServiceHomeScreenProps> = ({ onNavigate, userType }) => {
  return (
    <View style={styles.container}>
      {/* Header com ícones */}
      <View style={styles.header}>
        <IconButton iconName="arrow-back" onPress={() => {/**/}} />
        <IconButton iconName="menu" onPress={() => onNavigate('Menu')} />
      </View>

      {/* Logo do SENAI */}
      <Image source={require('@/assets/images/Logo.png')} style={styles.logo} />
      <Text style={styles.subtitle}>Patrimônios em ordem</Text>

      {/* Sessão de Serviços */}
      <Text style={styles.title}>Serviços</Text>
      <Text style={styles.description}>
        Sua solução definitiva para gerenciar patrimônios de maneira eficiente e organizada.
      </Text>

      <View style={styles.servicesContainer}>
        {/* Exibe os botões com base no tipo de usuário */}
        {userType === 'coordenador' && (
          <>
            <TouchableOpacity style={styles.serviceButton} onPress={() => onNavigate('Patrimonio')}>
              <Text style={styles.buttonText}>Editar & Mover um patrimônio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.serviceButton} onPress={() => onNavigate('Patrimonio')}>
              <Text style={styles.buttonText}>Adicionar & Excluir um patrimônio</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity style={styles.serviceButton} onPress={() => onNavigate('Patrimonio')}>
          <Text style={styles.buttonText}>Adicionar à lista de manutenção do patrimônio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.serviceButton} onPress={() => onNavigate('Patrimonio')}>
          <Text style={styles.buttonText}>Ver Tabela de Patrimônios</Text>
        </TouchableOpacity>
      </View>

      <Image source={require('@/assets/images/Ellipse 9.png')} style={styles.ellipse} />

      {/* Passa a função onNavigate para o Footer */}
      <Footer onNavigate={onNavigate} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    backgroundColor: '#8B0000',
    borderRadius: 20,
    padding: 15,
  },
  logo: {
    width: 170,
    height: 70,
    marginTop: 10,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000000',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  serviceButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    width: '40%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ellipse: {
    position: 'absolute',
    bottom: 100,
    left: -110, 
    width: 400,
    height: 400,
    resizeMode: 'contain',
    zIndex: -1,
  },
});

export default ServiceHomeScreen;
