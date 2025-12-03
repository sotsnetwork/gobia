import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform, 
  Alert,
  Modal,
  Animated,
  PanResponder,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
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
  reactions?: { emoji: string; userId: string }[];
  replyTo?: {
    id: string;
    text: string;
    senderId: string;
  };
}

const QUICK_EMOJIS = ['😀', '😂', '❤️', '👍', '👎', '🔥', '🎉', '😮', '😢', '🙏'];
const ALL_EMOJIS = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
  '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
  '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
  '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
  '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
  '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
  '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯',
  '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐',
  '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈',
  '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾',
  '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿',
  '😾', '👋', '🤚', '🖐', '✋', '🖖', '👌', '🤏', '✌️', '🤞',
  '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍',
  '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝',
  '🙏', '✍️', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃',
  '🧠', '🦷', '🦴', '👀', '👁', '👅', '👄', '💋', '💘', '💝',
  '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔', '❤️', '🧡',
  '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💯', '💢', '💥',
  '💫', '💦', '💨', '🕳', '💣', '💬', '👤', '👥', '🗣', '👶',
  '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', '👩', '🧓', '👴',
  '👵', '🙍', '🙎', '🙅', '🙆', '💁', '🙋', '🧏', '🙇', '🤦',
  '🤷', '👮', '🕵', '💂', '🥷', '👷', '🤴', '👸', '👳', '👲',
  '🧕', '🤵', '👰', '🤰', '🤱', '👼', '🎅', '🤶', '🦸', '🦹',
  '🧙', '🧚', '🧛', '🧜', '🧝', '🧞', '🧟', '💆', '💇', '🚶',
  '🏃', '💃', '🕺', '🕴', '👯', '🧘', '🧗', '🤺', '🏇', '⛷',
  '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '🚵', '🤸',
  '🤼', '🤽', '🤾', '🤹', '🧗', '🛀', '🛌', '👭', '👫', '👬',
  '💏', '💑', '👪', '👨‍👩‍👧', '👨‍👩‍👧‍👦', '👨‍👩‍👦‍👦', '👨‍👩‍👧‍👧', '👩‍👩‍👦', '👩‍👩‍👧',
  '👩‍👩‍👧‍👦', '👩‍👩‍👦‍👦', '👩‍👩‍👧‍👧', '👨‍👨‍👦', '👨‍👨‍👧', '👨‍👨‍👧‍👦', '👨‍👨‍👦‍👦', '👨‍👨‍👧‍👧',
  '👩‍👦', '👩‍👧', '👩‍👧‍👦', '👩‍👦‍👦', '👩‍👧‍👧', '👨‍👦', '👨‍👧', '👨‍👧‍👦', '👨‍👦‍👦', '👨‍👧‍👧',
  '👚', '👕', '👖', '👔', '👗', '👙', '👘', '🥻', '🩱', '🩲',
  '🩳', '👠', '👡', '👢', '👞', '👟', '🥾', '🥿', '🧦', '🧤',
  '🧣', '🎩', '🧢', '👒', '🎓', '⛑', '🪖', '👑', '💍', '👝',
  '👛', '👜', '💼', '🎒', '🧳', '☂️', '🌂', '💄', '💅', '💇',
  '🔥', '💧', '🌊', '🎄', '✨', '⭐', '🌟', '💫', '⚡', '☄️',
  '💥', '🔥', '🌪', '🌈', '☀️', '🌤', '⛅', '🌥', '☁️', '🌦',
  '🌧', '⛈', '🌩', '⚡', '☔', '⛄', '❄️', '🌨', '💨', '🌪',
  '🌫', '🌊', '💧', '💦', '☂️', '☔', '⛱', '🌂', '🏔', '⛰',
  '🌋', '🗻', '🏕', '⛺', '🏠', '🏡', '🏘', '🏚', '🏗', '🏭',
  '🏢', '🏬', '🏣', '🏤', '🏥', '🏦', '🏨', '🏪', '🏫', '🏩',
  '💒', '🏛', '⛪', '🕌', '🕍', '🕋', '⛩', '🛤', '🛣', '🗾',
  '🎑', '🏞', '🌅', '🌄', '🌠', '🎇', '🎆', '🌇', '🌆', '🏙',
  '🌃', '🌌', '🌉', '🌁', '🎆', '🎇', '🎆', '🎇', '🎆', '🎇',
];

const MAX_MESSAGE_LENGTH = 500;
const SWIPE_THRESHOLD = 50;

