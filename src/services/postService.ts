import AsyncStorage from '@react-native-async-storage/async-storage';

const DELETED_POSTS_KEY = '@gobia_deleted_posts';
const ARCHIVED_POSTS_KEY = '@gobia_archived_posts';

export interface Post {
  id: string;
  name: string;
  handle: string;
  text: string;
  timestamp?: string;
  time?: string;
  likes?: number;
  comments?: number;
  reposts?: number;
  views?: number;
  saved?: boolean;
  userId?: string;
}

export async function deletePost(postId: string): Promise<void> {
  try {
    const deleted = await getDeletedPosts();
    if (!deleted.includes(postId)) {
      deleted.push(postId);
      await AsyncStorage.setItem(DELETED_POSTS_KEY, JSON.stringify(deleted));
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

export async function getDeletedPosts(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(DELETED_POSTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting deleted posts:', error);
    return [];
  }
}

export async function isPostDeleted(postId: string): Promise<boolean> {
  try {
    const deleted = await getDeletedPosts();
    return deleted.includes(postId);
  } catch (error) {
    console.error('Error checking if post is deleted:', error);
    return false;
  }
}

export async function archivePost(postId: string): Promise<void> {
  try {
    const archived = await getArchivedPosts();
    if (!archived.includes(postId)) {
      archived.push(postId);
      await AsyncStorage.setItem(ARCHIVED_POSTS_KEY, JSON.stringify(archived));
    }
  } catch (error) {
    console.error('Error archiving post:', error);
    throw error;
  }
}

export async function unarchivePost(postId: string): Promise<void> {
  try {
    const archived = await getArchivedPosts();
    const filtered = archived.filter((id) => id !== postId);
    await AsyncStorage.setItem(ARCHIVED_POSTS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error unarchiving post:', error);
    throw error;
  }
}

export async function getArchivedPosts(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(ARCHIVED_POSTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting archived posts:', error);
    return [];
  }
}

export async function isPostArchived(postId: string): Promise<boolean> {
  try {
    const archived = await getArchivedPosts();
    return archived.includes(postId);
  } catch (error) {
    console.error('Error checking if post is archived:', error);
    return false;
  }
}

