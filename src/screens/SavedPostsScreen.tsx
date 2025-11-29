import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const savedPosts = [
  {
    id: '1',
    author: 'Sarah Johnson',
    handle: '@sarahj',
    text: 'Just launched my new AI-powered design tool! Check it out and let me know what you think.',
    time: '2h',
    likes: 45,
    comments: 12,
  },
  {
    id: '2',
    author: 'Mike Davis',
    handle: '@miked',
    text: 'Looking for a co-founder with expertise in ML/AI. Building something big in the creator economy space.',
    time: '1d',
    likes: 89,
    comments: 23,
  },
  {
    id: '3',
    author: 'Elena Martinez',
    handle: '@elena_dev',
    text: 'Great resources for learning React Native. Sharing my curated list of tutorials and docs.',
    time: '3d',
    likes: 156,
    comments: 34,
  },
];

export default function SavedPostsScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Saved Posts" />
      <ScrollView style={styles.scrollView}>
        {savedPosts.length > 0 ? (
          savedPosts.map((post) => (
            <TouchableOpacity
              key={post.id}
              style={styles.post}
              onPress={() => navigation.navigate('PostDetail', { postId: post.id })}
            >
              <View style={styles.postHeader}>
                <View style={styles.avatar} />
                <View style={styles.postUserInfo}>
                  <Text style={styles.postAuthor}>{post.author}</Text>
                  <Text style={styles.postHandle}>{post.handle} · {post.time}</Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="bookmark" size={20} color={Colors.primary} />
                </TouchableOpacity>
              </View>
              <Text style={styles.postText}>{post.text}</Text>
              <View style={styles.postActions}>
                <View style={styles.postAction}>
                  <Ionicons name="heart-outline" size={18} color={Colors.textLight} />
                  <Text style={styles.postActionText}>{post.likes}</Text>
                </View>
                <View style={styles.postAction}>
                  <Ionicons name="chatbubble-outline" size={18} color={Colors.textLight} />
                  <Text style={styles.postActionText}>{post.comments}</Text>
                </View>
              </View>
            </TouchableOpacity>
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

