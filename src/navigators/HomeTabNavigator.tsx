import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../components/Logo';
import PostActions from '../components/PostActions';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Sample posts data
const allPosts = [
  {
    id: '1',
    name: 'You',
    handle: '@you',
    text: 'I am creating a feed for my app, what do you all think?',
    timestamp: '2h',
    likes: 0,
    comments: 0,
    boosts: 0,
  },
  {
    id: '2',
    name: 'andres',
    handle: '@andres',
    text: 'I am building an AI chatbot but need a product designer.',
    timestamp: '5h',
    likes: 12,
    comments: 3,
    boosts: 0,
  },
  {
    id: '3',
    name: 'elena',
    handle: '@elena_dev',
    text: 'I just launched my new SaaS product on Product Hunt! Looking for feedback.',
    location: 'San Francisco, CA',
    timestamp: '1d',
    likes: 256,
    comments: 42,
    boosts: 1,
  },
  {
    id: '4',
    name: 'Builder Bro',
    handle: '@builderbro',
    text: "I'm working on a cross-platform mobile app for builders and developers to share what they're working on and get help. The app should feel simple, fast, and community-driven.",
    location: 'Remote',
    timestamp: '2d',
    likes: 18,
    comments: 9,
    boosts: 1,
    saved: true,
  },
];

const followingPosts = [
  {
    id: '2',
    name: 'andres',
    handle: '@andres',
    text: 'I am building an AI chatbot but need a product designer.',
    timestamp: '5h',
    likes: 12,
    comments: 3,
    boosts: 0,
  },
  {
    id: '3',
    name: 'elena',
    handle: '@elena_dev',
    text: 'I just launched my new SaaS product on Product Hunt! Looking for feedback.',
    location: 'San Francisco, CA',
    timestamp: '1d',
    likes: 256,
    comments: 42,
    boosts: 1,
  },
];

const communityPosts = [
  {
    id: '5',
    name: 'React Native Devs',
    handle: '@reactnative_devs',
    text: 'Just released React Native 0.81! Check out the new features.',
    community: 'React Native Developers',
    timestamp: '3h',
    likes: 89,
    comments: 15,
    boosts: 2,
  },
  {
    id: '6',
    name: 'AI Startups',
    handle: '@ai_startups',
    text: 'Weekly community meetup this Friday. Join us!',
    community: 'AI Startups',
    timestamp: '6h',
    likes: 34,
    comments: 8,
    boosts: 1,
  },
];

const PostItem = ({ post, navigation }: { post: any; navigation: NavigationProp }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={() => navigation.navigate('PostDetail', { post })}
  >
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.avatar} />
        <View style={styles.postUserInfo}>
          <Text style={styles.postUsername}>{post.name}</Text>
          <View style={styles.handleRow}>
            <Text style={styles.postHandle}>{post.handle}</Text>
            {post.timestamp && (
              <>
                <Text style={styles.handleSeparator}> · </Text>
                <Text style={styles.postTimestamp}>{post.timestamp}</Text>
              </>
            )}
          </View>
        </View>
      </View>
      {post.community && (
        <View style={styles.communityBadge}>
          <Ionicons name="people" size={14} color={Colors.primary} />
          <Text style={styles.communityText}>{post.community}</Text>
        </View>
      )}
      <Text style={styles.postText}>{post.text}</Text>
      {post.location && (
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color={Colors.textLight} />
          <Text style={styles.locationText}>{post.location}</Text>
        </View>
      )}
      <PostActions
        post={{
          ...post,
          reposts: post.boosts || post.reposts || 0,
        }}
        onComment={() => navigation.navigate('PostDetail', { post })}
        onRepost={() => {
          // Handle repost
        }}
        onQuote={() => {
          navigation.navigate('QuotePost', { post });
        }}
      />
    </View>
  </TouchableOpacity>
);

const ForYouScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {allPosts.map((post) => (
          <PostItem key={post.id} post={post} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
};

const FollowingScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {followingPosts.length > 0 ? (
          followingPosts.map((post) => (
            <PostItem key={post.id} post={post} navigation={navigation} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>No posts yet</Text>
            <Text style={styles.emptyText}>
              Posts from people you follow will appear here.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const CommunitiesFeedScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {communityPosts.length > 0 ? (
          communityPosts.map((post) => (
            <PostItem key={post.id} post={post} navigation={navigation} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="people-circle-outline" size={64} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>No community posts</Text>
            <Text style={styles.emptyText}>
              Join communities to see their posts here.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default function HomeTabNavigator() {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<'ForYou' | 'Following' | 'Communities'>('ForYou');

  const renderContent = () => {
    switch (activeTab) {
      case 'ForYou':
        return <ForYouScreen />;
      case 'Following':
        return <FollowingScreen />;
      case 'Communities':
        return <CommunitiesFeedScreen />;
      default:
        return <ForYouScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('MyProfile')}
        >
          <View style={styles.avatarLarge} />
        </TouchableOpacity>
        <View style={styles.headerLogo}>
          <Logo size={32} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'ForYou' && styles.activeTab]}
          onPress={() => setActiveTab('ForYou')}
        >
          <Text style={[styles.tabText, activeTab === 'ForYou' && styles.activeTabText]}>
            For you
          </Text>
          {activeTab === 'ForYou' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Following' && styles.activeTab]}
          onPress={() => setActiveTab('Following')}
        >
          <Text style={[styles.tabText, activeTab === 'Following' && styles.activeTabText]}>
            Following
          </Text>
          {activeTab === 'Following' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Communities' && styles.activeTab]}
          onPress={() => setActiveTab('Communities')}
        >
          <Text style={[styles.tabText, activeTab === 'Communities' && styles.activeTabText]}>
            Communities
          </Text>
          {activeTab === 'Communities' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {renderContent()}
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Ionicons name="add" size={28} color={Colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.white,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLarge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
  },
  headerLogo: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
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
  handleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  handleSeparator: {
    fontSize: 14,
    color: Colors.textLight,
  },
  postTimestamp: {
    fontSize: 14,
    color: Colors.textLight,
  },
  communityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.primaryLight + '30',
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  communityText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  postText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
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
  highlightText: {
    color: Colors.primary,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    // Active tab styling
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textLight,
  },
  activeTabText: {
    color: Colors.primary,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
  },
});

