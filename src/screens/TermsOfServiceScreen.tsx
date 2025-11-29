import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { Colors } from '../constants/colors';

export default function TermsOfServiceScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Terms of Service" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.lastUpdated}>Last updated: March 18, 2024</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.sectionText}>
            By accessing and using Gobia, you accept and agree to be bound by the terms and
            provision of this agreement. If you do not agree to these Terms of Service, please do
            not use our service.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Use License</Text>
          <Text style={styles.sectionText}>
            Permission is granted to temporarily use Gobia for personal, non-commercial transitory
            viewing only. This is the grant of a license, not a transfer of title, and under this
            license you may not:
          </Text>
          <Text style={styles.bulletPoint}>• Modify or copy the materials</Text>
          <Text style={styles.bulletPoint}>• Use the materials for any commercial purpose</Text>
          <Text style={styles.bulletPoint}>• Attempt to reverse engineer any software</Text>
          <Text style={styles.bulletPoint}>• Remove any copyright or proprietary notations</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. User Content</Text>
          <Text style={styles.sectionText}>
            You retain ownership of any content you post on Gobia. By posting content, you grant us
            a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute your
            content on the platform.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Prohibited Activities</Text>
          <Text style={styles.sectionText}>You agree not to:</Text>
          <Text style={styles.bulletPoint}>• Post illegal, harmful, or offensive content</Text>
          <Text style={styles.bulletPoint}>• Harass, abuse, or harm other users</Text>
          <Text style={styles.bulletPoint}>• Spam or send unsolicited messages</Text>
          <Text style={styles.bulletPoint}>• Violate any applicable laws or regulations</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Account Termination</Text>
          <Text style={styles.sectionText}>
            We reserve the right to terminate or suspend your account at any time, with or without
            cause or notice, for any reason including violation of these Terms of Service.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Disclaimer</Text>
          <Text style={styles.sectionText}>
            The materials on Gobia are provided on an 'as is' basis. We make no warranties,
            expressed or implied, and hereby disclaim all other warranties including implied
            warranties of merchantability or fitness for a particular purpose.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Contact</Text>
          <Text style={styles.sectionText}>
            If you have any questions about these Terms of Service, please contact us through the
            Help & Support section in the app.
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
  lastUpdated: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 24,
    fontStyle: 'italic',
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
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginLeft: 16,
    marginBottom: 4,
  },
});

