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

interface Draft {
  id: string;
  text: string;
  timestamp: string;
  characterCount: number;
}

const sampleDrafts: Draft[] = [
  {
    id: '1',
    text: 'I am building an AI app and I would love to connect with @',
    timestamp: '2 hours ago',
    characterCount: 60,
  },
  {
    id: '2',
    text: 'Just finished a major update to my project. Here are the key features:\n\n1. Real-time collaboration\n2. Advanced analytics\n3. Custom integrations',
    timestamp: '1 day ago',
    characterCount: 145,
  },
  {
    id: '3',
    text: 'Looking for feedback on my new SaaS product. Would appreciate any thoughts!',
    timestamp: '3 days ago',
    characterCount: 78,
  },
];

export default function DraftsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [drafts, setDrafts] = useState<Draft[]>(sampleDrafts);

  const handleDelete = (draftId: string) => {
    Alert.alert('Delete Draft', 'Are you sure you want to delete this draft?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setDrafts(drafts.filter((d) => d.id !== draftId)),
      },
    ]);
  };

  const handleEdit = (draft: Draft) => {
    navigation.navigate('CreatePost');
    // In real app, would pass draft data to CreatePost screen
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Drafts" />
      <ScrollView style={styles.scrollView}>
        {drafts.length > 0 ? (
          drafts.map((draft) => (
            <View key={draft.id} style={styles.draft}>
              <TouchableOpacity
                style={styles.draftContent}
                onPress={() => handleEdit(draft)}
                activeOpacity={0.7}
              >
                <Text style={styles.draftText} numberOfLines={3}>
                  {draft.text}
                </Text>
                <View style={styles.draftFooter}>
                  <Text style={styles.draftTimestamp}>{draft.timestamp}</Text>
                  <Text style={styles.draftCount}>{draft.characterCount} characters</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(draft.id)}
              >
                <Ionicons name="trash-outline" size={20} color={Colors.error} />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>No drafts</Text>
            <Text style={styles.emptyText}>
              Drafts you save while creating posts will appear here.
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
  draft: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginBottom: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
  },
  draftContent: {
    flex: 1,
    padding: 16,
  },
  draftText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },
  draftFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  draftTimestamp: {
    fontSize: 12,
    color: Colors.textLight,
  },
  draftCount: {
    fontSize: 12,
    color: Colors.textSecondary,
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

