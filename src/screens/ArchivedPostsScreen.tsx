import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const archivedPosts = [
  {
    id: '1',
    text: 'Just shipped a new feature for @CoolApp! It\'s a real-time collaboration tool built with Firebase.',
    time: '1 month ago',
    likes: 45,
    comments: 12,
  },
  {
    id: '2',
    text: 'Looking for feedback on my new project. What do you all think?',
    time: '2 months ago',
    likes: 23,
    comments: 8,
  },
];

export default function ArchivedPostsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [posts, setPosts] = useState(archivedPosts);

  const handleUnarchive = (postId: string) => {
    Alert.alert('Unarchive Post', 'Move this post back to your profile?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Unarchive',
        onPress: () => {
          setPosts(posts.filter((p) => p.id !== postId));
          Alert.alert('Success', 'Post has been unarchived');
        },
      },
    ]);
  };

  const handleDelete = (postId: string) => {
    Alert.alert('Delete Post', 'Are you sure you want to permanently delete this post?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setPosts(posts.filter((p) => p.id !== postId));
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Archived Posts" />
      <ScrollView style={styles.scrollView}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postContent}>
                <Text style={styles.postText}>{post.text}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
                <View style={styles.postStats}>
                  <View style={styles.stat}>
                    <Ionicons name="heart-outline" size={16} color={Colors.textLight} />
                    <Text style={styles.statText}>{post.likes}</Text>
                  </View>
                  <View style={styles.stat}>
                    <Ionicons name="chatbubble-outline" size={16} color={Colors.textLight} />
                    <Text style={styles.statText}>{post.comments}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.postActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleUnarchive(post.id)}
                >
                  <Ionicons name="archive-outline" size={20} color={Colors.primary} />
                  <Text style={styles.actionText}>Unarchive</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDelete(post.id)}
                >
                  <Ionicons name="trash-outline" size={20} color={Colors.error} />
                  <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="archive-outline" size={64} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>No archived posts</Text>
            <Text style={styles.emptyText}>
              Posts you archive will appear here. You can unarchive or delete them.
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
  scrollView: {
    flex: 1,
  },
  postCard: {
    backgroundColor: Colors.white,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
  },
  postContent: {
    padding: 16,
  },
  postText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },
  postTime: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  deleteText: {
    color: Colors.error,
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

