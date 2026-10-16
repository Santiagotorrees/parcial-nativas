import * as Haptics from 'expo-haptics';
import { Platform, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  // Validación del sistema operativo
  const isAndroid = Platform.OS === 'android';

  // Funcionalidad Nativa 1: Respuesta Háptica (Vibración)
  const handleHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  // Funcionalidad Nativa 2: Compartir
  const handleShare = async () => {
    try {
      await Share.share({
        message: '¡Hola! Estoy probando mis funcionalidades nativas en mi app móvil.',
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isAndroid ? '#e0f7fa' : '#f3e5f5' }]}>
      <Text style={styles.title}>Funcionalidades Nativas</Text>
      
      {/* Adaptación visual según el sistema operativo */}
      <Text style={styles.subtitle}>
        Estás ejecutando la app en: {isAndroid ? 'Android 🤖' : 'iOS 🍏'}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleHaptic}>
        <Text style={styles.buttonText}>Probar Vibración</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.shareButton]} onPress={handleShare}>
        <Text style={styles.buttonText}>Compartir Mensaje</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  subtitle: { fontSize: 16, marginBottom: 40, color: '#666' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', marginBottom: 15 },
  shareButton: { backgroundColor: '#34C759' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});