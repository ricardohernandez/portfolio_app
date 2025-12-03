import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import LoginScreen from './screens/LoginScreen';
import MainTabNavigator from './navigation/MainTabNavigator';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      {!user ? (
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ animationEnabled: false }}
        />
      ) : (
        <Stack.Screen 
          name="Main" 
          component={MainTabNavigator}
          options={{ animationEnabled: false }}
        />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}