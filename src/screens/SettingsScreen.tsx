import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SettingsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(false);

  const SettingItem = ({ 
    icon, 
    title, 
    onPress, 
    rightComponent 
  }: { 
    icon: string; 
    title: string; 
    onPress?: () => void;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={!onPress}>
      <Ionicons name={icon as any} size={24} color={Colors.text} />
      <Text style={styles.settingText}>{title}</Text>
      {rightComponent || <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search settings"
            placeholderTextColor={Colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.section}>
          <SettingItem icon="person-outline" title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
          <SettingItem icon="lock-closed-outline" title="Change Password" onPress={() => navigation.navigate('ChangePassword')} />
          <SettingItem icon="mail-outline" title="Email Address" onPress={() => navigation.navigate('EmailAddress')} />
          <SettingItem icon="link-outline" title="Connected Accounts" onPress={() => navigation.navigate('ConnectedAccounts')} />
          <SettingItem icon="time-outline" title="Activity Log" onPress={() => navigation.navigate('ActivityLog')} />
          <SettingItem icon="archive-outline" title="Archived Posts" onPress={() => navigation.navigate('ArchivedPosts')} />
        </View>

        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.section}>
          <SettingItem
            icon="notifications-outline"
            title="Push Notifications"
            rightComponent={
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: Colors.border, true: Colors.primary }}
              />
            }
          />
          <SettingItem
            icon="mail-outline"
            title="Email Notifications"
            rightComponent={
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: Colors.border, true: Colors.primary }}
              />
            }
          />
          <SettingItem icon="options-outline" title="Manage Notification Types" onPress={() => navigation.navigate('NotificationSettings')} />
        </View>

        <Text style={styles.sectionTitle}>Privacy and Safety</Text>
        <View style={styles.section}>
          <SettingItem
            icon="shield-outline"
            title="Private Profile"
            rightComponent={
              <Switch
                value={privateProfile}
                onValueChange={setPrivateProfile}
                trackColor={{ false: Colors.border, true: Colors.primary }}
              />
            }
          />
          <SettingItem
            icon="ban-outline"
            title="Blocked Accounts"
            onPress={() => navigation.navigate('BlockedUsers')}
          />
        </View>

        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.section}>
          <SettingItem icon="color-palette-outline" title="Display & Theme" onPress={() => navigation.navigate('DisplayTheme')} />
          <SettingItem icon="accessibility-outline" title="Accessibility" onPress={() => navigation.navigate('Accessibility')} />
          <SettingItem icon="language-outline" title="Language" onPress={() => navigation.navigate('Language')} />
        </View>

        <Text style={styles.sectionTitle}>About Us</Text>
        <View style={styles.section}>
          <SettingItem icon="information-circle-outline" title="About the App" onPress={() => navigation.navigate('AboutUs')} />
          <SettingItem icon="document-text-outline" title="Terms of Service" onPress={() => navigation.navigate('TermsOfService')} />
          <SettingItem icon="shield-checkmark-outline" title="Privacy Policy" onPress={() => navigation.navigate('PrivacyPolicy')} />
        </View>

        <Text style={styles.sectionTitle}>Help & Support</Text>
        <View style={styles.section}>
          <SettingItem icon="help-circle-outline" title="Help Center" onPress={() => navigation.navigate('HelpSupport')} />
          <SettingItem icon="warning-outline" title="Report a Problem" onPress={() => navigation.navigate('ReportIssue')} />
          <SettingItem
            icon="star-outline"
            title="Rate the App"
            onPress={() => navigation.navigate('RateApp')}
            rightComponent={<Ionicons name="star" size={20} color={Colors.primary} />}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  headerRight: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    margin: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
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
  section: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
  },
  logoutText: {
    fontSize: 16,
    color: Colors.error,
    marginLeft: 12,
    fontWeight: '600',
  },
  version: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'center',
    paddingVertical: 16,
  },
});

