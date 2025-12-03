import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import PostActions from '../components/PostActions';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RoutePropType = RouteProp<RootStackParamList, 'PostDetail'>;

export default function PostDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();

  const post = route.params?.post ?? {
    id: 'default',
    name: 'Sarah Mills',
    handle: '@sarahm_builds',
    text: "I'm working on a new cross-platform mobile app for builders and developers to share what they're working on and get help. The goal is to make it feel simple, fast, and community-driven, with a clean, minimalist design.",
    timestamp: '10:42 AM · Mar 18, 2024',
    likes: 12,
    comments: 5,
    reposts: 3,
    views: 120,
    saved: false,
  };

  const [replyText, setReplyText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 'c1',
      name: 'Alex Dev',
      handle: '@alexdev',
      time: '2h',
      text: "This sounds amazing! I've been looking for a community like this. Can't wait to see it.",
      likes: 5,
      reposts: 1,
      saved: false,
    },
    {
      id: 'c2',
      name: 'CodeWizard',
      handle: '@wizard',
      time: '1h',
      text: "Great initiative! Is this going to be open source? I'd love to contribute.",
      likes: 8,
      reposts: 0,
      saved: false,
    },
    {
      id: 'c3',
      name: 'JenCoder',
      handle: '@jencoder',
      time: '45m',
      text: 'Count me in for beta testing! The design philosophy sounds perfect.',
      likes: 3,
      reposts: 0,
      saved: false,
    },
  ]);

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      // In real app, submit reply to backend
      setReplyText('');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navButton}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Post</Text>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.post}>
          <View style={styles.postHeader}>
            <TouchableOpacity
              onPress={() => {
                const userId = post.userId || post.handle.replace('@', '');
                navigation.navigate('UserProfile', { userId, username: post.handle });
              }}
              activeOpacity={0.7}
            >
              <View style={styles.avatar} />
            </TouchableOpacity>
            <View style={styles.postUserInfo}>
              <TouchableOpacity
                onPress={() => {
                  const userId = post.userId || post.handle.replace('@', '');
                  navigation.navigate('UserProfile', { userId, username: post.handle });
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.postUsername}>{post.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const userId = post.userId || post.handle.replace('@', '');
                  navigation.navigate('UserProfile', { userId, username: post.handle });
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.postHandle}>{post.handle}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.postText}>{post.text}</Text>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
          <PostActions
            post={post}
            onComment={() => {
              // Focus on reply input
            }}
            onRepost={() => {
              // Handle repost
            }}
            onQuote={() => {
              navigation.navigate('QuotePost', { post });
            }}
            onBookmark={async () => {
              // Bookmark updated, no action needed here
            }}
          />
        </View>

        <View style={styles.comments}>
          <Text style={styles.commentsTitle}>Replies ({comments.length})</Text>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <TouchableOpacity
                onPress={() => {
                  const userId = comment.userId || comment.handle.replace('@', '');
                  navigation.navigate('UserProfile', { userId, username: comment.handle });
                }}
                activeOpacity={0.7}
              >
                <View style={styles.commentAvatar} />
              </TouchableOpacity>
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <TouchableOpacity
                    onPress={() => {
                      const userId = comment.userId || comment.handle.replace('@', '');
                      navigation.navigate('UserProfile', { userId, username: comment.handle });
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.commentName}>{comment.name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      const userId = comment.userId || comment.handle.replace('@', '');
                      navigation.navigate('UserProfile', { userId, username: comment.handle });
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.commentHandle}>
                      {comment.handle} · {comment.time}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons name="ellipsis-horizontal" size={16} color={Colors.textLight} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.commentText}>{comment.text}</Text>
                <TouchableOpacity style={styles.replyButton}>
                  <Text style={styles.replyText}>Reply</Text>
                </TouchableOpacity>
                <PostActions
                  post={{
                    id: comment.id,
                    name: comment.name,
                    handle: comment.handle,
                    text: comment.text,
                    likes: comment.likes,
                    comments: 0,
                    reposts: comment.reposts,
                    saved: comment.saved,
                    time: comment.time,
                  }}
                  isComment={true}
                  postId={post.id}
                  postTitle={post.text.substring(0, 50) + (post.text.length > 50 ? '...' : '')}
                  onComment={() => {
                    // Handle reply to comment
                  }}
                  onRepost={() => {
                    // Handle repost comment
                  }}
                  onQuote={() => {
                    navigation.navigate('QuotePost', { reply: comment });
                  }}
                  compact={true}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.replyBar}>
        <TextInput
          style={styles.replyInput}
          placeholder="Post your reply"
          placeholderTextColor={Colors.textLight}
          value={replyText}
          onChangeText={setReplyText}
          multiline
        />
        <Text style={styles.characterCount}>{replyText.length}/280</Text>
        <TouchableOpacity
          style={[styles.sendButton, !replyText.trim() && styles.sendButtonDisabled]}
          onPress={handleReplySubmit}
          disabled={!replyText.trim()}
        >
          <Ionicons
            name="send"
            size={20}
            color={replyText.trim() ? Colors.white : Colors.textLight}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.white,
  },
  navButton: {
    padding: 4,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  post: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    marginRight: 12,
  },
  postUserInfo: {
    flex: 1,
  },
  postUsername: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  postHandle: {
    fontSize: 14,
    color: Colors.textLight,
  },
  postText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 8,
    marginLeft: 52, // Align with name/username (avatar width 40 + marginRight 12)
  },
  timestamp: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 12,
  },
  comments: {
    marginTop: 16,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  commentName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  commentHandle: {
    fontSize: 14,
    color: Colors.textLight,
  },
  commentText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },
  replyButton: {
    marginBottom: 8,
  },
  replyText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  replyBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    backgroundColor: Colors.white,
    gap: 8,
  },
  replyInput: {
    flex: 1,
    backgroundColor: Colors.borderLight,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.text,
    maxHeight: 100,
  },
  characterCount: {
    fontSize: 12,
    color: Colors.textLight,
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.borderLight,
  },
});
