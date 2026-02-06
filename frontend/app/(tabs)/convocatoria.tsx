import { View, Text, StyleSheet } from 'react-native';

export default function ConvocatoriaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Convocatoria</Text>
      <Text style={styles.text}>Pantalla con datos simulados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  text: {
    color: '#6B7280',
  },
});
