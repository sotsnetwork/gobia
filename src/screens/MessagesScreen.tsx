import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Message {
  id: string;
  userId: string;
  userName: string;
  userHandle: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  unreadCount?: number;
}

const sampleMessages: Message[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah Johnson',
    userHandle: '@sarahj',
    lastMessage: 'Hey! I saw your post about the AI tool. Would love to collaborate!',
    timestamp: '2m',
    unread: true,
    unreadCount: 2,
  },
  {
    id: '2',
    userId: '2',
    userName: 'Mike Davis',
    userHandle: '@miked',
    lastMessage: 'Thanks for the feedback on my project!',
    timestamp: '1h',
    unread: false,
  },
  {
    id: '3',
    userId: '3',
    userName: 'Elena Martinez',
    userHandle: '@elena_dev',
    lastMessage: 'Can we schedule a call this week?',
    timestamp: '3h',
    unread: true,
    unreadCount: 1,
  },
  {
    id: '4',
    userId: '4',
    userName: 'Builder Bro',
    userHandle: '@builderbro',
    lastMessage: 'The community meetup is this Friday!',
    timestamp: '1d',
    unread: false,
  },
];

export default function MessagesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = sampleMessages.filter(
    (msg) =>
      msg.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.userHandle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.textLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages"
          placeholderTextColor={Colors.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <TouchableOpacity
              key={message.id}
              style={[styles.messageItem, message.unread && styles.unreadMessage]}
              onPress={() =>
                navigation.navigate('Chat', {
                  chatId: message.id,
                  userName: message.userName,
                })
              }
            >
              <View style={styles.avatar} />
              <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <Text style={styles.userName}>{message.userName}</Text>
                  <Text style={styles.timestamp}>{message.timestamp}</Text>
                </View>
                <View style={styles.messageFooter}>
                  <Text
                    style={[styles.lastMessage, message.unread && styles.unreadMessageText]}
                    numberOfLines={1}
                  >
                    {message.lastMessage}
                  </Text>
                  {message.unread && message.unreadCount && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadBadgeText}>{message.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="mail-outline" size={64} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>No messages</Text>
            <Text style={styles.emptyText}>
              {searchQuery
                ? 'No messages match your search'
                : 'Start a conversation by messaging someone!'}
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
  headerLeft: {
    width: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
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
  scrollView: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.white,
  },
  unreadMessage: {
    backgroundColor: Colors.primaryLight + '10',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primaryLight,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.textLight,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  unreadMessageText: {
    color: Colors.text,
    fontWeight: '600',
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    marginLeft: 8,
  },
  unreadBadgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
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

