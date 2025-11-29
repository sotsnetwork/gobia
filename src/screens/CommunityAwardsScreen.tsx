import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors } from '../constants/colors';

const awards = [
  {
    id: '1',
    title: 'Top Contributor',
    description: 'Most helpful posts this month',
    icon: 'trophy',
    color: Colors.warning,
    recipients: ['Sarah Johnson', 'Mike Davis', 'Elena Martinez'],
  },
  {
    id: '2',
    title: 'Community Builder',
    description: 'Created most active communities',
    icon: 'people',
    color: Colors.primary,
    recipients: ['John Smith', 'Alex Chen'],
  },
  {
    id: '3',
    title: 'Collaboration Champion',
    description: 'Most successful collaborations',
    icon: 'handshake',
    color: Colors.success,
    recipients: ['Emma Wilson'],
  },
];

export default function CommunityAwardsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Community Awards" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.intro}>
          Recognizing outstanding contributions to the Gobia community
        </Text>

        {awards.map((award) => (
          <View key={award.id} style={styles.awardCard}>
            <View style={[styles.awardIcon, { backgroundColor: award.color + '20' }]}>
          <Ionicons name={award.icon as any} size={32} color={award.color} />
        </View>
        <View style={styles.awardInfo}>
          <Text style={styles.awardTitle}>{award.title}</Text>
          <Text style={styles.awardDescription}>{award.description}</Text>
          <View style={styles.recipients}>
            {award.recipients.map((recipient, index) => (
              <View key={index} style={styles.recipient}>
                <View style={styles.recipientAvatar} />
                <Text style={styles.recipientName}>{recipient}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
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
  awardCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  awardIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  awardInfo: {
    flex: 1,
  },
  awardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  awardDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  recipients: {
    gap: 8,
  },
  recipient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recipientAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
  },
  recipientName: {
    fontSize: 14,
    color: Colors.text,
  },
});

