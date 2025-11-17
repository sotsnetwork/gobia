import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../components/Logo';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function FeedScreen() {
  const navigation = useNavigation<NavigationProp>();

  const posts = [
    {
      id: '1',
      name: 'You',
      handle: '@you',
      text: 'I am creating a feed for my app, what do you all think?',
      likes: 0,
      comments: 0,
      boosts: 0,
    },
    {
      id: '2',
      name: 'andres',
      handle: '@andres',
      text: 'I am building an AI chatbot but need a product designer.',
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
      likes: 256,
      comments: 42,
      boosts: 1,
    },
    {
      id: '4',
      name: 'Builder Bro',
      handle: '@builderbro',
      text: "I'm working on a cross-platform mobile app for builders and developers to share what they’re working on and get help. The app should feel simple, fast, and community-driven.",
      location: 'Remote',
      likes: 18,
      comments: 9,
      boosts: 1,
      saved: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('MyProfile')}>
          <View style={styles.avatarLarge} />
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
              <View style={styles.postHeader}>
                <View style={styles.avatar} />
                <View style={styles.postUserInfo}>
                  <Text style={styles.postUsername}>{post.name}</Text>
                  <Text style={styles.postHandle}>{post.handle}</Text>
                </View>
              </View>
            <Text style={styles.postText}>{post.text}</Text>
            {post.location && (
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={14} color={Colors.textLight} />
                <Text style={styles.locationText}>{post.location}</Text>
              </View>
            )}
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.postAction}>
                <Ionicons
                  name="heart-outline"
                  size={18}
                  color={post.likes > 0 ? Colors.primary : Colors.textLight}
                />
                <Text
                  style={[
                    styles.postActionText,
                    post.likes > 0 && styles.highlightText,
                  ]}
                >
                  {post.likes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <Ionicons name="chatbubble-outline" size={18} color={Colors.textLight} />
                <Text style={styles.postActionText}>{post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <Ionicons name="arrow-up-outline" size={18} color={Colors.textLight} />
                {post.boosts ? <Text style={styles.postActionText}>{post.boosts}</Text> : null}
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <Ionicons
                  name={post.saved ? 'bookmark' : 'bookmark-outline'}
                  size={18}
                  color={post.saved ? Colors.primary : Colors.textLight}
                />
              </TouchableOpacity>
            </View>
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

