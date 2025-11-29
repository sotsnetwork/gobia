import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Activity {
  id: string;
  type: 'post' | 'comment' | 'like' | 'follow' | 'community';
  action: string;
  target: string;
  timestamp: string;
  icon: string;
  color: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'post',
    action: 'You posted',
    target: 'a new update about your project',
    timestamp: '2 hours ago',
    icon: 'create-outline',
    color: Colors.primary,
  },
  {
    id: '2',
    type: 'comment',
    action: 'You commented on',
    target: "Sarah's post",
    timestamp: '5 hours ago',
    icon: 'chatbubble-outline',
    color: Colors.info,
  },
  {
    id: '3',
    type: 'like',
    action: 'You liked',
    target: "Mike's post",
    timestamp: '1 day ago',
    icon: 'heart',
    color: Colors.error,
  },
  {
    id: '4',
    type: 'follow',
    action: 'You followed',
    target: '@elena_dev',
    timestamp: '2 days ago',
    icon: 'person-add-outline',
    color: Colors.success,
  },
  {
    id: '5',
    type: 'community',
    action: 'You joined',
    target: 'React Native Developers',
    timestamp: '3 days ago',
    icon: 'people-outline',
    color: Colors.warning,
  },
];

export default function ActivityLogScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [filter, setFilter] = useState<string>('all');

  const filters = ['all', 'post', 'comment', 'like', 'follow', 'community'];
  const filteredActivities =
    filter === 'all'
      ? activities
      : activities.filter((a) => a.type === filter);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Activity Log" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.scrollView}>
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: activity.color + '20' }]}>
                <Ionicons name={activity.icon as any} size={24} color={activity.color} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>
                  <Text style={styles.activityAction}>{activity.action} </Text>
                  <Text style={styles.activityTarget}>{activity.target}</Text>
                </Text>
                <Text style={styles.activityTimestamp}>{activity.timestamp}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="time-outline" size={64} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>No activity</Text>
            <Text style={styles.emptyText}>
              Your activity history will appear here.
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
  filterScroll: {
    maxHeight: 50,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: Colors.text,
  },
  filterTextActive: {
    color: Colors.white,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  activityItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.white,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 4,
  },
  activityAction: {
    color: Colors.textSecondary,
  },
  activityTarget: {
    fontWeight: '600',
    color: Colors.text,
  },
  activityTimestamp: {
    fontSize: 12,
    color: Colors.textLight,
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

