import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';

export default function SkillsScreen() {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.container}>
      <Navbar title="Skills" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>

        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>⚡</Text>
          <Text style={styles.emptyTitle}>Próximamente</Text>
          <Text style={styles.emptyText}>
            Aquí podrás gestionar todas las habilidades de tu portafolio.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    flexGrow: 1,
  },
  emptyState: {
    backgroundColor: colors.cardBackground,
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
