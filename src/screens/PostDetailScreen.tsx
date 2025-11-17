import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
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
    boosts: 3,
    saved: false,
  };

  const comments = [
    {
      id: 'c1',
      name: 'Alex Dev',
      handle: '@alexdev',
      time: '2h',
      text: "This sounds amazing! I've been looking for a community like this. Can't wait to see it.",
    },
    {
      id: 'c2',
      name: 'CodeWizard',
      handle: '@wizard',
      time: '1h',
      text: 'Great initiative! Is this going to be open source? I’d love to contribute.',
    },
    {
      id: 'c3',
      name: 'JenCoder',
      handle: '@jencoder',
      time: '45m',
      text: 'Count me in for beta testing! The design philosophy sounds perfect.',
    },
  ];

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
            <View style={styles.avatar} />
            <View style={styles.postUserInfo}>
              <Text style={styles.postUsername}>{post.name}</Text>
              <Text style={styles.postHandle}>{post.handle}</Text>
            </View>
          </View>
          <Text style={styles.postText}>{post.text}</Text>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.postAction}>
              <Ionicons name="heart-outline" size={20} color={Colors.textLight} />
              <Text style={styles.postActionText}>{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postAction}>
              <Ionicons name="chatbubble-outline" size={20} color={Colors.textLight} />
              <Text style={styles.postActionText}>{post.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postAction}>
              <Ionicons name="arrow-up-outline" size={20} color={Colors.textLight} />
              {post.boosts ? <Text style={styles.postActionText}>{post.boosts}</Text> : null}
            </TouchableOpacity>
            <TouchableOpacity style={styles.postAction}>
              <Ionicons
                name={post.saved ? 'bookmark' : 'bookmark-outline'}
                size={20}
                color={post.saved ? Colors.primary : Colors.textLight}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.comments}>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <View style={styles.commentAvatar} />
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentName}>{comment.name}</Text>
                  <Text style={styles.commentHandle}>
                    {comment.handle} · {comment.time}
                  </Text>
                  <TouchableOpacity>
                    <Ionicons name="ellipsis-horizontal" size={16} color={Colors.textLight} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.commentText}>{comment.text}</Text>
                <TouchableOpacity>
                  <Text style={styles.replyText}>Reply</Text>
                </TouchableOpacity>
                <View style={styles.commentActions}>
                  <TouchableOpacity style={styles.postAction}>
                    <Ionicons name="heart-outline" size={16} color={Colors.textLight} />
                    <Text style={styles.postActionText}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.postAction}>
                    <Ionicons name="arrow-up-outline" size={16} color={Colors.textLight} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.postAction}>
                    <Ionicons name="bookmark-outline" size={16} color={Colors.textLight} />
                  </TouchableOpacity>
                </View>
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
        />
        <Text style={styles.characterCount}>0/280</Text>
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={20} color={Colors.white} />
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
  },
  timestamp: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  postActionText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  comments: {
    marginTop: 16,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 16,
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
  },
  commentName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  commentHandle: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },
  replyText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  replyBar: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  characterCount: {
    fontSize: 12,
    color: Colors.textLight,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

