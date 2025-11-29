import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { Colors } from '../constants/colors';

export default function CommunityGuidelinesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Community Guidelines" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.intro}>
          These guidelines help ensure Gobia remains a safe, welcoming space for all creators,
          developers, and builders.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Be Respectful</Text>
          <Text style={styles.sectionText}>
            Treat all community members with respect and kindness. Harassment, hate speech, or
            discrimination of any kind is not tolerated.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Share Authentic Content</Text>
          <Text style={styles.sectionText}>
            Post original content and give credit where it's due. Plagiarism and copyright
            infringement are strictly prohibited.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. No Spam or Self-Promotion</Text>
          <Text style={styles.sectionText}>
            While sharing your work is encouraged, excessive self-promotion or spam is not allowed.
            Focus on adding value to the community.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Keep It Professional</Text>
          <Text style={styles.sectionText}>
            Maintain a professional tone in discussions. Personal attacks, trolling, or disruptive
            behavior will result in warnings or account suspension.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Protect Privacy</Text>
          <Text style={styles.sectionText}>
            Do not share personal information of others without consent. Respect privacy settings
            and boundaries.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Report Violations</Text>
          <Text style={styles.sectionText}>
            If you see content or behavior that violates these guidelines, please report it using
            the report feature. We take all reports seriously.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consequences</Text>
          <Text style={styles.sectionText}>
            Violations of these guidelines may result in content removal, warnings, temporary
            suspension, or permanent ban from the platform, depending on the severity.
          </Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
});

