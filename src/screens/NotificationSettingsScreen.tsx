import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';
import * as SettingsService from '../services/settingsService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function NotificationSettingsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [likes, setLikes] = useState(true);
  const [comments, setComments] = useState(true);
  const [mentions, setMentions] = useState(true);
  const [follows, setFollows] = useState(true);
  const [messages, setMessages] = useState(true);
  const [communityPosts, setCommunityPosts] = useState(true);
  const [collaborations, setCollaborations] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await SettingsService.getSettings();
      setLikes(settings.notifications.likes);
      setComments(settings.notifications.comments);
      setMentions(settings.notifications.mentions);
      setFollows(settings.notifications.follows);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleNotificationChange = async (
    setter: (value: boolean) => void,
    value: boolean,
    settingName: string,
    settingKey?: keyof SettingsService.AppSettings['notifications']
  ) => {
    setter(value);
    if (settingKey) {
      try {
        await SettingsService.updateNotificationSettings({ [settingKey]: value });
      } catch (error) {
        console.error('Error saving notification setting:', error);
        setter(!value); // Revert on error
      }
    }
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
      <Header title="Notification Settings" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Methods</Text>
          <SettingItem
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="Receive notifications on your device"
            value={pushNotifications}
            onValueChange={(value) => handleNotificationChange(setPushNotifications, value, 'Push Notifications')}
          />
          <SettingItem
            icon="mail-outline"
            title="Email Notifications"
            subtitle="Receive notifications via email"
            value={emailNotifications}
            onValueChange={(value) => handleNotificationChange(setEmailNotifications, value, 'Email Notifications')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What to Notify Me About</Text>
          <SettingItem
            icon="heart-outline"
            title="Likes"
            subtitle="When someone likes your post"
            value={likes}
            onValueChange={(value) => handleNotificationChange(setLikes, value, 'Likes', 'likes')}
          />
          <SettingItem
            icon="chatbubble-outline"
            title="Comments"
            subtitle="When someone comments on your post"
            value={comments}
            onValueChange={(value) => handleNotificationChange(setComments, value, 'Comments', 'comments')}
          />
          <SettingItem
            icon="at-outline"
            title="Mentions"
            subtitle="When someone mentions you"
            value={mentions}
            onValueChange={(value) => handleNotificationChange(setMentions, value, 'Mentions', 'mentions')}
          />
          <SettingItem
            icon="person-add-outline"
            title="New Followers"
            subtitle="When someone follows you"
            value={follows}
            onValueChange={(value) => handleNotificationChange(setFollows, value, 'New Followers', 'follows')}
          />
          <SettingItem
            icon="mail-outline"
            title="Messages"
            subtitle="When you receive a new message"
            value={messages}
            onValueChange={(value) => handleNotificationChange(setMessages, value, 'Messages')}
          />
          <SettingItem
            icon="people-outline"
            title="Community Posts"
            subtitle="New posts in communities you follow"
            value={communityPosts}
            onValueChange={(value) => handleNotificationChange(setCommunityPosts, value, 'Community Posts')}
          />
          <SettingItem
            icon="handshake-outline"
            title="Collaboration Requests"
            subtitle="When someone requests to collaborate"
            value={collaborations}
            onValueChange={(value) => handleNotificationChange(setCollaborations, value, 'Collaboration Requests')}
          />
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
});

