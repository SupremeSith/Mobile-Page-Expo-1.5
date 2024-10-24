import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface HomeProps {
  onNavigate: (screen: string) => void; 
}

export default function Home({ onNavigate }: HomeProps) {
  const isLargeScreen = width > 767;

  return (
    <View style={styles.container}>

      <Image
        source={require('@/assets/images/Vector 1.png')}
        style={[
          styles.vector1,
          {
            width: isLargeScreen ? width * 0.6 : width * 0.4,
            height: isLargeScreen ? height * 0.9 : height * 0.7,
            left: isLargeScreen ? -160 : -37
          },
        ]}
      />

      <Image
        source={require('@/assets/images/Vector 2.png')}
        style={[
          styles.vector2,
          {
            width: isLargeScreen ? width * 0.6 : width * 0.4, 
            height: isLargeScreen ? height * 0.9 : height * 0.7, 
            right: isLargeScreen ? -160 : -37
          },
        ]}
      />

      <View style={styles.background}>
        <View style={styles.content}>
          <Text style={[
            styles.subtitle,
            { fontSize: isLargeScreen ? 40 : 20 }
          ]}>Patrimônios em ordem</Text>

          <Image 
            source={require('@/assets/images/Logo.png')} 
            style={[
              styles.logo,
              {
                width: isLargeScreen ? 300 : 160,
                height: isLargeScreen ? 120 : 55
              }
            ]} 
          />

          <Text style={[
            styles.title,
            { fontSize: isLargeScreen ? 46 : 26 }
          ]}>Bem vindo!</Text>

          {/* Botão "Entrar" que navega para a tela de Login */}
          <TouchableOpacity 
            style={[
              styles.button,
              {
                paddingVertical: isLargeScreen ? 20 : 10,
                paddingHorizontal: isLargeScreen ? 65 : 40,
              }
            ]}
            onPress={() => onNavigate('Login')} 
          >
            <Text style={[
              styles.buttonText,
              { fontSize: isLargeScreen ? 30 : 16 }
            ]}>
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  subtitle: {
    color: '#000',
    marginBottom: 10,
  },
  logo: {
    resizeMode: 'contain',
  },
  title: {
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#A90E13',
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  vector1: {
    position: 'absolute',
    bottom: 0,
    resizeMode: 'contain',
    zIndex: 1,
  },
  vector2: {
    position: 'absolute',
    top: 0,
    resizeMode: 'contain',
    zIndex: 1,
  },
});
