import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface PostActionsProps {
  post: {
    id: string;
    name: string;
    handle: string;
    text: string;
    likes?: number;
    comments?: number;
    reposts?: number;
    boosts?: number;
    saved?: boolean;
  };
  onLike?: () => void;
  onComment?: () => void;
  onRepost?: () => void;
  onQuote?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
  showShare?: boolean;
  showRepost?: boolean;
  showQuote?: boolean;
  compact?: boolean;
}

export default function PostActions({
  post,
  onLike,
  onComment,
  onRepost,
  onQuote,
  onBookmark,
  onShare,
  showShare = true,
  showRepost = true,
  showQuote = true,
  compact = false,
}: PostActionsProps) {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [bookmarked, setBookmarked] = useState(post.saved || false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [repostCount, setRepostCount] = useState(post.reposts || post.boosts || 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    onLike?.();
  };

  const handleRepost = () => {
    if (onRepost) {
      onRepost();
    } else {
      setReposted(!reposted);
      setRepostCount(reposted ? repostCount - 1 : repostCount + 1);
      Alert.alert('Reposted', 'This post has been added to your feed');
    }
  };

  const handleQuote = () => {
    if (onQuote) {
      onQuote();
    } else {
      Alert.alert('Quote', 'Quote functionality will open the quote screen');
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark?.();
  };

  const handleShare = async () => {
    if (onShare) {
      onShare();
      return;
    }

    try {
      const shareContent = {
        message: `${post.name} (@${post.handle.replace('@', '')}): ${post.text}\n\nShared from Gobia`,
        title: 'Share Post',
      };

      const result = await Share.share(shareContent);

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share post');
    }
  };

  const iconSize = compact ? 16 : 18;
  const textSize = compact ? 12 : 14;

  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      <TouchableOpacity style={styles.action} onPress={handleLike}>
        <Ionicons
          name={liked ? 'heart' : 'heart-outline'}
          size={iconSize}
          color={liked ? Colors.error : Colors.textLight}
        />
        {likeCount > 0 && (
          <Text style={[styles.actionText, liked && styles.likedText, { fontSize: textSize }]}>
            {likeCount}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.action} onPress={onComment}>
        <Ionicons name="chatbubble-outline" size={iconSize} color={Colors.textLight} />
        {post.comments !== undefined && post.comments > 0 && (
          <Text style={[styles.actionText, { fontSize: textSize }]}>{post.comments}</Text>
        )}
      </TouchableOpacity>

      {showRepost && (
        <TouchableOpacity style={styles.action} onPress={handleRepost}>
          <Ionicons
            name={reposted ? 'repeat' : 'repeat-outline'}
            size={iconSize}
            color={reposted ? Colors.success : Colors.textLight}
          />
          {repostCount > 0 && (
            <Text style={[styles.actionText, reposted && styles.repostedText, { fontSize: textSize }]}>
              {repostCount}
            </Text>
          )}
        </TouchableOpacity>
      )}

      {showQuote && (
        <TouchableOpacity style={styles.action} onPress={handleQuote}>
          <Ionicons name="chatbox-ellipses-outline" size={iconSize} color={Colors.textLight} />
        </TouchableOpacity>
      )}

      {showShare && (
        <TouchableOpacity style={styles.action} onPress={handleShare}>
          <Ionicons name="share-outline" size={iconSize} color={Colors.textLight} />
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.action} onPress={handleBookmark}>
        <Ionicons
          name={bookmarked ? 'bookmark' : 'bookmark-outline'}
          size={iconSize}
          color={bookmarked ? Colors.primary : Colors.textLight}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  compactContainer: {
    gap: 12,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    color: Colors.textLight,
  },
  likedText: {
    color: Colors.error,
  },
  repostedText: {
    color: Colors.success,
  },
});

