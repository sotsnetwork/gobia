import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = '@gobia_bookmarks';
const BOOKMARKED_COMMENTS_KEY = '@gobia_bookmarked_comments';

export interface BookmarkedPost {
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
  savedAt: string;
}

export interface BookmarkedComment {
  id: string;
  name: string;
  handle: string;
  text: string;
  time?: string;
  timestamp?: string;
  postId?: string;
  postTitle?: string;
  likes?: number;
  reposts?: number;
  savedAt: string;
}

// Posts
export async function savePost(post: any): Promise<void> {
  try {
    const bookmarks = await getBookmarkedPosts();
    const bookmarkedPost: BookmarkedPost = {
      id: post.id,
      name: post.name,
      handle: post.handle,
      text: post.text,
      timestamp: post.timestamp,
      time: post.time,
      likes: post.likes,
      comments: post.comments,
      reposts: post.reposts,
      views: post.views,
      savedAt: new Date().toISOString(),
    };
    
    // Check if already bookmarked
    const existingIndex = bookmarks.findIndex((b) => b.id === post.id);
    if (existingIndex === -1) {
      bookmarks.unshift(bookmarkedPost);
      await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    }
  } catch (error) {
    console.error('Error saving post:', error);
    throw error;
  }
}

export async function removePost(postId: string): Promise<void> {
  try {
    const bookmarks = await getBookmarkedPosts();
    const filtered = bookmarks.filter((b) => b.id !== postId);
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing post:', error);
    throw error;
  }
}

export async function getBookmarkedPosts(): Promise<BookmarkedPost[]> {
  try {
    const data = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting bookmarked posts:', error);
    return [];
  }
}

export async function isPostBookmarked(postId: string): Promise<boolean> {
  try {
    const bookmarks = await getBookmarkedPosts();
    return bookmarks.some((b) => b.id === postId);
  } catch (error) {
    console.error('Error checking if post is bookmarked:', error);
    return false;
  }
}

// Comments
export async function saveComment(comment: any, postId?: string, postTitle?: string): Promise<void> {
  try {
    const bookmarks = await getBookmarkedComments();
    const bookmarkedComment: BookmarkedComment = {
      id: comment.id,
      name: comment.name,
      handle: comment.handle,
      text: comment.text,
      time: comment.time,
      timestamp: comment.timestamp,
      postId: postId || comment.postId,
      postTitle: postTitle || comment.postTitle,
      likes: comment.likes,
      reposts: comment.reposts,
      savedAt: new Date().toISOString(),
    };
    
    // Check if already bookmarked
    const existingIndex = bookmarks.findIndex((b) => b.id === comment.id);
    if (existingIndex === -1) {
      bookmarks.unshift(bookmarkedComment);
      await AsyncStorage.setItem(BOOKMARKED_COMMENTS_KEY, JSON.stringify(bookmarks));
    }
  } catch (error) {
    console.error('Error saving comment:', error);
    throw error;
  }
}

export async function removeComment(commentId: string): Promise<void> {
  try {
    const bookmarks = await getBookmarkedComments();
    const filtered = bookmarks.filter((b) => b.id !== commentId);
    await AsyncStorage.setItem(BOOKMARKED_COMMENTS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing comment:', error);
    throw error;
  }
}

export async function getBookmarkedComments(): Promise<BookmarkedComment[]> {
  try {
    const data = await AsyncStorage.getItem(BOOKMARKED_COMMENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting bookmarked comments:', error);
    return [];
  }
}

export async function isCommentBookmarked(commentId: string): Promise<boolean> {
  try {
    const bookmarks = await getBookmarkedComments();
    return bookmarks.some((b) => b.id === commentId);
  } catch (error) {
    console.error('Error checking if comment is bookmarked:', error);
    return false;
  }
}
