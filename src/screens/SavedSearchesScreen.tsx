import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SavedSearch {
  id: string;
  query: string;
  filters?: string;
  timestamp: string;
}

const sampleSearches: SavedSearch[] = [
  { id: '1', query: 'React Native developers', filters: 'Users, Posts', timestamp: '2 days ago' },
  { id: '2', query: 'AI tools', filters: 'Posts', timestamp: '1 week ago' },
  { id: '3', query: 'SaaS founders', filters: 'Users', timestamp: '2 weeks ago' },
];

export default function SavedSearchesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searches, setSearches] = useState<SavedSearch[]>(sampleSearches);

  const handleDelete = (searchId: string) => {
    Alert.alert('Delete Search', 'Are you sure you want to delete this saved search?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setSearches(searches.filter((s) => s.id !== searchId)),
      },
    ]);
  };

  const handleSearch = (search: SavedSearch) => {
    navigation.navigate('Search');
    // In real app, would apply the saved search query
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Saved Searches" />
      <ScrollView style={styles.scrollView}>
        {searches.length > 0 ? (
          searches.map((search) => (
            <View key={search.id} style={styles.searchItem}>
              <TouchableOpacity
                style={styles.searchContent}
                onPress={() => handleSearch(search)}
                activeOpacity={0.7}
              >
                <Ionicons name="search" size={20} color={Colors.primary} />
                <View style={styles.searchInfo}>
                  <Text style={styles.searchQuery}>{search.query}</Text>
                  {search.filters && (
                    <Text style={styles.searchFilters}>{search.filters}</Text>
                  )}
                  <Text style={styles.searchTimestamp}>{search.timestamp}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(search.id)}
              >
                <Ionicons name="trash-outline" size={20} color={Colors.error} />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={64} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>No saved searches</Text>
            <Text style={styles.emptyText}>
              Searches you save will appear here for quick access.
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
  searchItem: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginBottom: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
  },
  searchContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  searchInfo: {
    flex: 1,
  },
  searchQuery: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  searchFilters: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  searchTimestamp: {
    fontSize: 12,
    color: Colors.textLight,
  },
  deleteButton: {
    padding: 16,
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: Colors.borderLight,
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

