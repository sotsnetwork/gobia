import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Button from '../components/Button';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AdvancedSearchScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [query, setQuery] = useState('');
  const [searchInPosts, setSearchInPosts] = useState(true);
  const [searchInUsers, setSearchInUsers] = useState(true);
  const [searchInCommunities, setSearchInCommunities] = useState(true);
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  const dateOptions = ['all', 'today', 'week', 'month', 'year'];
  const sortOptions = ['relevance', 'newest', 'oldest', 'popular'];

  const handleSearch = () => {
    if (!query.trim()) {
      return;
    }
    // Navigate to search results
    navigation.navigate('Search');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Advanced Search" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={Colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for..."
            placeholderTextColor={Colors.textLight}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search In</Text>
          <View style={styles.option}>
            <Text style={styles.optionText}>Posts</Text>
            <Switch
              value={searchInPosts}
              onValueChange={setSearchInPosts}
              trackColor={{ false: Colors.border, true: Colors.primary }}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Users</Text>
            <Switch
              value={searchInUsers}
              onValueChange={setSearchInUsers}
              trackColor={{ false: Colors.border, true: Colors.primary }}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Communities</Text>
            <Switch
              value={searchInCommunities}
              onValueChange={setSearchInCommunities}
              trackColor={{ false: Colors.border, true: Colors.primary }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date Range</Text>
          <View style={styles.chipContainer}>
            {dateOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.chip, dateRange === option && styles.chipActive]}
                onPress={() => setDateRange(option)}
              >
                <Text
                  style={[styles.chipText, dateRange === option && styles.chipTextActive]}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sort By</Text>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.radioOption, sortBy === option && styles.radioOptionActive]}
              onPress={() => setSortBy(option)}
            >
              <View style={styles.radioInfo}>
                <Text style={styles.radioText}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </View>
              <View style={[styles.radio, sortBy === option && styles.radioActive]}>
                {sortBy === option && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          title="Search"
          onPress={handleSearch}
          disabled={!query.trim()}
          style={styles.searchButton}
        />
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
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 24,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  section: {
    marginBottom: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  optionText: {
    fontSize: 16,
    color: Colors.text,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: Colors.text,
  },
  chipTextActive: {
    color: Colors.white,
    fontWeight: '600',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  radioOptionActive: {
    // Active styling
  },
  radioInfo: {
    flex: 1,
  },
  radioText: {
    fontSize: 16,
    color: Colors.text,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  searchButton: {
    marginTop: 8,
  },
});

