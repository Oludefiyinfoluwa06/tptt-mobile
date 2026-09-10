/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform, type ViewStyle } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    primary: '#2F6FED',
    primaryMuted: '#E8EFFE',
    onPrimary: '#ffffff',
    accent: '#FF7A59',
    accentMuted: '#FFE9E2',
    onAccent: '#ffffff',
    border: '#E1E4EA',
    danger: '#E5484D',
    dangerMuted: '#FDE8E8',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    primary: '#5B90F5',
    primaryMuted: '#1B2A4E',
    onPrimary: '#ffffff',
    accent: '#FF8F72',
    accentMuted: '#3A2420',
    onAccent: '#ffffff',
    border: '#2E3136',
    danger: '#F87171',
    dangerMuted: '#3A1E1F',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  full: 999,
} as const;

/** Soft elevation for cards and other raised surfaces. */
export const CardShadow: ViewStyle = Platform.select<ViewStyle>({
  android: { elevation: 4 },
  default: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
})!;

/** Diagonal brand gradients, used sparingly for hero accents. */
export const Gradients = {
  primary: ['#4A8CFF', '#2F6FED'] as const,
  sunset: ['#FF9966', '#FF6B6B'] as const,
};

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

/**
 * NativeTabs never reserves layout space for itself, so every tab screen
 * pads around it manually. On native it's a translucent bottom bar; on web
 * `expo-router/unstable-native-tabs` renders a fixed floating pill near the
 * top instead, so the clearance goes on the opposite edge there.
 */
export const TabScreenInset = Platform.select<{ paddingTop?: number; paddingBottom?: number }>({
  web: { paddingTop: 90 },
  default: { paddingBottom: BottomTabInset },
})!;

/** Top clearance for a custom in-screen header nested inside a tab (see `TabScreenInset`). */
export const HeaderTopInset = Platform.select({ web: 90, default: Spacing.four })!;
