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

export default function HelpSupportScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Help & Support" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.textLight} />
          <Text style={styles.searchPlaceholder}>Search for help topics...</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('FAQs')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqText}>How do I create a new project post?</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.textLight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqText}>Can I edit my profile information?</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.textLight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqText}>How do I report inappropriate content?</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.textLight} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Need more help?</Text>
        <TouchableOpacity style={styles.helpCard}>
          <View style={styles.helpIcon}>
            <Ionicons name="mail-outline" size={24} color={Colors.primary} />
          </View>
          <View style={styles.helpInfo}>
            <Text style={styles.helpTitle}>Email Support</Text>
            <Text style={styles.helpSubtitle}>Get a response within 24 hours.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.helpCard}>
          <View style={styles.helpIcon}>
            <Ionicons name="chatbubble-outline" size={24} color={Colors.primary} />
          </View>
          <View style={styles.helpInfo}>
            <Text style={styles.helpTitle}>Start Live Chat</Text>
            <Text style={styles.helpSubtitle}>Chat with a support agent now.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.helpCard}
          onPress={() => navigation.navigate('ReportIssue')}
        >
          <View style={styles.helpIcon}>
            <Ionicons name="bug-outline" size={24} color={Colors.primary} />
          </View>
          <View style={styles.helpInfo}>
            <Text style={styles.helpTitle}>Report a Bug</Text>
            <Text style={styles.helpSubtitle}>Help us improve by reporting issues.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
        </TouchableOpacity>
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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 24,
    gap: 8,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: Colors.textLight,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  faqText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  helpIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  helpInfo: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  helpSubtitle: {
    fontSize: 14,
    color: Colors.textLight,
  },
});

