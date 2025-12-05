import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';
import * as CommunityService from '../services/communityService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ALL_COMMUNITIES: CommunityService.Community[] = [
  { id: '1', name: 'Lagos Builders', members: 1200, icon: '🏙️', category: 'location', location: 'Lagos' },
  { id: '2', name: 'SF Devs', members: 8700, icon: '🌉', category: 'location', location: 'San Francisco' },
  { id: '3', name: 'AI Startups', members: 12400, icon: '🤖', category: 'interest' },
  { id: '4', name: 'Web3 Designers', members: 4500, icon: '3', category: 'interest' },
  { id: '5', name: 'Indie Hackers', members: 21000, icon: '💻', category: 'interest' },
];

export default function CommunitiesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [joinedIds, setJoinedIds] = useState<string[]>([]);

  useEffect(() => {
    loadJoinedCommunities();
  }, []);

  const loadJoinedCommunities = async () => {
    try {
      const joined = await CommunityService.getJoinedCommunities();
      setJoinedIds(joined);
    } catch (error) {
      console.error('Error loading joined communities:', error);
    }
  };

  const handleJoinToggle = async (community: CommunityService.Community) => {
    try {
      const isJoined = joinedIds.includes(community.id);
      if (isJoined) {
        await CommunityService.leaveCommunity(community.id);
      } else {
        await CommunityService.joinCommunity(community.id);
      }
      await loadJoinedCommunities();
    } catch (error) {
      console.error('Error toggling join:', error);
    }
  };

  const filteredCommunities = ALL_COMMUNITIES.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const locationCommunities = filteredCommunities.filter((c) => c.category === 'location');
  const interestCommunities = filteredCommunities.filter((c) => c.category === 'interest');

  const formatMembers = (count: number): string => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  };

  const CommunityItem = ({ community }: { community: CommunityService.Community }) => {
    const isJoined = joinedIds.includes(community.id);
    return (
      <TouchableOpacity
        style={styles.communityItem}
        onPress={() => navigation.navigate('CommunityDetail', { communityId: community.id, communityName: community.name })}
        activeOpacity={0.7}
      >
        <View style={styles.communityIcon}>
          <Text style={styles.communityIconText}>{community.icon}</Text>
        </View>
        <View style={styles.communityInfo}>
          <Text style={styles.communityName}>{community.name}</Text>
          <Text style={styles.communityMembers}>{formatMembers(community.members)} members</Text>
        </View>
        <TouchableOpacity
          style={[styles.joinButton, isJoined && styles.joinedButton]}
          onPress={(e) => {
            e.stopPropagation();
            handleJoinToggle(community);
          }}
        >
          <Text style={[styles.joinButtonText, isJoined && styles.joinedButtonText]}>
            {isJoined ? 'Joined' : 'Join'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <Text style={styles.headerTitle}>Communities</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateCommunity')}>
          <Ionicons name="add" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.textLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search communities"
          placeholderTextColor={Colors.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={Colors.textLight} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollView}>
        {locationCommunities.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>BY LOCATION</Text>
            {locationCommunities.map((community) => (
              <CommunityItem key={community.id} community={community} />
            ))}
          </>
        )}

        {interestCommunities.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>BY INTEREST</Text>
            {interestCommunities.map((community) => (
              <CommunityItem key={community.id} community={community} />
            ))}
          </>
        )}

        {filteredCommunities.length === 0 && searchQuery.length > 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color={Colors.textLight} />
            <Text style={styles.emptyText}>No communities found</Text>
            <Text style={styles.emptySubtext}>Try a different search term</Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateCommunity')}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerLeft: {
    width: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
    textAlign: 'center',
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
    padding: 0,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textLight,
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    textTransform: 'uppercase',
  },
  communityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  communityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  communityIconText: {
    fontSize: 24,
  },
  communityInfo: {
    flex: 1,
  },
  communityName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  communityMembers: {
    fontSize: 14,
    color: Colors.textLight,
  },
  joinButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  joinedButton: {
    backgroundColor: Colors.borderLight,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  joinButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  joinedButtonText: {
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

