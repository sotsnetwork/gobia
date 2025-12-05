import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RoutePropType = RouteProp<RootStackParamList, 'PostAnalytics'>;

export default function PostAnalyticsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const post = route.params?.post;

  const views = post?.views || 0;
  const likes = post?.likes || 0;
  const comments = post?.comments || 0;
  const reposts = post?.reposts || 0;
  const shares = 0; // Not tracked in current implementation

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const engagementRate = views > 0 ? ((likes + comments + reposts) / views * 100).toFixed(1) : '0';

  const StatCard = ({ icon, label, value, color }: { icon: string; label: string; value: number | string; color: string }) => (
    <View style={styles.statCard}>
      <View style={[styles.statIconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon as any} size={24} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post Analytics</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {post && (
          <View style={styles.postPreview}>
            <Text style={styles.postPreviewText} numberOfLines={2}>
              {post.text || 'Post preview'}
            </Text>
            <Text style={styles.postPreviewTime}>{post.timestamp || post.time || 'Recently'}</Text>
          </View>
        )}

        <View style={styles.statsGrid}>
          <StatCard icon="eye-outline" label="Views" value={formatNumber(views)} color={Colors.primary} />
          <StatCard icon="heart-outline" label="Likes" value={formatNumber(likes)} color={Colors.error} />
          <StatCard icon="chatbubble-outline" label="Comments" value={formatNumber(comments)} color={Colors.info} />
          <StatCard icon="repeat-outline" label="Reposts" value={formatNumber(reposts)} color={Colors.success} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Engagement</Text>
          <View style={styles.engagementCard}>
            <View style={styles.engagementRow}>
              <Text style={styles.engagementLabel}>Engagement Rate</Text>
              <Text style={styles.engagementValue}>{engagementRate}%</Text>
            </View>
            <View style={styles.engagementBar}>
              <View style={[styles.engagementFill, { width: `${Math.min(parseFloat(engagementRate), 100)}%` }]} />
            </View>
            <Text style={styles.engagementSubtext}>
              {likes + comments + reposts} engagements out of {views} views
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Breakdown</Text>
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownRow}>
              <Ionicons name="heart" size={20} color={Colors.error} />
              <Text style={styles.breakdownLabel}>Likes</Text>
              <Text style={styles.breakdownValue}>{formatNumber(likes)}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Ionicons name="chatbubble" size={20} color={Colors.info} />
              <Text style={styles.breakdownLabel}>Comments</Text>
              <Text style={styles.breakdownValue}>{formatNumber(comments)}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Ionicons name="repeat" size={20} color={Colors.success} />
              <Text style={styles.breakdownLabel}>Reposts</Text>
              <Text style={styles.breakdownValue}>{formatNumber(reposts)}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Ionicons name="share-social" size={20} color={Colors.textLight} />
              <Text style={styles.breakdownLabel}>Shares</Text>
              <Text style={styles.breakdownValue}>{formatNumber(shares)}</Text>
            </View>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  headerRight: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  postPreview: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  postPreviewText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },
  postPreviewTime: {
    fontSize: 12,
    color: Colors.textLight,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textLight,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  engagementCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  engagementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  engagementLabel: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  engagementValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  engagementBar: {
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  engagementFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  engagementSubtext: {
    fontSize: 12,
    color: Colors.textLight,
  },
  breakdownCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    gap: 12,
  },
  breakdownLabel: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
});

