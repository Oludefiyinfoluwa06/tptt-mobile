import { Link } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getErrorMessage } from '@/api/client';
import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/auth-context';

import { styles } from './login-screen.styles';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setError(null);
    setIsSubmitting(true);
    try {
      await login({ email, password });
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to log in. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ThemedView style={styles.header}>
            <ThemedText type="title">Welcome back</ThemedText>
            <ThemedText themeColor="textSecondary">Log in to continue your journey</ThemedText>
          </ThemedView>

          <ThemedView style={styles.form}>
            <TextField
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoComplete="email"
              placeholder="you@example.com"
            />
            <TextField
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
              placeholder="••••••••"
            />

            {error ? (
              <ThemedText style={styles.formError} themeColor="danger">
                {error}
              </ThemedText>
            ) : null}

            <Button
              label="Log in"
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={!email || !password}
            />
          </ThemedView>

          <ThemedView style={styles.footer}>
            <ThemedText themeColor="textSecondary">Don&apos;t have an account?</ThemedText>
            <Link href="/(auth)/register">
              <ThemedText type="linkPrimary">Register</ThemedText>
            </Link>
          </ThemedView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}
