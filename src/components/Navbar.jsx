import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';

export default function Navbar({ title }) {
  const { colors, theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  // Colores dinámicos para el navbar según el tema
  const navbarBgColor = theme === 'light' ? '#3b82f6' : '#1e293b';
  const navbarBorderColor = theme === 'light' ? '#1e40af' : '#0f172a';

  return (
    <View style={[styles.navbar, { 
      backgroundColor: navbarBgColor,
      borderBottomColor: navbarBorderColor 
    }]}>
      <Text style={[styles.title, { color: '#fff' }]}>{title}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          onPress={toggleTheme}
          style={[styles.iconButton, { backgroundColor: 'rgba(255,255,255,0.15)' }]}
          activeOpacity={0.7}
        >
          <Ionicons 
            name={theme === 'light' ? 'moon' : 'sunny'} 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleLogout}
          style={[styles.logoutButton, { backgroundColor: 'rgba(255,255,255,0.15)' }]}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
  },
});
