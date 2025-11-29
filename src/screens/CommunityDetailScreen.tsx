import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RoutePropType = RouteProp<RootStackParamList, 'CommunityDetail'>;

export default function CommunityDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { communityId, communityName } = route.params || {};
  const [joined, setJoined] = useState(true);

  const community = {
    id: communityId || '1',
    name: communityName || 'React Native Developers',
    description: 'A community for React Native developers to share knowledge, ask questions, and collaborate on projects.',
    members: 12450,
    posts: 3420,
    icon: '⚛️',
    isJoined: joined,
  };

  const posts = [
    {
      id: '1',
      author: 'Sarah Johnson',
      handle: '@sarahj',
      text: 'Just released React Native 0.81! Check out the new features and improvements.',
      time: '2h',
      likes: 89,
      comments: 15,
    },
    {
      id: '2',
      author: 'Mike Davis',
      handle: '@miked',
      text: 'Looking for help with React Native navigation. Any experts here?',
      time: '5h',
      likes: 12,
      comments: 8,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title={community.name}
        rightIcon={<Ionicons name="ellipsis-vertical" size={24} color={Colors.text} />}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.headerSection}>
          <View style={styles.communityIcon}>
            <Text style={styles.iconText}>{community.icon}</Text>
          </View>
          <Text style={styles.communityName}>{community.name}</Text>
          <Text style={styles.description}>{community.description}</Text>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{community.members.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Members</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{community.posts.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.joinButton, joined && styles.joinedButton]}
            onPress={() => setJoined(!joined)}
          >
            <Text style={[styles.joinButtonText, joined && styles.joinedButtonText]}>
              {joined ? 'Joined' : 'Join Community'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
          <View style={[styles.tab, styles.tabActive]}>
            <Text style={[styles.tabText, styles.tabTextActive]}>Posts</Text>
          </View>
          <View style={styles.tab}>
            <Text style={styles.tabText}>Members</Text>
          </View>
          <View style={styles.tab}>
            <Text style={styles.tabText}>About</Text>
          </View>
        </View>

        <View style={styles.posts}>
          {posts.map((post) => (
            <TouchableOpacity
              key={post.id}
              style={styles.post}
              onPress={() => navigation.navigate('PostDetail', { postId: post.id })}
            >
              <View style={styles.postHeader}>
                <View style={styles.postAvatar} />
                <View style={styles.postUserInfo}>
                  <Text style={styles.postAuthor}>{post.author}</Text>
                  <Text style={styles.postHandle}>{post.handle} · {post.time}</Text>
                </View>
              </View>
              <Text style={styles.postText}>{post.text}</Text>
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.postAction}>
                  <Ionicons name="heart-outline" size={18} color={Colors.textLight} />
                  <Text style={styles.postActionText}>{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postAction}>
                  <Ionicons name="chatbubble-outline" size={18} color={Colors.textLight} />
                  <Text style={styles.postActionText}>{post.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postAction}>
                  <Ionicons name="share-outline" size={18} color={Colors.textLight} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  headerSection: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  communityIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 40,
  },
  communityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 4,
  },
  joinButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    width: '100%',
    alignItems: 'center',
  },
  joinedButton: {
    backgroundColor: Colors.borderLight,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  joinButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  joinedButtonText: {
    color: Colors.text,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.white,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: Colors.textLight,
  },
  tabTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  posts: {
    padding: 16,
  },
  post: {
    backgroundColor: Colors.white,
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAvatar: {
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
});

