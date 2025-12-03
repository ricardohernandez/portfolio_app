import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const deviceColorScheme = useDeviceColorScheme();
  const [theme, setTheme] = useState(deviceColorScheme || 'light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Light theme colors
const lightColors = {
  // Backgrounds
  background: '#f8fafc',
  cardBackground: '#ffffff',
  headerBackground: '#ffffff',
  
  // Text
  text: '#0f172a',
  textSecondary: '#64748b',
  textTertiary: '#94a3b8',
  
  // Borders
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  
  // Primary
  primary: '#2563eb',
  primaryHover: '#1d4ed8',
  primaryLight: '#dbeafe',
  
  // Status colors
  success: '#16a34a',
  successLight: '#dcfce7',
  error: '#dc2626',
  errorLight: '#fee2e2',
  warning: '#f59e0b',
  warningLight: '#fef3c7',
  info: '#0ea5e9',
  infoLight: '#e0f2fe',
  
  // Tab bar
  tabBarBackground: '#ffffff',
  tabBarBorder: '#e2e8f0',
  tabBarActive: '#2563eb',
  tabBarInactive: '#64748b',
  
  // Shadows
  shadowColor: '#000000',
  shadowOpacity: 0.1,
};

// Dark theme colors
const darkColors = {
  // Backgrounds
  background: '#0f172a',
  cardBackground: '#1e293b',
  headerBackground: '#1e293b',
  
  // Text
  text: '#f8fafc',
  textSecondary: '#cbd5e1',
  textTertiary: '#94a3b8',
  
  // Borders
  border: '#334155',
  borderLight: '#475569',
  
  // Primary
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  primaryLight: '#1e3a8a',
  
  // Status colors
  success: '#22c55e',
  successLight: '#14532d',
  error: '#ef4444',
  errorLight: '#7f1d1d',
  warning: '#fbbf24',
  warningLight: '#78350f',
  info: '#38bdf8',
  infoLight: '#0c4a6e',
  
  // Tab bar
  tabBarBackground: '#1e293b',
  tabBarBorder: '#334155',
  tabBarActive: '#3b82f6',
  tabBarInactive: '#94a3b8',
  
  // Shadows
  shadowColor: '#000000',
  shadowOpacity: 0.3,
};
