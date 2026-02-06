import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#2DA9DF',
  blue: '#2563EB',
  green: '#16A34A',
  bg: '#F9FAFB',
  gray: '#6B7280',
};

type Filtro = 'diario' | 'semanal' | 'mensual';

const FILTROS: Filtro[] = ['diario', 'semanal', 'mensual'];

const METRICS = [
  {
    label: 'Convocatorias',
    value: 128,
    icon: 'megaphone-outline',
    color: COLORS.blue,
  },
  {
    label: 'Historiales clínicos',
    value: 342,
    icon: 'document-text-outline',
    color: COLORS.green,
  },
] as const;

export default function DashboardScreen() {
  const [filtro, setFiltro] = useState<Filtro>('mensual');

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>
        Resumen general del sistema óptico
      </Text>

      <View style={styles.cardsRow}>
        {METRICS.map((item) => (
          <View key={item.label} style={styles.metricCard}>
            <Ionicons
              name={item.icon}
              size={26}
              color={item.color}
            />
            <Text style={styles.metricNumber}>
              {item.value}
            </Text>
            <Text style={styles.metricLabel}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>
            Análisis de rendimiento
          </Text>

          <View style={styles.filters}>
            {FILTROS.map((item) => (
              <Pressable
                key={item}
                style={[
                  styles.filterButton,
                  filtro === item && styles.filterActive,
                ]}
                onPress={() => setFiltro(item)}
              >
                <Text
                  style={[
                    styles.filterText,
                    filtro === item &&
                      styles.filterTextActive,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.legend}>
          {METRICS.map((item) => (
            <View key={item.label} style={styles.legendItem}>
              <View
                style={[
                  styles.legendColor,
                  { backgroundColor: item.color },
                ]}
              />
              <Text style={styles.legendText}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.chartPlaceholder}>
          <Ionicons
            name="bar-chart-outline"
            size={48}
            color="#9CA3AF"
          />
          <Text style={styles.chartText}>
            Gráfico de barras dobles ({filtro})
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: Platform.OS === 'web' ? 24 : 16,
    backgroundColor: COLORS.bg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 24,
    color: COLORS.gray,
  },

  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    gap: 6,
  },
  metricNumber: {
    fontSize: 28,
    fontWeight: '700',
  },
  metricLabel: {
    color: COLORS.gray,
    fontSize: 13,
  },

  chartCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 14,
  },
  chartHeader: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems:
      Platform.OS === 'web' ? 'center' : 'flex-start',
    gap: 12,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  filterActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 12,
    color: '#374151',
    textTransform: 'capitalize',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },

  legend: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 12,
    color: '#374151',
  },

  chartPlaceholder: {
    marginTop: 20,
    height: 220,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  chartText: {
    color: COLORS.gray,
  },
});
