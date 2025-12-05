import AsyncStorage from '@react-native-async-storage/async-storage';

const DRAFTS_KEY = '@gobia_drafts';

export interface Draft {
  id: string;
  text: string;
  media?: Array<{
    uri: string;
    type: 'image' | 'video';
    size: number;
    name?: string;
  }>;
  timestamp: string;
  characterCount: number;
  threadPosts?: Array<{
    id: string;
    text: string;
    media: Array<{
      uri: string;
      type: 'image' | 'video';
      size: number;
      name?: string;
    }>;
    characterCount: number;
  }>;
  selectedSkills?: string[];
  communityId?: string;
  communityName?: string;
}

export async function saveDraft(draft: Draft): Promise<void> {
  try {
    const drafts = await getDrafts();
    const existingIndex = drafts.findIndex((d) => d.id === draft.id);
    
    if (existingIndex !== -1) {
      // Update existing draft
      drafts[existingIndex] = draft;
    } else {
      // Add new draft
      drafts.unshift(draft);
    }
    
    await AsyncStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  } catch (error) {
    console.error('Error saving draft:', error);
    throw error;
  }
}

export async function getDrafts(): Promise<Draft[]> {
  try {
    const data = await AsyncStorage.getItem(DRAFTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting drafts:', error);
    return [];
  }
}

export async function deleteDraft(draftId: string): Promise<void> {
  try {
    const drafts = await getDrafts();
    const filtered = drafts.filter((d) => d.id !== draftId);
    await AsyncStorage.setItem(DRAFTS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting draft:', error);
    throw error;
  }
}

export async function getDraft(draftId: string): Promise<Draft | null> {
  try {
    const drafts = await getDrafts();
    return drafts.find((d) => d.id === draftId) || null;
  } catch (error) {
    console.error('Error getting draft:', error);
    return null;
  }
}

