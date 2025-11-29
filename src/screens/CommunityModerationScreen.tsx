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

interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  reported: boolean;
  reportReason?: string;
}

const communities: Community[] = [
  {
    id: '1',
    name: 'Questionable Community',
    description: 'This community may violate guidelines',
    members: 234,
    reported: true,
    reportReason: 'Inappropriate Content',
  },
  {
    id: '2',
    name: 'Another Community',
    description: 'Needs review for potential violations',
    members: 189,
    reported: true,
    reportReason: 'Spam',
  },
];

export default function CommunityModerationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [pendingCommunities, setPendingCommunities] = useState<Community[]>(communities);

  const handleApprove = (communityId: string) => {
    Alert.alert('Approve Community', 'This community will remain active.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Approve',
        onPress: () => {
          setPendingCommunities(pendingCommunities.filter((c) => c.id !== communityId));
          Alert.alert('Success', 'Community has been approved');
        },
      },
    ]);
  };

  const handleSuspend = (communityId: string) => {
    Alert.alert('Suspend Community', 'This community will be temporarily suspended.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Suspend',
        style: 'destructive',
        onPress: () => {
          setPendingCommunities(pendingCommunities.filter((c) => c.id !== communityId));
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Community Moderation" />
      <ScrollView style={styles.scrollView}>
        {pendingCommunities.length > 0 ? (
          pendingCommunities.map((community) => (
            <View key={community.id} style={styles.communityCard}>
              <View style={styles.communityHeader}>
                <View style={styles.communityIcon}>
                  <Ionicons name="people" size={24} color={Colors.primary} />
                </View>
                <View style={styles.communityInfo}>
                  <Text style={styles.communityName}>{community.name}</Text>
                  <Text style={styles.communityDescription}>{community.description}</Text>
                  <View style={styles.communityStats}>
                    <Ionicons name="people-outline" size={16} color={Colors.textLight} />
                    <Text style={styles.memberCount}>{community.members} members</Text>
                  </View>
                </View>
                {community.reported && (
                  <View style={styles.reportedBadge}>
                    <Ionicons name="flag" size={16} color={Colors.error} />
                    <Text style={styles.reportedText}>{community.reportReason}</Text>
                  </View>
                )}
              </View>
              <View style={styles.actions}>
                <Button
                  title="Approve"
                  onPress={() => handleApprove(community.id)}
                  style={styles.approveButton}
                  textStyle={styles.approveButtonText}
                />
                <Button
                  title="Suspend"
                  variant="outline"
                  onPress={() => handleSuspend(community.id)}
                  style={styles.suspendButton}
                  textStyle={styles.suspendButtonText}
                />
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="checkmark-circle-outline" size={64} color={Colors.success} />
            <Text style={styles.emptyTitle}>All clear!</Text>
            <Text style={styles.emptyText}>
              No communities pending moderation.
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
  communityCard: {
    backgroundColor: Colors.white,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  communityHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  communityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primaryLight + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  communityInfo: {
    flex: 1,
  },
  communityName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  communityDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  communityStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  memberCount: {
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
    height: 'fit-content',
  },
  reportedText: {
    fontSize: 12,
    color: Colors.error,
    fontWeight: '600',
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
  suspendButton: {
    flex: 1,
  },
  suspendButtonText: {
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

