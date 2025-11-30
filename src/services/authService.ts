import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = '@gobia_auth_token';
const USER_DATA_KEY = '@gobia_user_data';
const IS_LOGGED_IN_KEY = '@gobia_is_logged_in';

export interface UserData {
  id: string;
  email: string;
  name?: string;
  handle?: string;
}

// Check if user is logged in
export async function isLoggedIn(): Promise<boolean> {
  try {
    const isLoggedIn = await AsyncStorage.getItem(IS_LOGGED_IN_KEY);
    return isLoggedIn === 'true';
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
}

// Login user
export async function login(userData: UserData, token?: string): Promise<void> {
  try {
    await AsyncStorage.setItem(IS_LOGGED_IN_KEY, 'true');
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    if (token) {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    }
  } catch (error) {
    console.error('Error saving login data:', error);
    throw error;
  }
}

// Logout user
export async function logout(): Promise<void> {
  try {
    await AsyncStorage.removeItem(IS_LOGGED_IN_KEY);
    await AsyncStorage.removeItem(USER_DATA_KEY);
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}

// Get current user data
export async function getUserData(): Promise<UserData | null> {
  try {
    const userData = await AsyncStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
}

// Get auth token
export async function getAuthToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

