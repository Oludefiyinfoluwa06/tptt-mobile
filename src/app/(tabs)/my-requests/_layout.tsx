import { Stack } from 'expo-router';

export default function MyRequestsStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="apply-visa" />
      <Stack.Screen name="visa/[id]" />
    </Stack>
  );
}
