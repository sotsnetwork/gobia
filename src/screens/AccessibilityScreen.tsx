import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AccessibilityScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largerText, setLargerText] = useState(false);
  const [boldText, setBoldText] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState(false);

  const handleAccessibilityChange = (
    setter: (value: boolean) => void,
    value: boolean,
    settingName: string,
    enabledMessage: string,
    disabledMessage: string
  ) => {
    setter(value);
    // Simulate API call
    setTimeout(() => {
      Alert.alert(
        value ? `${settingName} Enabled` : `${settingName} Disabled`,
        value ? enabledMessage : disabledMessage,
        [{ text: 'OK' }]
      );
    }, 300);
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    value,
    onValueChange,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  }) => (
    <View style={styles.settingItem}>
      <Ionicons name={icon as any} size={24} color={Colors.text} />
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: Colors.border, true: Colors.primary }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Accessibility" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visual</Text>
          <SettingItem
            icon="eye-outline"
            title="High Contrast"
            subtitle="Increase contrast for better visibility"
            value={highContrast}
            onValueChange={(value) =>
              handleAccessibilityChange(
                setHighContrast,
                value,
                'High Contrast',
                'High contrast mode is now enabled for better visibility.',
                'High contrast mode is now disabled.'
              )
            }
          />
          <SettingItem
            icon="text-outline"
            title="Larger Text"
            subtitle="Increase text size throughout the app"
            value={largerText}
            onValueChange={(value) =>
              handleAccessibilityChange(
                setLargerText,
                value,
                'Larger Text',
                'Text size has been increased throughout the app.',
                'Text size has been reset to default.'
              )
            }
          />
          <SettingItem
            icon="text"
            title="Bold Text"
            subtitle="Make text bolder for better readability"
            value={boldText}
            onValueChange={(value) =>
              handleAccessibilityChange(
                setBoldText,
                value,
                'Bold Text',
                'Text is now displayed in bold for better readability.',
                'Text is now displayed in regular weight.'
              )
            }
          />
          <SettingItem
            icon="color-filter-outline"
            title="Color Blind Mode"
            subtitle="Adjust colors for color vision deficiencies"
            value={colorBlindMode}
            onValueChange={(value) =>
              handleAccessibilityChange(
                setColorBlindMode,
                value,
                'Color Blind Mode',
                'Color blind mode is now enabled. Colors have been adjusted.',
                'Color blind mode is now disabled.'
              )
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Motion</Text>
          <SettingItem
            icon="move-outline"
            title="Reduce Motion"
            subtitle="Minimize animations and transitions"
            value={reduceMotion}
            onValueChange={(value) =>
              handleAccessibilityChange(
                setReduceMotion,
                value,
                'Reduce Motion',
                'Animations and transitions are now minimized.',
                'Animations and transitions are now enabled.'
              )
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assistive Technologies</Text>
          <SettingItem
            icon="ear-outline"
            title="Screen Reader Support"
            subtitle="Enable support for screen readers"
            value={screenReader}
            onValueChange={(value) =>
              handleAccessibilityChange(
                setScreenReader,
                value,
                'Screen Reader Support',
                'Screen reader support is now enabled.',
                'Screen reader support is now disabled.'
              )
            }
          />
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={Colors.info} />
          <Text style={styles.infoText}>
            These settings help make Gobia more accessible. Changes may require an app restart to take full effect.
          </Text>
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
  section: {
    marginTop: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  settingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.info + '15',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

