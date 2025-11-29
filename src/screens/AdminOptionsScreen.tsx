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

const pendingPosts = [
  { id: '1', author: 'John Doe', text: 'Sample post content...', time: '2h' },
  { id: '2', author: 'Jane Smith', text: 'Another post awaiting review...', time: '5h' },
];

export default function AdminOptionsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [pendingCount] = useState(pendingPosts.length);

  const adminOptions = [
    {
      id: '1',
      title: 'Content Moderation',
      subtitle: 'Review and moderate posts',
      icon: 'shield-checkmark-outline',
      screen: 'ContentModeration',
      badge: pendingCount > 0 ? pendingCount : undefined,
    },
    {
      id: '2',
      title: 'Community Moderation',
      subtitle: 'Manage communities',
      icon: 'people-outline',
      screen: 'CommunityModeration',
    },
    {
      id: '3',
      title: 'View Analytics',
      subtitle: 'Platform insights and stats',
      icon: 'analytics-outline',
      screen: 'CommunityInsights',
    },
    {
      id: '4',
      title: 'User Management',
      subtitle: 'Manage user accounts',
      icon: 'person-outline',
      screen: 'Search',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Admin Options" />
      <ScrollView style={styles.scrollView}>
        {pendingCount > 0 && (
          <View style={styles.pendingBanner}>
            <Ionicons name="alert-circle-outline" size={20} color={Colors.warning} />
            <Text style={styles.pendingText}>
              {pendingCount} post{pendingCount > 1 ? 's' : ''} pending review
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ContentModeration')}
            >
              <Text style={styles.reviewLink}>Review</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.optionsList}>
          {adminOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionItem}
              onPress={() => navigation.navigate(option.screen as any)}
            >
              <View style={styles.optionIcon}>
                <Ionicons name={option.icon as any} size={24} color={Colors.primary} />
                {option.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{option.badge}</Text>
                  </View>
                )}
              </View>
              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
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
  pendingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warning + '20',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    gap: 8,
  },
  pendingText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  reviewLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  optionsList: {
    paddingHorizontal: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