export default function ChatScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { chatId, userName } = route.params || {};
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showQuickEmojis, setShowQuickEmojis] = useState(false);
  const [selectedMessageForReaction, setSelectedMessageForReaction] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const panResponderRefs = useRef<{ [key: string]: any }>({});
  const swipeAnimations = useRef<{ [key: string]: Animated.Value }>({});

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! I saw your post about the AI tool. Would love to collaborate!',
      senderId: 'other',
      timestamp: '10:30 AM',
      isOwn: false,
      reactions: [],
    },
    {
      id: '2',
      text: 'That sounds great! What kind of collaboration are you thinking?',
      senderId: 'me',
      timestamp: '10:32 AM',
      isOwn: true,
      reactions: [],
    },
    {
      id: '3',
      text: 'I have experience with ML models and could help with the backend. Are you open to a partnership?',
      senderId: 'other',
      timestamp: '10:35 AM',
      isOwn: false,
      reactions: [],
    },
  ]);

  // Initialize swipe animations for each message
  useEffect(() => {
    messages.forEach((msg) => {
      if (!swipeAnimations.current[msg.id]) {
        swipeAnimations.current[msg.id] = new Animated.Value(0);
      }
    });
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        senderId: 'me',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        isOwn: true,
        reactions: [],
        replyTo: replyingTo || undefined,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setReplyingTo(null);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
    setShowQuickEmojis(false);
  };

  const handleMessageReaction = (messageId: string, emoji: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.id === messageId) {
          const existingReactions = msg.reactions || [];
          const userReactionIndex = existingReactions.findIndex((r) => r.userId === 'me');
          
          if (userReactionIndex >= 0) {
            // Remove existing reaction
            const updatedReactions = existingReactions.filter((_, i) => i !== userReactionIndex);
            return { ...msg, reactions: updatedReactions };
          } else {
            // Add new reaction
            return {
              ...msg,
              reactions: [...existingReactions, { emoji, userId: 'me' }],
            };
          }
        }
        return msg;
      })
    );
    setSelectedMessageForReaction(null);
  };

  const handleLongPress = (msg: Message) => {
    setSelectedMessageForReaction(msg.id);
  };

  const handleSwipeToReply = (msg: Message) => {
    setReplyingTo(msg);
    // Scroll to input area
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Create PanResponder for swipe to reply
  const createPanResponder = (msg: Message) => {
    if (panResponderRefs.current[msg.id]) {
      return panResponderRefs.current[msg.id];
    }

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to horizontal swipes
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (msg.isOwn) {
          // Swipe left for own messages
          if (gestureState.dx < 0) {
            const translateX = Math.max(gestureState.dx, -100);
            swipeAnimations.current[msg.id]?.setValue(translateX);
          }
        } else {
          // Swipe right for other messages
          if (gestureState.dx > 0) {
            const translateX = Math.min(gestureState.dx, 100);
            swipeAnimations.current[msg.id]?.setValue(translateX);
          }
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const threshold = SWIPE_THRESHOLD;
        if (msg.isOwn && gestureState.dx < -threshold) {
          // Swiped left enough to reply
          handleSwipeToReply(msg);
        } else if (!msg.isOwn && gestureState.dx > threshold) {
          // Swiped right enough to reply
          handleSwipeToReply(msg);
        }
        
        // Animate back to original position
        Animated.spring(swipeAnimations.current[msg.id], {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    });

    panResponderRefs.current[msg.id] = panResponder;
    return panResponder;
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title={userName || 'Chat'}
        rightIcon={
          <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userId: chatId || '1', username: userName })}>
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
          {messages.map((msg) => {
            const panResponder = createPanResponder(msg);
            const translateX = swipeAnimations.current[msg.id] || new Animated.Value(0);

            return (
              <Animated.View
                key={msg.id}
                style={[
                  styles.messageWrapper,
                  {
                    transform: [{ translateX }],
                  },
                ]}
                {...panResponder.panHandlers}
              >
                {replyingTo?.id === msg.id && (
                  <View style={styles.replyIndicator}>
                    <Ionicons name="arrow-back" size={16} color={Colors.primary} />
                    <Text style={styles.replyIndicatorText}>Replying to this message</Text>
                  </View>
                )}
                <TouchableOpacity
                  activeOpacity={0.9}
                  onLongPress={() => handleLongPress(msg)}
                  style={[styles.messageBubble, msg.isOwn ? styles.ownMessage : styles.otherMessage]}
                >
                  {msg.replyTo && (
                    <View style={styles.replyPreview}>
                      <View style={styles.replyPreviewLine} />
                      <View style={styles.replyPreviewContent}>
                        <Text style={styles.replyPreviewSender}>
                          {msg.replyTo.senderId === 'me' ? 'You' : userName || 'User'}
                        </Text>
                        <Text style={styles.replyPreviewText} numberOfLines={1}>
                          {msg.replyTo.text}
                        </Text>
                      </View>
                    </View>
                  )}
                  <Text style={[styles.messageText, msg.isOwn && styles.ownMessageText]}>
                    {msg.text}
                  </Text>
                  <View style={styles.messageFooter}>
                    <Text style={[styles.timestamp, msg.isOwn && styles.ownTimestamp]}>
                      {msg.timestamp}
                    </Text>
                    {msg.reactions && msg.reactions.length > 0 && (
                      <View style={styles.reactionsContainer}>
                        {msg.reactions.map((reaction, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.reactionBadge}
                            onPress={() => handleMessageReaction(msg.id, reaction.emoji)}
                          >
                            <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </ScrollView>

        {/* Reply Preview */}
        {replyingTo && (
          <View style={styles.replyPreviewBar}>
            <View style={styles.replyPreviewBarContent}>
              <View style={styles.replyPreviewBarLine} />
              <View style={styles.replyPreviewBarText}>
                <Text style={styles.replyPreviewBarLabel}>
                  Replying to {replyingTo.isOwn ? 'yourself' : userName || 'User'}
                </Text>
                <Text style={styles.replyPreviewBarMessage} numberOfLines={1}>
                  {replyingTo.text}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setReplyingTo(null)}
                style={styles.replyPreviewBarClose}
              >
                <Ionicons name="close" size={20} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        )}

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
          
          <TouchableOpacity
            style={styles.emojiButton}
            onPress={() => setShowQuickEmojis(!showQuickEmojis)}
          >
            <Ionicons name="happy-outline" size={24} color={Colors.textLight} />
          </TouchableOpacity>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor={Colors.textLight}
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={MAX_MESSAGE_LENGTH}
            />
            <Text style={styles.characterCount}>
              {message.length}/{MAX_MESSAGE_LENGTH}
            </Text>
          </View>

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

        {/* Quick Emojis */}
        {showQuickEmojis && (
          <View style={styles.quickEmojisContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {QUICK_EMOJIS.map((emoji, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickEmojiButton}
                  onPress={() => handleEmojiSelect(emoji)}
                >
                  <Text style={styles.quickEmoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.quickEmojiButton}
                onPress={() => {
                  setShowQuickEmojis(false);
                  setShowEmojiPicker(true);
                }}
              >
                <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </KeyboardAvoidingView>

      {/* Full Emoji Picker Modal */}
      <Modal
        visible={showEmojiPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowEmojiPicker(false)}
      >
        <View style={styles.emojiModalOverlay}>
          <View style={styles.emojiModalContent}>
            <View style={styles.emojiModalHeader}>
              <Text style={styles.emojiModalTitle}>Select Emoji</Text>
              <TouchableOpacity onPress={() => setShowEmojiPicker(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.emojiModalScroll}>
              <View style={styles.emojiGrid}>
                {ALL_EMOJIS.map((emoji, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.emojiItem}
                    onPress={() => handleEmojiSelect(emoji)}
                  >
                    <Text style={styles.emojiText}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Reaction Picker Modal */}
      <Modal
        visible={selectedMessageForReaction !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedMessageForReaction(null)}
      >
        <TouchableOpacity
          style={styles.reactionModalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedMessageForReaction(null)}
        >
          <View style={styles.reactionPicker}>
            {QUICK_EMOJIS.map((emoji, index) => (
              <TouchableOpacity
                key={index}
                style={styles.reactionEmojiButton}
                onPress={() => {
                  if (selectedMessageForReaction) {
                    handleMessageReaction(selectedMessageForReaction, emoji);
                  }
                }}
              >
                <Text style={styles.reactionEmojiText}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
  messageWrapper: {
    marginBottom: 12,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
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
  replyPreview: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 8,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  replyPreviewLine: {
    width: 3,
    backgroundColor: Colors.primary,
    marginRight: 8,
  },
  replyPreviewContent: {
    flex: 1,
  },
  replyPreviewSender: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 2,
  },
  replyPreviewText: {
    fontSize: 12,
    color: Colors.textSecondary,
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
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  timestamp: {
    fontSize: 11,
    color: Colors.textLight,
  },
  ownTimestamp: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  reactionsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  reactionBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  reactionEmoji: {
    fontSize: 14,
  },
  replyIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    paddingLeft: 8,
  },
  replyIndicatorText: {
    fontSize: 12,
    color: Colors.primary,
    marginLeft: 4,
  },
  replyPreviewBar: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  replyPreviewBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyPreviewBarLine: {
    width: 3,
    height: 40,
    backgroundColor: Colors.primary,
    marginRight: 12,
    borderRadius: 2,
  },
  replyPreviewBarText: {
    flex: 1,
  },
  replyPreviewBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 2,
  },
  replyPreviewBarMessage: {
    fontSize: 14,
    color: Colors.text,
  },
  replyPreviewBarClose: {
    padding: 4,
    marginLeft: 8,
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
  emojiButton: {
    padding: 8,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 28,
    fontSize: 16,
    color: Colors.text,
    maxHeight: 100,
  },
  characterCount: {
    position: 'absolute',
    bottom: 8,
    right: 12,
    fontSize: 11,
    color: Colors.textLight,
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
  quickEmojisContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingVertical: 8,
    maxHeight: 60,
  },
  quickEmojiButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  quickEmoji: {
    fontSize: 28,
  },
  emojiModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  emojiModalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
  },
  emojiModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  emojiModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  emojiModalScroll: {
    maxHeight: 400,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  emojiItem: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiText: {
    fontSize: 32,
  },
  reactionModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionPicker: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 30,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  reactionEmojiButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  reactionEmojiText: {
    fontSize: 28,
  },
});
