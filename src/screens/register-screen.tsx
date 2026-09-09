import { Link } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getErrorMessage } from '@/api/client';
import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/auth-context';

import { styles } from './register-screen.styles';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setError(null);
    setIsSubmitting(true);
    try {
      await register({ fullname, email, phone: phone || undefined, password });
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to create your account. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <ThemedView style={styles.header}>
              <ThemedText type="title">Create account</ThemedText>
              <ThemedText themeColor="textSecondary">
                Sign up to start booking your next trip
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.form}>
              <TextField
                label="Full name"
                value={fullname}
                onChangeText={setFullname}
                autoComplete="name"
                placeholder="Jane Doe"
              />
              <TextField
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoComplete="email"
                placeholder="you@example.com"
              />
              <TextField
                label="Phone (optional)"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoComplete="tel"
                placeholder="+1 234 567 890"
              />
              <TextField
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password-new"
                placeholder="At least 6 characters"
              />

              {error ? (
                <ThemedText style={styles.formError} themeColor="danger">
                  {error}
                </ThemedText>
              ) : null}

              <Button
                label="Create account"
                onPress={handleSubmit}
                loading={isSubmitting}
                disabled={!fullname || !email || password.length < 6}
              />
            </ThemedView>

            <ThemedView style={styles.footer}>
              <ThemedText themeColor="textSecondary">Already have an account?</ThemedText>
              <Link href="/(auth)/login">
                <ThemedText type="linkPrimary">Log in</ThemedText>
              </Link>
            </ThemedView>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}
