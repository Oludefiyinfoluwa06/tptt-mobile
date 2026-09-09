import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'tptt_auth_token';

// expo-secure-store has no web implementation, so fall back to localStorage there.
const webStorage = {
  getToken: async () => localStorage.getItem(TOKEN_KEY),
  setToken: async (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clearToken: async () => localStorage.removeItem(TOKEN_KEY),
};

const nativeStorage = {
  getToken: () => SecureStore.getItemAsync(TOKEN_KEY),
  setToken: (token: string) => SecureStore.setItemAsync(TOKEN_KEY, token),
  clearToken: () => SecureStore.deleteItemAsync(TOKEN_KEY),
};

export const authStorage = Platform.OS === 'web' ? webStorage : nativeStorage;
