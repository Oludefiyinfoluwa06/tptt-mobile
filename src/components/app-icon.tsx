import { SymbolView } from 'expo-symbols';
import type { AndroidSymbol } from 'expo-symbols';
import type { ColorValue } from 'react-native';
import type { SFSymbol } from 'sf-symbols-typescript';

export type AppIconProps = {
  sf: SFSymbol;
  md: AndroidSymbol;
  size?: number;
  color: ColorValue;
};

export function AppIcon({ sf, md, size = 20, color }: AppIconProps) {
  return (
    <SymbolView
      name={{ ios: sf, android: md, web: md }}
      size={size}
      tintColor={color}
      resizeMode="scaleAspectFit"
    />
  );
}
