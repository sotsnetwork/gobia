import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RoutePropType = RouteProp<RootStackParamList, 'PostDetail'>;

export default function PostDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Post" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.post}>
          <View style={styles.postHeader}>
            <View style={styles.avatar} />
            <View style={styles.postUserInfo}>
              <Text style={styles.postUsername}>Sarah Mills</Text>
              <Text style={styles.postHandle}>@sarahm_builds</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={20} color={Colors.text} />
            </TouchableOpacity>
          </View>
          <Text style={styles.postText}>
            I'm working on a new cross-platform mobile app for builders and developers to share what they're working on and get help. The goal is to make it feel simple, fast, and community-driven, with a clean, minimalist design.
          </Text>
          <Text style={styles.timestamp}>10:42 AM · Mar 18, 2024</Text>
          <View style={styles.postActions}>
            <View style={styles.postAction}>
              <Ionicons name="heart-outline" size={20} color={Colors.textLight} />
              <Text style={styles.postActionText}>12</Text>
            </View>
            <View style={styles.postAction}>
              <Ionicons name="chatbubble-outline" size={20} color={Colors.textLight} />
              <Text style={styles.postActionText}>5</Text>
            </View>
            <Ionicons name="arrow-up-outline" size={20} color={Colors.textLight} />
            <Ionicons name="bookmark-outline" size={20} color={Colors.textLight} />
          </View>
        </View>

        <View style={styles.comments}>
          <View style={styles.comment}>
            <View style={styles.commentAvatar} />
            <View style={styles.commentContent}>
              <Text style={styles.commentName}>Alex Dev</Text>
              <Text style={styles.commentHandle}>@alexdev · 2h</Text>
              <Text style={styles.commentText}>
                This sounds amazing! I've been looking for a community like this. Can't wait to see it.
              </Text>
              <TouchableOpacity>
                <Text style={styles.replyText}>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
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

