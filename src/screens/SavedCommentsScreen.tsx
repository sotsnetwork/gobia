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

export default function SavedCommentsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [savedComments, setSavedComments] = useState<BookmarkService.BookmarkedComment[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadBookmarks = async () => {
    try {
      const bookmarks = await BookmarkService.getBookmarkedComments();
      setSavedComments(bookmarks);
    } catch (error) {
      console.error('Error loading bookmarked comments:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [])
  );

  const handleRemoveBookmark = async (commentId: string) => {
    Alert.alert(
      'Remove Bookmark',
      'Are you sure you want to remove this comment from your bookmarks?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await BookmarkService.removeComment(commentId);
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
      <Header title="Saved Comments" />
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {savedComments.length > 0 ? (
          savedComments.map((comment) => (
            <View key={comment.id} style={styles.commentCard}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PostDetail', { postId: comment.postId || '1' })}
              >
                <View style={styles.commentHeader}>
                  <View style={styles.avatar} />
                  <View style={styles.commentUserInfo}>
                    <Text style={styles.commentAuthor}>{comment.name}</Text>
                    <Text style={styles.commentHandle}>
                      {comment.handle} · {comment.time || comment.timestamp || 'Recently'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveBookmark(comment.id)}
                    style={styles.bookmarkButton}
                  >
                    <Ionicons name="bookmark" size={20} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.commentText}>{comment.text}</Text>
                {comment.postTitle && (
                  <View style={styles.postContext}>
                    <Ionicons name="document-text-outline" size={16} color={Colors.textLight} />
                    <Text style={styles.postContextText} numberOfLines={1}>
                      {comment.postTitle}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              <PostActions
                post={{
                  id: comment.id,
                  name: comment.name,
                  handle: comment.handle,
                  text: comment.text,
                  likes: comment.likes,
                  reposts: comment.reposts,
                  saved: true,
                  time: comment.time,
                  timestamp: comment.timestamp,
                }}
                isComment={true}
                postId={comment.postId}
                postTitle={comment.postTitle}
                onBookmark={async () => {
                  await loadBookmarks();
                }}
                compact={true}
              />
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubble-outline" size={64} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>No saved comments</Text>
            <Text style={styles.emptyText}>
              Comments you save will appear here for easy access later.
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
  commentCard: {
    backgroundColor: Colors.white,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  commentHeader: {
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
  commentUserInfo: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  commentHandle: {
    fontSize: 14,
    color: Colors.textLight,
  },
  bookmarkButton: {
    padding: 4,
  },
  commentText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 12,
  },
  postContext: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  postContextText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
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

