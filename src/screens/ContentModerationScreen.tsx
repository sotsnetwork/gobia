import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Button from '../components/Button';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Post {
  id: string;
  author: string;
  handle: string;
  text: string;
  time: string;
  reported: boolean;
  reportReason?: string;
}

const posts: Post[] = [
  {
    id: '1',
    author: 'John Doe',
    handle: '@johndoe',
    text: 'This post contains inappropriate content that needs review.',
    time: '2h',
    reported: true,
    reportReason: 'Spam',
  },
  {
    id: '2',
    author: 'Jane Smith',
    handle: '@janesmith',
    text: 'Another post that may violate community guidelines.',
    time: '5h',
    reported: true,
    reportReason: 'Harassment',
  },
];

export default function ContentModerationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [pendingPosts, setPendingPosts] = useState<Post[]>(posts);

  const handleApprove = (postId: string) => {
    Alert.alert('Approve Post', 'This post will be published.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Approve',
        onPress: () => {
          setPendingPosts(pendingPosts.filter((p) => p.id !== postId));
          Alert.alert('Success', 'Post has been approved');
        },
      },
    ]);
  };

  const handleReject = (postId: string) => {
    Alert.alert('Reject Post', 'This post will be removed.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reject',
        style: 'destructive',
        onPress: () => {
          setPendingPosts(pendingPosts.filter((p) => p.id !== postId));
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Content Moderation" />
      <ScrollView style={styles.scrollView}>
        {pendingPosts.length > 0 ? (
          pendingPosts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.avatar} />
                <View style={styles.postUserInfo}>
                  <Text style={styles.postAuthor}>{post.author}</Text>
                  <Text style={styles.postHandle}>{post.handle} · {post.time}</Text>
                </View>
                {post.reported && (
                  <View style={styles.reportedBadge}>
                    <Ionicons name="flag" size={16} color={Colors.error} />
                    <Text style={styles.reportedText}>{post.reportReason}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.postText}>{post.text}</Text>
              <View style={styles.actions}>
                <Button
                  title="Approve"
                  onPress={() => handleApprove(post.id)}
                  style={styles.approveButton}
                  textStyle={styles.approveButtonText}
                />
                <Button
                  title="Reject"
                  variant="outline"
                  onPress={() => handleReject(post.id)}
                  style={styles.rejectButton}
                  textStyle={styles.rejectButtonText}
                />
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="checkmark-circle-outline" size={64} color={Colors.success} />
            <Text style={styles.emptyTitle}>All clear!</Text>
            <Text style={styles.emptyText}>
              No posts pending moderation.
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
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
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
  reportedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.error + '20',
    borderRadius: 12,
  },
  reportedText: {
    fontSize: 12,
    color: Colors.error,
    fontWeight: '600',
  },
  postText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  approveButton: {
    flex: 1,
  },
  approveButtonText: {
    fontSize: 14,
  },
  rejectButton: {
    flex: 1,
  },
  rejectButtonText: {
    fontSize: 14,
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

