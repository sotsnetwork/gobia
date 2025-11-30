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

export default function PrivacySettingsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [privateProfile, setPrivateProfile] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [allowMessages, setAllowMessages] = useState(true);
  const [showActivity, setShowActivity] = useState(true);
  const [allowTagging, setAllowTagging] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const handleSettingChange = (
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
    type = 'switch',
    onPress,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    type?: 'switch' | 'button';
    onPress?: () => void;
  }) => (
    <View style={styles.settingItem}>
      <Ionicons name={icon as any} size={24} color={Colors.text} />
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {type === 'switch' && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: Colors.border, true: Colors.primary }}
        />
      )}
      {type === 'button' && (
        <TouchableOpacity onPress={onPress}>
          <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Privacy Settings" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Privacy</Text>
          <SettingItem
            icon="lock-closed-outline"
            title="Private Profile"
            subtitle="Only approved followers can see your posts"
            value={privateProfile}
            onValueChange={(value) =>
              handleSettingChange(
                setPrivateProfile,
                value,
                'Private Profile',
                'Your profile is now private. Only approved followers can see your posts.',
                'Your profile is now public. Everyone can see your posts.'
              )
            }
          />
          <SettingItem
            icon="mail-outline"
            title="Show Email"
            subtitle="Display your email on your profile"
            value={showEmail}
            onValueChange={(value) =>
              handleSettingChange(
                setShowEmail,
                value,
                'Show Email',
                'Your email will now be visible on your profile.',
                'Your email will be hidden from your profile.'
              )
            }
          />
          <SettingItem
            icon="mail-outline"
            title="Who can message you"
            subtitle="Control who can send you messages"
            type="button"
            onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity</Text>
          <SettingItem
            icon="eye-outline"
            title="Show Activity Status"
            subtitle="Let others see when you're active"
            value={showActivity}
            onValueChange={(value) =>
              handleSettingChange(
                setShowActivity,
                value,
                'Activity Status',
                'Others can now see when you\'re active.',
                'Your activity status is now hidden.'
              )
            }
          />
          <SettingItem
            icon="at-outline"
            title="Allow Tagging"
            subtitle="Let others tag you in posts"
            value={allowTagging}
            onValueChange={(value) =>
              handleSettingChange(
                setAllowTagging,
                value,
                'Tagging',
                'Others can now tag you in posts.',
                'Others can no longer tag you in posts.'
              )
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Security</Text>
          <SettingItem
            icon="shield-outline"
            title="Data Sharing"
            subtitle="Help improve the app by sharing usage data"
            value={dataSharing}
            onValueChange={(value) =>
              handleSettingChange(
                setDataSharing,
                value,
                'Data Sharing',
                'You\'re helping improve Gobia by sharing usage data.',
                'Data sharing is now disabled.'
              )
            }
          />
          <SettingItem
            icon="ban-outline"
            title="Blocked Accounts"
            type="button"
            onPress={() => navigation.navigate('BlockedUsers')}
          />
          <SettingItem
            icon="download-outline"
            title="Export Your Data"
            type="button"
            onPress={() => navigation.navigate('ExportUserData')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={() =>
              Alert.alert('Delete Account', 'This action cannot be undone.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => {} },
              ])
            }
          >
            <Ionicons name="trash-outline" size={24} color={Colors.error} />
            <Text style={styles.dangerButtonText}>Delete Account</Text>
          </TouchableOpacity>
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
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  dangerButtonText: {
    fontSize: 16,
    color: Colors.error,
    marginLeft: 12,
    fontWeight: '600',
  },
});

