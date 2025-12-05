import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../components/Logo';
import PostActions from '../components/PostActions';
import Avatar from '../components/Avatar';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';
import { useUserAvatar } from '../hooks/useUserAvatar';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function FeedScreen() {
  const navigation = useNavigation<NavigationProp>();
  const userAvatar = useUserAvatar();

  const posts = [
    {
      id: '1',
      name: 'You',
      handle: '@you',
      text: 'I am creating a feed for my app, what do you all think?',
      timestamp: '2h',
      likes: 0,
      comments: 0,
      reposts: 0,
      views: 45,
      saved: false,
    },
    {
      id: '2',
      name: 'andres',
      handle: '@andres',
      text: 'I am building an AI chatbot but need a product designer.',
      timestamp: '5h',
      likes: 12,
      comments: 3,
      reposts: 1,
      views: 234,
      saved: false,
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
      reposts: 15,
      views: 6600,
      saved: false,
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
      reposts: 2,
      views: 892,
      saved: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('MyProfile')}>
          <Avatar uri={userAvatar} size={36} />
        </TouchableOpacity>
        <View style={styles.headerLogo}>
          <Logo size={32} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {posts.map((post) => (
          <View key={post.id} style={styles.post}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('PostDetail', { post })}
            >
              <View style={styles.postHeader}>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    const userId = post.userId || post.handle.replace('@', '');
                    navigation.navigate('UserProfile', { userId, username: post.handle });
                  }}
                  activeOpacity={0.7}
                >
                  <Avatar 
                    uri={(post.handle === '@you' || post.name === 'You') ? userAvatar : undefined} 
                    size={40} 
                  />
                </TouchableOpacity>
                <View style={styles.postUserInfo}>
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      const userId = post.userId || post.handle.replace('@', '');
                      navigation.navigate('UserProfile', { userId, username: post.handle });
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.postUsername}>{post.name}</Text>
                  </TouchableOpacity>
                  <View style={styles.handleRow}>
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        const userId = post.userId || post.handle.replace('@', '');
                        navigation.navigate('UserProfile', { userId, username: post.handle });
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.postHandle}>{post.handle}</Text>
                    </TouchableOpacity>
                    {post.timestamp && (
                      <>
                        <Text style={styles.handleSeparator}> · </Text>
                        <Text style={styles.postTimestamp}>{post.timestamp}</Text>
                      </>
                    )}
                  </View>
                </View>
              </View>
              <Text style={styles.postText}>{post.text}</Text>
              {post.location && (
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={14} color={Colors.textLight} />
                  <Text style={styles.locationText}>{post.location}</Text>
                </View>
              )}
            </TouchableOpacity>
            <PostActions
              post={post}
              onComment={() => navigation.navigate('PostDetail', { post })}
              onRepost={() => {
                // Handle repost
              }}
              onQuote={() => {
                navigation.navigate('QuotePost', { post });
              }}
            />
          </View>
        ))}
      </ScrollView>

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
  postText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 12,
    marginLeft: 52, // Align with name/username (avatar width 40 + marginRight 12)
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
    marginLeft: 52, // Align with name/username (avatar width 40 + marginRight 12)
  },
  locationText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
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
});
