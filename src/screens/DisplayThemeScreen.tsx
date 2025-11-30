import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Theme = 'light' | 'dark' | 'auto';
type FontSize = 'small' | 'medium' | 'large';

export default function DisplayThemeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [theme, setTheme] = useState<Theme>('light');
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const themes: { value: Theme; label: string; description: string }[] = [
    { value: 'light', label: 'Light', description: 'Default light theme' },
    { value: 'dark', label: 'Dark', description: 'Dark mode for low-light viewing' },
    { value: 'auto', label: 'Auto', description: 'Follow system settings' },
  ];

  const fontSizes: { value: FontSize; label: string; description: string }[] = [
    { value: 'small', label: 'Small', description: 'Compact text size' },
    { value: 'medium', label: 'Medium', description: 'Default text size' },
    { value: 'large', label: 'Large', description: 'Larger text for readability' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Display & Theme" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme</Text>
          {themes.map((t) => (
            <TouchableOpacity
              key={t.value}
              style={[styles.option, theme === t.value && styles.optionActive]}
              onPress={() => setTheme(t.value)}
            >
              <View style={styles.optionInfo}>
                <Text style={styles.optionLabel}>{t.label}</Text>
                <Text style={styles.optionDescription}>{t.description}</Text>
              </View>
              <View style={[styles.radio, theme === t.value && styles.radioActive]}>
                {theme === t.value && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Text Size</Text>
          {fontSizes.map((fs) => (
            <TouchableOpacity
              key={fs.value}
              style={[styles.option, fontSize === fs.value && styles.optionActive]}
              onPress={() => setFontSize(fs.value)}
            >
              <View style={styles.optionInfo}>
                <Text style={styles.optionLabel}>{fs.label}</Text>
                <Text style={styles.optionDescription}>{fs.description}</Text>
              </View>
              <View style={[styles.radio, fontSize === fs.value && styles.radioActive]}>
                {fontSize === fs.value && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accessibility</Text>
          <View style={styles.switchOption}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>Reduce Motion</Text>
              <Text style={styles.switchDescription}>Minimize animations and transitions</Text>
            </View>
            <TouchableOpacity
              style={[styles.switch, reduceMotion && styles.switchActive]}
              onPress={() => setReduceMotion(!reduceMotion)}
            >
              <View style={[styles.switchThumb, reduceMotion && styles.switchThumbActive]} />
            </TouchableOpacity>
          </View>
          <View style={styles.switchOption}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>High Contrast</Text>
              <Text style={styles.switchDescription}>Increase contrast for better visibility</Text>
            </View>
            <TouchableOpacity
              style={[styles.switch, highContrast && styles.switchActive]}
              onPress={() => setHighContrast(!highContrast)}
            >
              <View style={[styles.switchThumb, highContrast && styles.switchThumbActive]} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  optionActive: {
    // Active styling
  },
  optionInfo: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  switchOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  switchInfo: {
    flex: 1,
  },
  switchLabel: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  switchDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.border,
    padding: 3,
    justifyContent: 'center',
  },
  switchActive: {
    backgroundColor: Colors.primary,
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
});

