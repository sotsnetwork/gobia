import { useState, useEffect } from 'react';
import * as ProfileService from '../services/profileService';

/**
 * Hook to get the current user's profile picture
 * Returns the avatar URI if available, otherwise returns undefined
 */
export function useUserAvatar(): string | undefined {
  const [avatarUri, setAvatarUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const profile = await ProfileService.getProfile();
        setAvatarUri(profile?.avatarUri);
      } catch (error) {
        console.error('Error loading avatar:', error);
      }
    };

    loadAvatar();
  }, []);

  return avatarUri;
}

/**
 * Get the current user's profile picture synchronously (for use outside components)
 * Note: This will return undefined on first call, use useUserAvatar hook in components
 */
export async function getUserAvatar(): Promise<string | undefined> {
  try {
    const profile = await ProfileService.getProfile();
    return profile?.avatarUri;
  } catch (error) {
    console.error('Error getting avatar:', error);
    return undefined;
  }
}

