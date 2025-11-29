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

const savedComments = [
  {
    id: '1',
    author: 'Sarah Johnson',
    handle: '@sarahj',
    text: 'Great insights! I\'ve been working on something similar. Would love to connect.',
    postTitle: 'Building an AI-powered design tool',
    time: '2h',
  },
  {
    id: '2',
    author: 'Mike Davis',
    handle: '@miked',
    text: 'This is exactly what I needed. Thanks for sharing your experience!',
    postTitle: 'Lessons learned from my first SaaS launch',
    time: '1d',
  },
];

export default function SavedCommentsScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Saved Comments" />
      <ScrollView style={styles.scrollView}>
        {savedComments.length > 0 ? (
          savedComments.map((comment) => (
            <TouchableOpacity
              key={comment.id}
              style={styles.commentCard}
              onPress={() => navigation.navigate('PostDetail', { postId: '1' })}
            >
              <View style={styles.commentHeader}>
                <View style={styles.avatar} />
                <View style={styles.commentUserInfo}>
                  <Text style={styles.commentAuthor}>{comment.author}</Text>
                  <Text style={styles.commentHandle}>{comment.handle} · {comment.time}</Text>
                </View>
                <Ionicons name="bookmark" size={20} color={Colors.primary} />
              </View>
              <Text style={styles.commentText}>{comment.text}</Text>
              <View style={styles.postContext}>
                <Ionicons name="document-text-outline" size={16} color={Colors.textLight} />
                <Text style={styles.postContextText} numberOfLines={1}>
                  {comment.postTitle}
                </Text>
              </View>
            </TouchableOpacity>
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

