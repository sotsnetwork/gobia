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

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I create a community?',
    answer: 'Tap the Communities tab, then tap the + icon to create a new community. Fill in the name, description, and choose privacy settings.',
  },
  {
    id: '2',
    question: 'How do I collaborate with other users?',
    answer: 'You can send collaboration requests through user profiles or by messaging them directly. They will appear in your Collaboration Requests section.',
  },
  {
    id: '3',
    question: 'Can I make my profile private?',
    answer: 'Yes! Go to Settings > Privacy Settings and enable "Private Profile". Only approved followers will see your posts.',
  },
  {
    id: '4',
    question: 'How do I save posts?',
    answer: 'Tap the bookmark icon on any post to save it. Saved posts can be accessed from your profile or the Saved Posts section.',
  },
  {
    id: '5',
    question: 'What are trending topics?',
    answer: 'Trending topics show the most popular hashtags and topics being discussed in the last 24 hours across the platform.',
  },
];

export default function FAQsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="FAQs" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.intro}>
          Frequently asked questions about Gobia
        </Text>

        {faqs.map((faq) => (
          <View key={faq.id} style={styles.faqItem}>
            <TouchableOpacity
              style={styles.faqQuestion}
              onPress={() => toggleFAQ(faq.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.questionText}>{faq.question}</Text>
              <Ionicons
                name={expandedId === faq.id ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={Colors.textLight}
              />
            </TouchableOpacity>
            {expandedId === faq.id && (
              <View style={styles.faqAnswer}>
                <Text style={styles.answerText}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}

        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Still need help?</Text>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => navigation.navigate('HelpSupport')}
          >
            <Ionicons name="help-circle-outline" size={24} color={Colors.primary} />
            <Text style={styles.helpButtonText}>Contact Support</Text>
          </TouchableOpacity>
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
  faqItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  answerText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginTop: 12,
  },
  helpSection: {
    marginTop: 32,
    padding: 16,
    backgroundColor: Colors.primaryLight + '20',
    borderRadius: 12,
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  helpButtonText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
});

