import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Keyboard } from 'react-native';
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

interface Comment {
  id: string;
  name: string;
  handle: string;
  time: string;
  text: string;
  likes: number;
  reposts: number;
  saved: boolean;
  userId?: string;
  replyToId?: string; // ID of the comment/post this is replying to
  replyToName?: string; // Name of the user being replied to
  replyToHandle?: string; // Handle of the user being replied to
}

export default function PostDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const replyInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

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
  const [replyingTo, setReplyingTo] = useState<{ id: string; name: string; handle: string; isPost: boolean } | null>(null);
  const [comments, setComments] = useState<Comment[]>([
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

  const handleCommentOnPost = () => {
    setReplyingTo({ id: post.id, name: post.name, handle: post.handle, isPost: true });
    setTimeout(() => {
      replyInputRef.current?.focus();
    }, 100);
  };

  const handleCommentOnComment = (comment: Comment) => {
    setReplyingTo({ id: comment.id, name: comment.name, handle: comment.handle, isPost: false });
    setTimeout(() => {
      replyInputRef.current?.focus();
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      const newComment: Comment = {
        id: `c${Date.now()}`,
        name: 'You', // In real app, get from auth context
        handle: '@you', // In real app, get from auth context
        time: 'now',
        text: replyText.trim(),
        likes: 0,
        reposts: 0,
        saved: false,
        replyToId: replyingTo?.id,
        replyToName: replyingTo?.name,
        replyToHandle: replyingTo?.handle,
      };

      setComments((prev) => [...prev, newComment]);
      
      // Update post comment count if replying to post
      if (replyingTo?.isPost) {
        // In real app, update post comment count via API
      }

      setReplyText('');
      setReplyingTo(null);
      Keyboard.dismiss();
      
      // Scroll to show new comment
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyText('');
    Keyboard.dismiss();
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
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
      >
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
            onComment={handleCommentOnPost}
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
                {comment.replyToId && comment.replyToName && (
                  <View style={styles.replyToIndicator}>
                    <Ionicons name="arrow-undo" size={12} color={Colors.textLight} />
                    <Text style={styles.replyToText}>
                      Replying to {comment.replyToName} {comment.replyToHandle}
                    </Text>
                  </View>
                )}
                <TouchableOpacity 
                  style={styles.replyButton}
                  onPress={() => handleCommentOnComment(comment)}
                >
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
                  onComment={() => handleCommentOnComment(comment)}
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

      {replyingTo && (
        <View style={styles.replyPreviewBar}>
          <View style={styles.replyPreviewContent}>
            <Ionicons name="arrow-undo" size={16} color={Colors.primary} />
            <Text style={styles.replyPreviewText}>
              Replying to {replyingTo.name} {replyingTo.handle}
            </Text>
          </View>
          <TouchableOpacity onPress={handleCancelReply}>
            <Ionicons name="close" size={20} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.replyBar}>
        <TextInput
          ref={replyInputRef}
          style={styles.replyInput}
          placeholder={replyingTo ? `Reply to ${replyingTo.name}...` : "Post your reply"}
          placeholderTextColor={Colors.textLight}
          value={replyText}
          onChangeText={setReplyText}
          multiline
          maxLength={280}
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
    marginLeft: 52, // Align with name/username (avatar width 32 + marginRight 12 + some spacing)
  },
  replyButton: {
    marginBottom: 8,
  },
  replyText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  replyToIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
    marginTop: 4,
  },
  replyToText: {
    fontSize: 12,
    color: Colors.textLight,
    fontStyle: 'italic',
  },
  replyPreviewBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.primaryLight,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  replyPreviewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  replyPreviewText: {
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
