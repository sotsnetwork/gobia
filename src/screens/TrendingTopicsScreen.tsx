import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const trendingTopics = [
  { id: '1', topic: '#ReactNative', posts: 1240, trend: 'up' },
  { id: '2', topic: '#AI', posts: 890, trend: 'up' },
  { id: '3', topic: '#Web3', posts: 756, trend: 'up' },
  { id: '4', topic: '#Startup', posts: 642, trend: 'down' },
  { id: '5', topic: '#OpenSource', posts: 534, trend: 'up' },
  { id: '6', topic: '#SaaS', posts: 421, trend: 'up' },
  { id: '7', topic: '#Design', posts: 389, trend: 'down' },
  { id: '8', topic: '#NoCode', posts: 312, trend: 'up' },
];

export default function TrendingTopicsScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Trending Topics" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle-outline" size={20} color={Colors.info} />
          <Text style={styles.infoText}>
            Topics trending in the last 24 hours
          </Text>
        </View>

        {trendingTopics.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.topicItem}
            onPress={() => navigation.navigate('Search')}
          >
            <View style={styles.topicRank}>
              <Text style={styles.rankNumber}>{index + 1}</Text>
            </View>
            <View style={styles.topicInfo}>
              <View style={styles.topicHeader}>
                <Text style={styles.topicName}>{item.topic}</Text>
                <Ionicons
                  name={item.trend === 'up' ? 'trending-up' : 'trending-down'}
                  size={20}
                  color={item.trend === 'up' ? Colors.success : Colors.error}
                />
              </View>
              <Text style={styles.topicPosts}>{item.posts.toLocaleString()} posts</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
          </TouchableOpacity>
        ))}
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.info + '15',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.white,
  },
  topicRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  topicInfo: {
    flex: 1,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  topicName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  topicPosts: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

