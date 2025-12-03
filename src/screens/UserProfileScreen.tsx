import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import PostActions from '../components/PostActions';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RoutePropType = RouteProp<RootStackParamList, 'UserProfile'>;

export default function UserProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { userId, username } = route.params || {};
  const [following, setFollowing] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Sample user data - in real app, fetch by userId
  const user = {
    id: userId || '1',
    name: 'Sarah Johnson',
    username: username || '@sarahj',
    bio: 'Full-stack developer | Building AI tools | Open source contributor',
    location: 'San Francisco, CA',
    website: 'sarahj.dev',
    following: 234,
    followers: 1890,
    posts: 156,
    isFollowing: following,
    isBlocked: blocked,
  };

  const handleFollow = () => {
    setFollowing(!following);
  };

  const handleBlock = () => {
    Alert.alert(
      'Block User',
      `Are you sure you want to block ${user.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Block',
          style: 'destructive',
          onPress: () => {
            setBlocked(true);
            setFollowing(false);
          },
        },
      ]
    );
  };

  const handleReport = () => {
    setShowMenu(false);
    Alert.alert('Report User', `Report ${user.name} for inappropriate behavior?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Report', style: 'destructive', onPress: () => navigation.navigate('ReportIssue') },
    ]);
  };

  const handleMute = () => {
    setShowMenu(false);
    Alert.alert(
      muted ? 'Unmute User' : 'Mute User',
      muted
        ? `Unmute ${user.name}? You will see their posts in your feed again.`
        : `Mute ${user.name}? You won't see their posts in your feed, but they can still see yours.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: muted ? 'Unmute' : 'Mute',
          onPress: () => {
            setMuted(!muted);
            Alert.alert('Success', `${user.name} has been ${muted ? 'unmuted' : 'muted'}.`);
          },
        },
      ]
    );
  };

  const handleShareProfile = async () => {
    setShowMenu(false);
    try {
      const result = await Share.share({
        message: `Check out ${user.name}'s profile on Gobia: ${user.username}`,
        title: `${user.name}'s Profile`,
      });
      if (result.action === Share.sharedAction) {
        Alert.alert('Success', 'Profile shared successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share profile.');
    }
  };

  const posts = [
    {
      id: '1',
      name: user.name,
      handle: user.username,
      text: 'Just launched my new AI-powered design tool! Check it out and let me know what you think.',
      timestamp: '2h',
      time: '2h',
      likes: 45,
      comments: 12,
      reposts: 5,
      views: 234,
      saved: false,
    },
    {
      id: '2',
      name: user.name,
      handle: user.username,
      text: 'Looking for a co-founder with expertise in ML/AI. Building something big in the creator economy space.',
      timestamp: '1d',
      time: '1d',
      likes: 89,
      comments: 23,
      reposts: 12,
      views: 567,
      saved: false,
    },
  ];

  if (blocked) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header title={user.name} />
        <View style={styles.blockedContainer}>
          <Ionicons name="ban-outline" size={64} color={Colors.textLight} />
          <Text style={styles.blockedText}>You have blocked this user</Text>
          <TouchableOpacity
            style={styles.unblockButton}
            onPress={() => setBlocked(false)}
          >
            <Text style={styles.unblockButtonText}>Unblock</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title={user.name}
        rightIcon={<Ionicons name="ellipsis-vertical" size={24} color={Colors.text} />}
        onRightPress={() => setShowMenu(true)}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <View style={styles.avatar} />
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.followButton, following && styles.followingButton]}
              onPress={handleFollow}
            >
              <Text style={[styles.followButtonText, following && styles.followingButtonText]}>
                {following ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.messageButton}
              onPress={() => navigation.navigate('Chat', { chatId: user.id, userName: user.name })}
            >
              <Ionicons name="mail-outline" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
          <Text style={styles.handle}>{user.username}</Text>
          {user.location && (
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={16} color={Colors.textSecondary} />
              <Text style={styles.infoText}>{user.location}</Text>
            </View>
          )}
          {user.website && (
            <View style={styles.infoRow}>
              <Ionicons name="link-outline" size={16} color={Colors.textSecondary} />
              <Text style={[styles.infoText, styles.linkText]}>{user.website}</Text>
            </View>
          )}
          <View style={styles.stats}>
            <TouchableOpacity style={styles.stat}>
              <Text style={styles.statNumber}>{user.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stat}>
              <Text style={styles.statNumber}>{user.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stat}>
              <Text style={styles.statNumber}>{user.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabs}>
          <View style={[styles.tab, styles.tabActive]}>
            <Text style={[styles.tabText, styles.tabTextActive]}>Posts</Text>
          </View>
          <View style={styles.tab}>
            <Text style={styles.tabText}>Communities</Text>
          </View>
        </View>

        <View style={styles.posts}>
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
                    <View style={styles.postAvatar} />
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
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        const userId = post.userId || post.handle.replace('@', '');
                        navigation.navigate('UserProfile', { userId, username: post.handle });
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.postHandle}>{post.handle} · {post.time}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.postText}>{post.text}</Text>
              </TouchableOpacity>
              <PostActions
                post={post}
                onComment={() => navigation.navigate('PostDetail', { post })}
                onRepost={() => {
                  // Handle repost
                }}
                onQuote={() => navigation.navigate('QuotePost', { post })}
                onBookmark={async () => {
                  // Bookmark updated
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Options Menu Modal */}
      <Modal
        visible={showMenu}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <View style={styles.menuContainer}>
            <View style={styles.menuHandle} />
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleShareProfile}
            >
              <Ionicons name="share-outline" size={24} color={Colors.text} />
              <Text style={styles.menuItemText}>Share Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleMute}
            >
              <Ionicons name={muted ? "volume-high-outline" : "volume-mute-outline"} size={24} color={Colors.text} />
              <Text style={styles.menuItemText}>{muted ? 'Unmute' : 'Mute'} User</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleReport}
            >
              <Ionicons name="flag-outline" size={24} color={Colors.error} />
              <Text style={[styles.menuItemText, styles.destructiveText]}>Report Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleBlock}
            >
              <Ionicons name="ban-outline" size={24} color={Colors.error} />
              <Text style={[styles.menuItemText, styles.destructiveText]}>Block Account</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setShowMenu(false)}
            >
              <Text style={styles.menuItemText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  profileSection: {
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  followButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  followingButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  followButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  followingButtonText: {
    color: Colors.text,
  },
  messageButton: {
    width: 40,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 20,
  },
  handle: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  linkText: {
    color: Colors.primary,
  },
  stats: {
    flexDirection: 'row',
    gap: 32,
    marginTop: 16,
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
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
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
  postUsername: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
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
    marginLeft: 52, // Align with name/username (avatar width 40 + marginRight 12)
  },
  blockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  blockedText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 16,
    marginBottom: 24,
  },
  unblockButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  unblockButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 32,
    paddingTop: 8,
  },
  menuHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.borderLight,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  menuItemText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  destructiveText: {
    color: Colors.error,
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 4,
  },
});

