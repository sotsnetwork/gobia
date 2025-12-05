import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = '@gobia_settings';

export interface AppSettings {
  notifications: {
    likes: boolean;
    comments: boolean;
    follows: boolean;
    mentions: boolean;
    reposts: boolean;
  };
  privacy: {
    showEmail: boolean;
    showLocation: boolean;
    allowMessages: boolean;
    allowMentions: boolean;
  };
  display: {
    theme: 'light' | 'dark' | 'auto';
    fontSize: 'small' | 'medium' | 'large';
    reduceMotion: boolean;
  };
  language: string;
}

const defaultSettings: AppSettings = {
  notifications: {
    likes: true,
    comments: true,
    follows: true,
    mentions: true,
    reposts: true,
  },
  privacy: {
    showEmail: false,
    showLocation: true,
    allowMessages: true,
    allowMentions: true,
  },
  display: {
    theme: 'light',
    fontSize: 'medium',
    reduceMotion: false,
  },
  language: 'en',
};

export async function getSettings(): Promise<AppSettings> {
  try {
    const data = await AsyncStorage.getItem(SETTINGS_KEY);
    if (data) {
      const saved = JSON.parse(data);
      return { ...defaultSettings, ...saved };
    }
    return defaultSettings;
  } catch (error) {
    console.error('Error getting settings:', error);
    return defaultSettings;
  }
}

export async function saveSettings(settings: Partial<AppSettings>): Promise<void> {
  try {
    const current = await getSettings();
    const updated = { ...current, ...settings };
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving settings:', error);
    throw error;
  }
}

export async function updateNotificationSettings(notifications: Partial<AppSettings['notifications']>): Promise<void> {
  try {
    const current = await getSettings();
    await saveSettings({
      notifications: { ...current.notifications, ...notifications },
    });
  } catch (error) {
    console.error('Error updating notification settings:', error);
    throw error;
  }
}

export async function updatePrivacySettings(privacy: Partial<AppSettings['privacy']>): Promise<void> {
  try {
    const current = await getSettings();
    await saveSettings({
      privacy: { ...current.privacy, ...privacy },
    });
  } catch (error) {
    console.error('Error updating privacy settings:', error);
    throw error;
  }
}

export async function updateDisplaySettings(display: Partial<AppSettings['display']>): Promise<void> {
  try {
    const current = await getSettings();
    await saveSettings({
      display: { ...current.display, ...display },
    });
  } catch (error) {
    console.error('Error updating display settings:', error);
    throw error;
  }
}

export async function updateLanguage(language: string): Promise<void> {
  try {
    await saveSettings({ language });
  } catch (error) {
    console.error('Error updating language:', error);
    throw error;
  }
}

