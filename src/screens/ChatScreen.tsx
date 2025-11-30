import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RoutePropType = RouteProp<RootStackParamList, 'Chat'>;

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
  isOwn: boolean;
}

export default function ChatScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { chatId, userName } = route.params || {};
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const messages: Message[] = [
    {
      id: '1',
      text: 'Hey! I saw your post about the AI tool. Would love to collaborate!',
      senderId: 'other',
      timestamp: '10:30 AM',
      isOwn: false,
    },
    {
      id: '2',
      text: 'That sounds great! What kind of collaboration are you thinking?',
      senderId: 'me',
      timestamp: '10:32 AM',
      isOwn: true,
    },
    {
      id: '3',
      text: 'I have experience with ML models and could help with the backend. Are you open to a partnership?',
      senderId: 'other',
      timestamp: '10:35 AM',
      isOwn: false,
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // In real app, send message to backend
      setMessage('');
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title={userName || 'Chat'}
        rightIcon={
          <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userId: chatId || '1', username: userName })}
          >
            <Ionicons name="person-outline" size={24} color={Colors.text} />
          </TouchableOpacity>
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[styles.messageBubble, msg.isOwn ? styles.ownMessage : styles.otherMessage]}
            >
              <Text style={[styles.messageText, msg.isOwn && styles.ownMessageText]}>
                {msg.text}
              </Text>
              <Text style={[styles.timestamp, msg.isOwn && styles.ownTimestamp]}>
                {msg.timestamp}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.attachButton}
            onPress={() => {
              Alert.alert('Attach File', 'Choose an option', [
                { text: 'Photo', onPress: () => Alert.alert('Coming Soon', 'Photo attachment will be available soon') },
                { text: 'Document', onPress: () => Alert.alert('Coming Soon', 'Document attachment will be available soon') },
                { text: 'Cancel', style: 'cancel' },
              ]);
            }}
          >
            <Ionicons name="attach-outline" size={24} color={Colors.textLight} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={Colors.textLight}
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!message.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color={message.trim() ? Colors.white : Colors.textLight}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messagesContent: {
    paddingBottom: 16,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 4,
  },
  ownMessageText: {
    color: Colors.white,
  },
  timestamp: {
    fontSize: 11,
    color: Colors.textLight,
    alignSelf: 'flex-end',
  },
  ownTimestamp: {
    color: Colors.white + 'CC',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    backgroundColor: Colors.white,
    gap: 8,
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.text,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.borderLight,
  },
});

