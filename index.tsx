import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Home from './telas/home';
import ServiceHomeScreen from './telas/ServiceHome'; 
import LoginScreen from './telas/login';
import InventarioScreen from './telas/inventario'; 
import Menu from './telas/menu';
import ScannerScreen from './telas/LeitorScreen';
import PatrimonioScreen from './telas/patrimonios';
import EditarPerfil from './telas/EditarPerfil';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [currentUserType, setCurrentUserType] = useState<'coordenador' | 'professor'>('coordenador'); // Definindo o tipo de usuário

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <Home onNavigate={setCurrentScreen} />;
      case 'ServiceHome':
        return <ServiceHomeScreen onNavigate={setCurrentScreen} userType={currentUserType} />; // Passando o userType
      case 'Perfil':
        return <EditarPerfil onNavigate={setCurrentScreen} />;
      case 'Login':
        return <LoginScreen onNavigate={setCurrentScreen} setCurrentUserType={setCurrentUserType} />; // Supondo que LoginScreen também altera o tipo de usuário
      case 'Inventario':
        return <InventarioScreen onNavigate={setCurrentScreen} />; 
      case 'Menu':
        return <Menu onNavigate={setCurrentScreen} />;
      case 'Leitor':
        return <ScannerScreen onNavigate={setCurrentScreen} />;
      case 'Patrimonio':
        return <PatrimonioScreen onNavigate={setCurrentScreen} />;
      default:
        return <Home onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default App;
