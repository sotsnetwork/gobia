import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = '@gobia_profile';

export interface ProfileData {
  name: string;
  username: string;
  bio: string;
  location?: string;
  website?: string;
  avatarUri?: string; // URI of the profile picture
}

export async function saveProfile(profile: ProfileData): Promise<void> {
  try {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
  }
}

export async function getProfile(): Promise<ProfileData | null> {
  try {
    const data = await AsyncStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading profile:', error);
    return null;
  }
}


