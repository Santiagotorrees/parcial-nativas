import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ExploreScreen() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState<any>(null);

  const subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
      })
    );
    // Actualiza los datos cada 500 milisegundos (medio segundo)
    Accelerometer.setUpdateInterval(500);
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  // Se asegura de apagar el sensor si cambias de pestaña para ahorrar batería
  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensor: Acelerómetro</Text>
      <Text style={styles.description}>
        Mueve tu dispositivo físicamente para ver cómo cambian los valores.
      </Text>
      
      <View style={styles.sensorBox}>
        <Text style={styles.sensorText}>Eje X: {x.toFixed(2)}</Text>
        <Text style={styles.sensorText}>Eje Y: {y.toFixed(2)}</Text>
        <Text style={styles.sensorText}>Eje Z: {z.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={subscription ? unsubscribe : subscribe}>
        <Text style={styles.buttonText}>{subscription ? 'Pausar Sensor' : 'Activar Sensor'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 30, color: '#666' },
  sensorBox: { backgroundColor: '#f0f0f0', padding: 20, borderRadius: 15, width: '100%', alignItems: 'center', marginBottom: 30 },
  sensorText: { fontSize: 18, marginVertical: 5, color: '#333' },
  button: { backgroundColor: '#FF9500', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});
