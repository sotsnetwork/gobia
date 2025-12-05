import AsyncStorage from '@react-native-async-storage/async-storage';

const JOINED_COMMUNITIES_KEY = '@gobia_joined_communities';

export interface Community {
  id: string;
  name: string;
  description?: string;
  members: number;
  icon?: string;
  category?: 'location' | 'interest';
  location?: string;
}

export async function joinCommunity(communityId: string): Promise<void> {
  try {
    const joined = await getJoinedCommunities();
    if (!joined.includes(communityId)) {
      joined.push(communityId);
      await AsyncStorage.setItem(JOINED_COMMUNITIES_KEY, JSON.stringify(joined));
    }
  } catch (error) {
    console.error('Error joining community:', error);
    throw error;
  }
}

export async function leaveCommunity(communityId: string): Promise<void> {
  try {
    const joined = await getJoinedCommunities();
    const filtered = joined.filter((id) => id !== communityId);
    await AsyncStorage.setItem(JOINED_COMMUNITIES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error leaving community:', error);
    throw error;
  }
}

export async function getJoinedCommunities(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(JOINED_COMMUNITIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting joined communities:', error);
    return [];
  }
}

export async function isJoined(communityId: string): Promise<boolean> {
  try {
    const joined = await getJoinedCommunities();
    return joined.includes(communityId);
  } catch (error) {
    console.error('Error checking if joined:', error);
    return false;
  }
}

