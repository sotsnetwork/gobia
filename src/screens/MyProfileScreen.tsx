import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Share, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import PostActions from '../components/PostActions';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';
import * as AuthService from '../services/authService';
import * as ProfileService from '../services/profileService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MyProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [showMenu, setShowMenu] = useState(false);
  const [name, setName] = useState('Jane Doe');
  const [bio, setBio] = useState('Building with React Native & Firebase | Founder');
  const [username, setUsername] = useState('@CoolApp');
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [website, setWebsite] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await ProfileService.getProfile();
        if (profile) {
          setName(profile.name || 'Jane Doe');
          setUsername(profile.username || '@CoolApp');
          setBio(profile.bio || '');
          setLocation(profile.location);
          setWebsite(profile.website);
        }
      } catch (error) {
        // Keep defaults on error
      }
    };

    loadProfile();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity onPress={() => setShowMenu(true)}>
          <Ionicons name="ellipsis-vertical" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <View style={styles.avatar} />
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <Text style={styles.name}>{name}</Text>
          {!!bio && <Text style={styles.bio}>{bio}</Text>}
          <Text style={styles.handle}>{username}</Text>
          {location && (
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={16} color={Colors.textSecondary} />
              <Text style={styles.infoText}>{location}</Text>
            </View>
          )}
          {website && (
            <TouchableOpacity
              style={styles.infoRow}
              onPress={async () => {
                try {
                  await Linking.openURL(website);
                } catch {
                  Alert.alert('Error', 'Unable to open this link.');
                }
              }}
            >
              <Ionicons name="link-outline" size={16} color={Colors.textSecondary} />
              <Text style={[styles.infoText, styles.linkText]} numberOfLines={1}>
                {website.replace(/^https?:\/\//i, '')}
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>150</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>342</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>150</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
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
          <View style={styles.post}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('PostDetail', {
                post: {
                  id: 'profile-post-1',
                  name: 'Jane Doe',
                  handle: '@jane_doe',
                  text: "Just shipped a new feature for @CoolApp! It's a real-time collaboration tool built with Firebase. What do you all think? #React #Firebase",
                  timestamp: '2h',
                  likes: 15,
                  comments: 4,
                  reposts: 0,
                  views: 120,
                  saved: false,
                }
              })}
            >
              <View style={styles.postHeader}>
                <View style={styles.postAvatar} />
                <View style={styles.postUserInfo}>
                  <Text style={styles.postUsername}>Jane Doe</Text>
                  <Text style={styles.postHandle}>@jane_doe · 2h</Text>
                </View>
              </View>
              <Text style={styles.postText}>
                Just shipped a new feature for @CoolApp! It's a real-time collaboration tool built with Firebase. What do you all think? #React #Firebase
              </Text>
            </TouchableOpacity>
            <PostActions
              post={{
                id: 'profile-post-1',
                name: 'Jane Doe',
                handle: '@jane_doe',
                text: "Just shipped a new feature for @CoolApp! It's a real-time collaboration tool built with Firebase. What do you all think? #React #Firebase",
                likes: 15,
                comments: 4,
                reposts: 0,
                views: 120,
                saved: false,
              }}
              onComment={() => navigation.navigate('PostDetail', {
                post: {
                  id: 'profile-post-1',
                  name: 'Jane Doe',
                  handle: '@jane_doe',
                  text: "Just shipped a new feature for @CoolApp! It's a real-time collaboration tool built with Firebase. What do you all think? #React #Firebase",
                  timestamp: '2h',
                  likes: 15,
                  comments: 4,
                  reposts: 0,
                  views: 120,
                  saved: false,
                }
              })}
            />
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false);
                navigation.navigate('Settings');
              }}
            >
              <Ionicons name="settings-outline" size={24} color={Colors.text} />
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={async () => {
                setShowMenu(false);
                try {
                  await Share.share({
                    message: 'Check out my profile on Gobia! @CoolApp',
                    title: 'Share Profile',
                  });
                } catch (error) {
                  // Share cancelled or error
                }
              }}
            >
              <Ionicons name="share-outline" size={24} color={Colors.text} />
              <Text style={styles.menuItemText}>Share Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false);
                navigation.navigate('ExportUserData');
              }}
            >
              <Ionicons name="download-outline" size={24} color={Colors.text} />
              <Text style={styles.menuItemText}>Export Data</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false);
                navigation.navigate('HelpSupport');
              }}
            >
              <Ionicons name="help-circle-outline" size={24} color={Colors.text} />
              <Text style={styles.menuItemText}>Help & Support</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false);
                Alert.alert(
                  'Log Out',
                  'Are you sure you want to log out?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Log Out',
                      style: 'destructive',
                      onPress: async () => {
                        try {
                          await AuthService.logout();
                          navigation.reset({
                            index: 0,
                            routes: [{ name: 'Welcome' }],
                          });
                        } catch (error) {
                          Alert.alert('Error', 'Failed to log out. Please try again.');
                        }
                      },
                    },
                  ]
                );
              }}
            >
              <Ionicons name="log-out-outline" size={24} color={Colors.error} />
              <Text style={[styles.menuItemText, styles.logoutText]}>Log Out</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
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
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  editButtonText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
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
    marginBottom: 4,
  },
  handle: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
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
    color: Colors.text,
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
    width: 32,
    height: 32,
    borderRadius: 16,
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
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
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
  logoutText: {
    color: Colors.error,
  },
  menuDivider: {
    height: 8,
    backgroundColor: Colors.borderLight,
  },
});

