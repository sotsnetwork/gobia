import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SearchScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<'Users' | 'Communities' | 'Posts'>('Users');

  const UserItem = ({ name, username, following }: { name: string; username: string; following: boolean }) => (
    <View style={styles.userItem}>
      <View style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userHandle}>{username}</Text>
      </View>
      <TouchableOpacity style={[styles.followButton, following && styles.followingButton]}>
        <Text style={[styles.followButtonText, following && styles.followingButtonText]}>
          {following ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <Text style={styles.headerTitle}>Search</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.textLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for users and communities"
          placeholderTextColor={Colors.textLight}
        />
      </View>

      <View style={styles.filterBar}>
        <TouchableOpacity
          style={styles.filterItem}
          onPress={() => navigation.navigate('AdvancedSearch')}
        >
          <Ionicons name="options-outline" size={20} color={Colors.primary} />
          <Text style={styles.filterText}>Advanced Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterItem}>
          <Ionicons name="people-outline" size={20} color={Colors.text} />
          <Text style={styles.findUsersText}>Find Users</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Users' && styles.tabActive]}
          onPress={() => setActiveTab('Users')}
        >
          <Text style={[styles.tabText, activeTab === 'Users' && styles.tabTextActive]}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Communities' && styles.tabActive]}
          onPress={() => setActiveTab('Communities')}
        >
          <Text style={[styles.tabText, activeTab === 'Communities' && styles.tabTextActive]}>Communities</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Posts' && styles.tabActive]}
          onPress={() => setActiveTab('Posts')}
        >
          <Text style={[styles.tabText, activeTab === 'Posts' && styles.tabTextActive]}>Posts</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {activeTab === 'Users' && (
          <>
            <UserItem name="Sarah Drasner" username="@sarah_edo" following={false} />
            <UserItem name="Dan Abramov" username="@dan_abramov" following={true} />
            <UserItem name="Cassidy Williams" username="@cassidoo" following={false} />
            <UserItem name="Evan You" username="@youyuxi" following={false} />
          </>
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
  headerLeft: {
    width: 24,
  },
  headerRight: {
    width: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    margin: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterText: {
    fontSize: 14,
    color: Colors.primary,
  },
  findUsersText: {
    fontSize: 14,
    color: Colors.text,
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
    color: Colors.primary,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 14,
    color: Colors.textLight,
  },
  followButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.text,
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
});

