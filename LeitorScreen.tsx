import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Clipboard from 'expo-clipboard';
import { Vibration } from 'react-native';
import Footer_Dark from '@/components/footerDark';

interface ScannerScreenProps {
  onNavigate: (screen: string) => void;
}

const ScannerScreen: React.FC<ScannerScreenProps> = ({ onNavigate }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [pulseAnim] = useState(new Animated.Value(1)); // Animação de pulso

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();

    // Iniciar animação de pulso
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setScannedData(data);
    Vibration.vibrate();
    Alert.alert('QR code Escaneado', `Tipo: ${type}\nDados: ${data}`);
  };

  const handleCopyToClipboard = async () => {
    if (scannedData) {
      await Clipboard.setStringAsync(scannedData);
      Alert.alert('Dados copiados!', 'Os dados foram copiados para a área de transferência.');
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para usar a câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera. Por favor, conceda permissão nas configurações.</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.camera}
      />

      {/* Overlay para escurecer a área fora do quadrado de foco */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Escanear QR-Code</Text>

        {/* Quadrado de centralização do QR Code */}
        <View style={styles.scanArea}>
          <Animated.View style={[styles.cornerTopLeft, { transform: [{ scale: pulseAnim }] }]} />
          <Animated.View style={[styles.cornerTopRight, { transform: [{ scale: pulseAnim }] }]} />
          <Animated.View style={[styles.cornerBottomLeft, { transform: [{ scale: pulseAnim }] }]} />
          <Animated.View style={[styles.cornerBottomRight, { transform: [{ scale: pulseAnim }] }]} />
        </View>
      </View>

      {/* Botões e dados escaneados */}
      {scanned && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.scanButton} onPress={() => setScanned(false)}>
            <Text style={styles.scanButtonText}>Escanear novamente</Text>
          </TouchableOpacity>
          {scannedData && <Text style={styles.dataText}>Dados: {scannedData}</Text>}
          <TouchableOpacity style={styles.copyButton} onPress={handleCopyToClipboard}>
            <Text style={styles.scanButtonText}>Copiar Dados</Text>
          </TouchableOpacity>
        </View>
      )}
      <Footer_Dark onNavigate={onNavigate} />
    </View>
  );
};

export default ScannerScreen;

const { width, height } = Dimensions.get('window');
const boxSize = width * 0.7; 
const cornerSize = 40; 
const cornerThickness = 6; 
const cornerRadius = 12; 
const footerHeight = 80; // Altura estimada do Footer_Dark

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: height * 0.8,  
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  scanArea: {
    width: boxSize,
    height: boxSize,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: cornerSize,
    height: cornerSize,
    borderTopWidth: cornerThickness,
    borderLeftWidth: cornerThickness,
    borderColor: 'red',
    borderTopLeftRadius: cornerRadius,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: cornerSize,
    height: cornerSize,
    borderTopWidth: cornerThickness,
    borderRightWidth: cornerThickness,
    borderColor: 'red',
    borderTopRightRadius: cornerRadius,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: cornerSize,
    height: cornerSize,
    borderBottomWidth: cornerThickness,
    borderLeftWidth: cornerThickness,
    borderColor: 'red',
    borderBottomLeftRadius: cornerRadius,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: cornerSize,
    height: cornerSize,
    borderBottomWidth: cornerThickness,
    borderRightWidth: cornerThickness,
    borderColor: 'red',
    borderBottomRightRadius: cornerRadius,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: footerHeight + 20, // Distância do Footer_Dark
    alignItems: 'center',
    width: '100%',
    zIndex: 3,
  },
  scanButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
  },
  copyButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
    marginTop: 10,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dataText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    zIndex: 3,
  },
  title: {
    position: 'absolute',
    top: (height - boxSize) / 2 - 110,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 3,
  },
});
