import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import PostActions from '../components/PostActions';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';
import * as BookmarkService from '../services/bookmarkService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SavedPostsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [savedPosts, setSavedPosts] = useState<BookmarkService.BookmarkedPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadBookmarks = async () => {
    try {
      const bookmarks = await BookmarkService.getBookmarkedPosts();
      setSavedPosts(bookmarks);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [])
  );

  const handleRemoveBookmark = async (postId: string) => {
    Alert.alert(
      'Remove Bookmark',
      'Are you sure you want to remove this post from your bookmarks?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await BookmarkService.removePost(postId);
              await loadBookmarks();
            } catch (error) {
              Alert.alert('Error', 'Failed to remove bookmark');
            }
          },
        },
      ]
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadBookmarks();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Saved Posts" />
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {savedPosts.length > 0 ? (
          savedPosts.map((post) => (
            <View key={post.id} style={styles.post}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PostDetail', { postId: post.id, post })}
              >
                <View style={styles.postHeader}>
                  <View style={styles.avatar} />
                  <View style={styles.postUserInfo}>
                    <Text style={styles.postAuthor}>{post.name}</Text>
                    <Text style={styles.postHandle}>
                      {post.handle} · {post.time || post.timestamp || 'Recently'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveBookmark(post.id)}
                    style={styles.bookmarkButton}
                  >
                    <Ionicons name="bookmark" size={20} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.postText}>{post.text}</Text>
              </TouchableOpacity>
              <PostActions
                post={{
                  id: post.id,
                  name: post.name,
                  handle: post.handle,
                  text: post.text,
                  likes: post.likes,
                  comments: post.comments,
                  reposts: post.reposts,
                  views: post.views,
                  saved: true,
                  timestamp: post.timestamp,
                  time: post.time,
                }}
                onBookmark={async () => {
                  await loadBookmarks();
                }}
                onComment={() => navigation.navigate('PostDetail', { postId: post.id, post })}
              />
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="bookmark-outline" size={64} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>No saved posts</Text>
            <Text style={styles.emptyText}>
              Posts you save will appear here for easy access later.
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
  post: {
    backgroundColor: Colors.white,
    padding: 16,
    marginBottom: 16,
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
  postAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  postHandle: {
    fontSize: 14,
    color: Colors.textLight,
  },
  bookmarkButton: {
    padding: 4,
  },
  postText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
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

