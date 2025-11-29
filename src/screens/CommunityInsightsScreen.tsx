import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors } from '../constants/colors';

const insights = [
  {
    id: '1',
    title: 'Total Members',
    value: '12,450',
    change: '+15%',
    trend: 'up',
    icon: 'people-outline',
  },
  {
    id: '2',
    title: 'Active Posts',
    value: '3,420',
    change: '+8%',
    trend: 'up',
    icon: 'document-text-outline',
  },
  {
    id: '3',
    title: 'Engagement Rate',
    value: '24.5%',
    change: '+3.2%',
    trend: 'up',
    icon: 'trending-up-outline',
  },
  {
    id: '4',
    title: 'New Members (7d)',
    value: '342',
    change: '-5%',
    trend: 'down',
    icon: 'person-add-outline',
  },
];

export default function CommunityInsightsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Community Insights" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.intro}>
          Analytics and insights for your community
        </Text>

        <View style={styles.insightsGrid}>
          {insights.map((insight) => (
            <View key={insight.id} style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <Ionicons name={insight.icon as any} size={24} color={Colors.primary} />
                <View style={styles.trendContainer}>
                  <Ionicons
                    name={insight.trend === 'up' ? 'trending-up' : 'trending-down'}
                    size={16}
                    color={insight.trend === 'up' ? Colors.success : Colors.error}
                  />
                  <Text
                    style={[
                      styles.trendText,
                      { color: insight.trend === 'up' ? Colors.success : Colors.error },
                    ]}
                  >
                    {insight.change}
                  </Text>
                </View>
              </View>
              <Text style={styles.insightValue}>{insight.value}</Text>
              <Text style={styles.insightTitle}>{insight.title}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Contributors</Text>
          {['Sarah Johnson', 'Mike Davis', 'Elena Martinez'].map((name, index) => (
            <View key={index} style={styles.contributor}>
              <View style={styles.contributorRank}>
                <Text style={styles.rankNumber}>{index + 1}</Text>
              </View>
              <View style={styles.contributorAvatar} />
              <Text style={styles.contributorName}>{name}</Text>
              <Text style={styles.contributorPosts}>124 posts</Text>
            </View>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  intro: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 24,
  },
  insightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  insightCard: {
    width: '48%',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  insightTitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  contributor: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  contributorRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  contributorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    marginRight: 12,
  },
  contributorName: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  contributorPosts: {
    fontSize: 14,
    color: Colors.textLight,
  },
});

