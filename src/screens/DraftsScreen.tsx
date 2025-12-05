import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';
import * as DraftService from '../services/draftService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function DraftsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [drafts, setDrafts] = useState<DraftService.Draft[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadDrafts = async () => {
    try {
      const loadedDrafts = await DraftService.getDrafts();
      setDrafts(loadedDrafts);
    } catch (error) {
      console.error('Error loading drafts:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadDrafts();
    }, [])
  );

  const handleDelete = async (draftId: string) => {
    Alert.alert('Delete Draft', 'Are you sure you want to delete this draft?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await DraftService.deleteDraft(draftId);
            await loadDrafts();
          } catch (error) {
            Alert.alert('Error', 'Failed to delete draft. Please try again.');
          }
        },
      },
    ]);
  };

  const handleEdit = (draft: DraftService.Draft) => {
    navigation.navigate('CreatePost', { draft });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    return date.toLocaleDateString();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDrafts();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Drafts" />
      <ScrollView 
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {drafts.length > 0 ? (
          drafts.map((draft) => (
            <View key={draft.id} style={styles.draft}>
              <TouchableOpacity
                style={styles.draftContent}
                onPress={() => handleEdit(draft)}
                activeOpacity={0.7}
              >
                <Text style={styles.draftText} numberOfLines={3}>
                  {draft.text || '(No text)'}
                </Text>
                {draft.media && draft.media.length > 0 && (
                  <View style={styles.mediaIndicator}>
                    <Ionicons name="image-outline" size={14} color={Colors.textLight} />
                    <Text style={styles.mediaText}>{draft.media.length} {draft.media.length === 1 ? 'media' : 'media'}</Text>
                  </View>
                )}
                {draft.selectedSkills && draft.selectedSkills.length > 0 && (
                  <View style={styles.skillsIndicator}>
                    <Ionicons name="pricetag-outline" size={14} color={Colors.textLight} />
                    <Text style={styles.skillsText}>{draft.selectedSkills.length} {draft.selectedSkills.length === 1 ? 'skill' : 'skills'}</Text>
                  </View>
                )}
                {draft.communityName && (
                  <View style={styles.communityIndicator}>
                    <Ionicons name="people-outline" size={14} color={Colors.textLight} />
                    <Text style={styles.communityText}>{draft.communityName}</Text>
                  </View>
                )}
                {draft.threadPosts && draft.threadPosts.length > 1 && (
                  <View style={styles.threadIndicator}>
                    <Ionicons name="layers-outline" size={14} color={Colors.textLight} />
                    <Text style={styles.threadText}>Thread ({draft.threadPosts.length} posts)</Text>
                  </View>
                )}
                <View style={styles.draftFooter}>
                  <Text style={styles.draftTimestamp}>{formatTimestamp(draft.timestamp)}</Text>
                  <Text style={styles.draftCount}>{280 - draft.characterCount} characters</Text>
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
  mediaIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    marginBottom: 4,
  },
  mediaText: {
    fontSize: 12,
    color: Colors.textLight,
  },
  skillsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    marginBottom: 4,
  },
  skillsText: {
    fontSize: 12,
    color: Colors.textLight,
  },
  communityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    marginBottom: 4,
  },
  communityText: {
    fontSize: 12,
    color: Colors.textLight,
  },
  threadIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    marginBottom: 4,
  },
  threadText: {
    fontSize: 12,
    color: Colors.textLight,
  },
});

