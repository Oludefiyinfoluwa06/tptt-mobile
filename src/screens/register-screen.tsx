import { Link } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getErrorMessage } from '@/api/client';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { IconCircle } from '@/components/icon-circle';
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
              <IconCircle sf="person.badge.plus" md="person_add" size={64} />
              <ThemedView style={styles.headerText}>
                <ThemedText type="title">Create account</ThemedText>
                <ThemedText themeColor="textSecondary" style={styles.subtitle}>
                  Sign up to start booking your next trip
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <Card style={styles.card}>
              <TextField
                label="Full name"
                value={fullname}
                onChangeText={setFullname}
                autoComplete="name"
                placeholder="Jane Doe"
                icon={{ sf: 'person', md: 'person' }}
              />
              <TextField
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoComplete="email"
                placeholder="you@example.com"
                icon={{ sf: 'envelope', md: 'mail' }}
              />
              <TextField
                label="Phone (optional)"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoComplete="tel"
                placeholder="+1 234 567 890"
                icon={{ sf: 'phone', md: 'call' }}
              />
              <TextField
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password-new"
                placeholder="At least 6 characters"
                icon={{ sf: 'lock', md: 'lock' }}
              />

              {error ? (
                <ThemedView type="dangerMuted" style={styles.errorBanner}>
                  <ThemedText style={styles.errorText} themeColor="danger">
                    {error}
                  </ThemedText>
                </ThemedView>
              ) : null}

              <Button
                label="Create account"
                onPress={handleSubmit}
                loading={isSubmitting}
                disabled={!fullname || !email || password.length < 6}
              />
            </Card>

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
