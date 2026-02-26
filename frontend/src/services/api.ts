import axios from 'axios';
import { Platform } from 'react-native';

const DEFAULT_BACKEND_URL = 'http://localhost:8001';

const normalizeUrl = (url: string) => url.replace(/\/+$/, '');

// Determinar URL del backend
const getBackendUrl = () => {
  if (process.env.EXPO_PUBLIC_BACKEND_URL) {
    return normalizeUrl(process.env.EXPO_PUBLIC_BACKEND_URL);
  }

  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    const { hostname, origin, port } = window.location;
    const isLocalHost = ['localhost', '127.0.0.1'].includes(hostname);

    // Para desarrollo web local, reutilizar el mismo host y puerto del backend.
    if (isLocalHost && port !== '8001') {
      return `http://${hostname}:8001`;
    }

    // Si el frontend y backend están detrás del mismo dominio (proxy/reverse proxy).
    if (!isLocalHost) {
      return normalizeUrl(origin);
    }
  }

  return DEFAULT_BACKEND_URL;
};

const BACKEND_URL = getBackendUrl();

export const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Retry logic para conexiones inestables
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (!config) {
      return Promise.reject(error);
    }
    
    // Si no hay config o ya reintentamos 3 veces, fallar
    if (config._retryCount >= 3) {
      return Promise.reject(error);
    }
    
    // Reintentar en errores de red o timeout
    if (!error.response || error.code === 'ECONNABORTED') {
      config._retryCount = (config._retryCount || 0) + 1;
      
      // Esperar antes de reintentar (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * config._retryCount));
      
      return api(config);
    }

    // Mejorar mensaje para problemas de conexión comunes.
    if (error.response?.status === 404) {
      error.message = 'No se encontró el endpoint del backend. Revisa EXPO_PUBLIC_BACKEND_URL.';
    }
    
    return Promise.reject(error);
  }
);

export default api;
