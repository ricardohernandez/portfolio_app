import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Backend remoto en Render
const REMOTE_API_URL = 'https://porfolio-api-56mv.onrender.com/api';

// Detectar si está en navegador (web) o en móvil (app)
const isWeb = Platform.OS === 'web';

// En web (Expo web), usar localhost
// En móvil, usar el backend remoto de Render
const API_URL = isWeb 
  ? 'http://localhost:5001/api'
  : REMOTE_API_URL;

console.log('🔌 API Configuration:', { API_URL, isWeb, Platform: Platform.OS });

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('📤 Request:', { method: config.method, url: config.url });
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', { status: response.status, url: response.config.url });
    return response;
  },
  async (error) => {
    console.error('❌ Response Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });
    
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export default api;