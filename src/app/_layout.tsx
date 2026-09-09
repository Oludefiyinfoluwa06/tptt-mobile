import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { AuthProvider, useAuth } from '@/context/auth-context';
import { QueryProvider } from '@/providers/query-provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <QueryProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </QueryProvider>
  );
}

function RootNavigator() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, isBootstrapping } = useAuth();

  useEffect(() => {
    if (!isBootstrapping) {
      SplashScreen.hideAsync();
    }
  }, [isBootstrapping]);

  if (isBootstrapping) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}
