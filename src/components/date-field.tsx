import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { createElement, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';

import { AppIcon } from '@/components/app-icon';
import { styles } from '@/components/text-field.styles';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { formatDisplayDate, formatISODate } from '@/lib/format';

export type DateFieldProps = {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  minimumDate?: Date;
};

export function DateField({ label, value, onChange, minimumDate }: DateFieldProps) {
  const theme = useTheme();
  const [showIOSPicker, setShowIOSPicker] = useState(false);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.label}>{label}</ThemedText>
        {createElement('input', {
          type: 'date',
          value: formatISODate(value),
          min: minimumDate ? formatISODate(minimumDate) : undefined,
          onChange: (e: { target: { value: string } }) => {
            if (e.target.value) onChange(new Date(`${e.target.value}T00:00:00`));
          },
          style: {
            border: `1.5px solid ${theme.border}`,
            borderRadius: 12,
            padding: '12px 16px',
            fontSize: 16,
            color: theme.text,
            backgroundColor: 'transparent',
            fontFamily: 'inherit',
            // Lets the browser pick a visible variant of its native
            // calendar-icon/UI for the current color scheme.
            colorScheme: 'light dark',
          },
        })}
      </View>
    );
  }

  function handlePress() {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value,
        mode: 'date',
        minimumDate,
        onChange: (_event, selectedDate) => {
          if (selectedDate) onChange(selectedDate);
        },
      });
    } else {
      setShowIOSPicker(true);
    }
  }

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <Pressable onPress={handlePress} style={[styles.inputWrapper, { borderColor: theme.border }]}>
        <View style={styles.icon}>
          <AppIcon sf="calendar" md="calendar_today" size={18} color={theme.textSecondary} />
        </View>
        <ThemedText style={styles.input}>{formatDisplayDate(value)}</ThemedText>
      </Pressable>

      {showIOSPicker ? (
        <DateTimePicker
          value={value}
          mode="date"
          display="inline"
          minimumDate={minimumDate}
          onChange={(_event, selectedDate) => {
            setShowIOSPicker(false);
            if (selectedDate) onChange(selectedDate);
          }}
        />
      ) : null}
    </View>
  );
}
