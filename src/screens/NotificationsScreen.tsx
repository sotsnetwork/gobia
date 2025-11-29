import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'community';
  user: string;
  userHandle: string;
  message: string;
  time: string;
  read: boolean;
  postId?: string;
}

const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: 'Sarah Johnson',
    userHandle: '@sarahj',
    message: 'liked your post',
    time: '2m',
    read: false,
    postId: '1',
  },
  {
    id: '2',
    type: 'comment',
    user: 'Mike Davis',
    userHandle: '@miked',
    message: 'commented on your post',
    time: '15m',
    read: false,
    postId: '2',
  },
  {
    id: '3',
    type: 'follow',
    user: 'Elena Martinez',
    userHandle: '@elena_dev',
    message: 'started following you',
    time: '1h',
    read: true,
  },
  {
    id: '4',
    type: 'mention',
    user: 'Builder Bro',
    userHandle: '@builderbro',
    message: 'mentioned you in a post',
    time: '2h',
    read: true,
    postId: '3',
  },
  {
    id: '5',
    type: 'community',
    user: 'React Native Devs',
    userHandle: '@reactnative_devs',
    message: 'New post in React Native Developers',
    time: '3h',
    read: true,
    postId: '4',
  },
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'like':
      return 'heart';
    case 'comment':
      return 'chatbubble';
    case 'follow':
      return 'person-add';
    case 'mention':
      return 'at';
    case 'community':
      return 'people';
    default:
      return 'notifications';
  }
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'like':
      return Colors.error;
    case 'comment':
      return Colors.info;
    case 'follow':
      return Colors.primary;
    case 'mention':
      return Colors.warning;
    case 'community':
      return Colors.success;
    default:
      return Colors.textLight;
  }
};

export default function NotificationsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !notification.read && styles.unreadNotification]}
      onPress={() => {
        if (notification.postId) {
          navigation.navigate('PostDetail', { postId: notification.postId });
        }
      }}
    >
      <View style={[styles.iconContainer, { backgroundColor: getNotificationColor(notification.type) + '20' }]}>
        <Ionicons
          name={getNotificationIcon(notification.type)}
          size={24}
          color={getNotificationColor(notification.type)}
        />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>
          <Text style={styles.userName}>{notification.user}</Text> {notification.message}
        </Text>
        <Text style={styles.notificationTime}>{notification.time}</Text>
      </View>
      {!notification.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {sampleNotifications.length > 0 ? (
          sampleNotifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-outline" size={64} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptyText}>
              When you get notifications, they'll show up here.
            </Text>
          </View>
        )}
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
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.white,
  },
  unreadNotification: {
    backgroundColor: Colors.primaryLight + '10',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 4,
  },
  userName: {
    fontWeight: '600',
  },
  notificationTime: {
    fontSize: 14,
    color: Colors.textLight,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    minHeight: 400,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

