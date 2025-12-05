import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Modal, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';
import * as DraftService from '../services/draftService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RoutePropType = RouteProp<RootStackParamList, 'CreatePost'>;

interface Community {
  id: string;
  name: string;
  description?: string;
  members?: number;
  icon?: string;
}

interface User {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
}

interface MediaFile {
  uri: string;
  type: 'image' | 'video';
  size: number; // in bytes
  name?: string;
}

interface ThreadPost {
  id: string;
  text: string;
  media: MediaFile[];
  characterCount: number;
}

const SKILL_TAGS = [
  'Frontend',
  'Backend',
  'Mobile',
  'UI/UX Design',
  'Product',
  'Data / AI',
  'DevOps',
  'No‑code',
  'Marketing / Growth',
  'Community',
  'Content',
];

export default function CreatePostScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const draftParam = route.params?.draft;
  
  const [isThread, setIsThread] = useState(() => {
    return draftParam?.threadPosts && draftParam.threadPosts.length > 1;
  });
  const [draftId] = useState(() => draftParam?.id || `draft_${Date.now()}`);
  const [threadPosts, setThreadPosts] = useState<ThreadPost[]>(() => {
    if (draftParam) {
      if (draftParam.threadPosts && draftParam.threadPosts.length > 1) {
        return draftParam.threadPosts.map((tp: any) => ({
          id: tp.id || Date.now().toString(),
          text: tp.text || '',
          media: tp.media || [],
          characterCount: tp.characterCount || 280 - (tp.text?.length || 0),
        }));
      }
      return [{
        id: '1',
        text: draftParam.text || '',
        media: draftParam.media || [],
        characterCount: draftParam.characterCount || 280 - (draftParam.text?.length || 0),
      }];
    }
    return [{
      id: '1',
      text: '',
      media: [],
      characterCount: 280,
    }];
  });
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(() => {
    if (draftParam?.communityId && draftParam?.communityName) {
      return {
        id: draftParam.communityId,
        name: draftParam.communityName,
      };
    }
    return null;
  });
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(() => draftParam?.selectedSkills || []);

  const currentPost = threadPosts[currentPostIndex];
  const text = currentPost.text;
  const characterCount = currentPost.characterCount;
  const media = currentPost.media;

  // Sample users for mentions
  const suggestedUsers: User[] = [
    { id: '1', name: 'SarahDayan', handle: 'sdayan' },
    { id: '2', name: 'JohnDoe', handle: 'john' },
    { id: '3', name: 'JaneSmith', handle: 'jane_smith' },
  ];

  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB in bytes

  const handleTextChange = (value: string) => {
    const updatedPosts = [...threadPosts];
    updatedPosts[currentPostIndex] = {
      ...updatedPosts[currentPostIndex],
      text: value,
      characterCount: 280 - value.length,
    };
    setThreadPosts(updatedPosts);

    // Check if user is typing '@' for mentions
    const lastAtIndex = value.lastIndexOf('@');
    if (lastAtIndex !== -1) {
      const afterAt = value.substring(lastAtIndex + 1);
      // Check if there's a space after @ (meaning mention is complete) or if it's the last character
      if (afterAt.includes(' ') || afterAt.length === 0) {
        setShowMentions(true);
        setMentionQuery('');
      } else {
        // User is typing after @, filter suggestions
        setShowMentions(true);
        setMentionQuery(afterAt.toLowerCase());
      }
    } else {
      setShowMentions(false);
      setMentionQuery('');
    }
  };

  const handleMentionSelect = (user: User) => {
    const lastAtIndex = text.lastIndexOf('@');
    if (lastAtIndex !== -1) {
      const beforeAt = text.substring(0, lastAtIndex);
      const afterAt = text.substring(lastAtIndex + 1);
      const spaceIndex = afterAt.indexOf(' ');
      const afterMention = spaceIndex !== -1 ? afterAt.substring(spaceIndex) : ' ';
      
      const newText = `${beforeAt}@${user.handle}${afterMention}`;
      const updatedPosts = [...threadPosts];
      updatedPosts[currentPostIndex] = {
        ...updatedPosts[currentPostIndex],
        text: newText,
        characterCount: 280 - newText.length,
      };
      setThreadPosts(updatedPosts);
      setShowMentions(false);
      setMentionQuery('');
    }
  };

  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera roll permissions to add images.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets) {
        const newMedia: MediaFile[] = result.assets
          .filter((asset) => {
            const size = asset.fileSize || 0;
            if (size > MAX_FILE_SIZE) {
              Alert.alert('File too large', `${asset.fileName || 'File'} is larger than 100MB. Please choose a smaller file.`);
              return false;
            }
            return true;
          })
          .map((asset) => ({
            uri: asset.uri,
            type: 'image' as const,
            size: asset.fileSize || 0,
            name: asset.fileName,
          }));

        if (newMedia.length > 0) {
          const updatedPosts = [...threadPosts];
          updatedPosts[currentPostIndex] = {
            ...updatedPosts[currentPostIndex],
            media: [...updatedPosts[currentPostIndex].media, ...newMedia],
          };
          setThreadPosts(updatedPosts);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handlePickVideo = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera roll permissions to add videos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsMultipleSelection: true,
        videoQuality: ImagePicker.VideoQuality.Medium,
      });

      if (!result.canceled && result.assets) {
        const newMedia: MediaFile[] = result.assets
          .filter((asset) => {
            const size = asset.fileSize || 0;
            if (size > MAX_FILE_SIZE) {
              Alert.alert('File too large', `${asset.fileName || 'File'} is larger than 100MB. Please choose a smaller file.`);
              return false;
            }
            return true;
          })
          .map((asset) => ({
            uri: asset.uri,
            type: 'video' as const,
            size: asset.fileSize || 0,
            name: asset.fileName,
          }));

        if (newMedia.length > 0) {
          const updatedPosts = [...threadPosts];
          updatedPosts[currentPostIndex] = {
            ...updatedPosts[currentPostIndex],
            media: [...updatedPosts[currentPostIndex].media, ...newMedia],
          };
          setThreadPosts(updatedPosts);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick video. Please try again.');
    }
  };

  const handleRemoveMedia = (index: number) => {
    const updatedPosts = [...threadPosts];
    updatedPosts[currentPostIndex] = {
      ...updatedPosts[currentPostIndex],
      media: updatedPosts[currentPostIndex].media.filter((_, i) => i !== index),
    };
    setThreadPosts(updatedPosts);
  };

  const handleAddThreadPost = () => {
    const newPost: ThreadPost = {
      id: Date.now().toString(),
      text: '',
      media: [],
      characterCount: 280,
    };
    setThreadPosts([...threadPosts, newPost]);
    setCurrentPostIndex(threadPosts.length);
    setIsThread(true);
  };

  const handleRemoveThreadPost = (index: number) => {
    if (threadPosts.length === 1) {
      Alert.alert('Cannot remove', 'You must have at least one post in the thread.');
      return;
    }
    const updatedPosts = threadPosts.filter((_, i) => i !== index);
    setThreadPosts(updatedPosts);
    if (currentPostIndex >= updatedPosts.length) {
      setCurrentPostIndex(updatedPosts.length - 1);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Filter users based on mention query
  const filteredUsers = mentionQuery
    ? suggestedUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(mentionQuery) ||
          user.handle.toLowerCase().includes(mentionQuery)
      )
    : suggestedUsers;

  // Sample user communities/groups
  const userCommunities: Community[] = [
    {
      id: '1',
      name: 'AI Builders',
      description: 'Building AI-powered applications',
      members: 234,
      icon: '🤖',
    },
    {
      id: '2',
      name: 'React Native Developers',
      description: 'Mobile app development with React Native',
      members: 1245,
      icon: '⚛️',
    },
    {
      id: '3',
      name: 'Startup Founders',
      description: 'Founders sharing experiences',
      members: 567,
      icon: '🚀',
    },
  ];

  const hasAnyContent = threadPosts.some(
    (post) => post.text.trim().length > 0 || post.media.length > 0
  );

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color={Colors.text} />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[
                styles.saveDraftButton,
                !hasAnyContent && styles.saveDraftButtonDisabled,
              ]}
              disabled={!hasAnyContent}
              onPress={async () => {
                if (!hasAnyContent) return;
                try {
                  const draft: DraftService.Draft = {
                    id: draftId,
                    text: threadPosts[0].text,
                    media: threadPosts[0].media,
                    timestamp: new Date().toISOString(),
                    characterCount: threadPosts[0].characterCount,
                    threadPosts: isThread && threadPosts.length > 1 ? threadPosts : undefined,
                    selectedSkills: selectedSkills.length > 0 ? selectedSkills : undefined,
                    communityId: selectedCommunity?.id,
                    communityName: selectedCommunity?.name,
                  };
                  await DraftService.saveDraft(draft);
                  Alert.alert('Draft saved', 'Your post has been saved as a draft.');
                } catch (error) {
                  Alert.alert('Error', 'Failed to save draft. Please try again.');
                }
              }}
            >
              <Text style={styles.saveDraftText}>Save Draft</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.postButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Thread Posts */}
          {isThread && threadPosts.length > 1 && (
            <View style={styles.threadHeader}>
              <Text style={styles.threadTitle}>Thread ({threadPosts.length} posts)</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.threadTabs}>
                {threadPosts.map((post, index) => (
                  <TouchableOpacity
                    key={post.id}
                    style={[
                      styles.threadTab,
                      currentPostIndex === index && styles.threadTabActive,
                    ]}
                    onPress={() => setCurrentPostIndex(index)}
                  >
                    <Text
                      style={[
                        styles.threadTabText,
                        currentPostIndex === index && styles.threadTabTextActive,
                      ]}
                    >
                      {index + 1}
                    </Text>
                    {threadPosts.length > 1 && (
                      <TouchableOpacity
                        onPress={() => handleRemoveThreadPost(index)}
                        style={styles.removeThreadButton}
                      >
                        <Ionicons name="close-circle" size={16} color={Colors.error} />
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={styles.addThreadButton}
                  onPress={handleAddThreadPost}
                >
                  <Ionicons name="add" size={20} color={Colors.primary} />
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}

          <View style={styles.postContent}>
            <View style={styles.avatar} />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                multiline
                placeholder="What are you working on?"
                value={text}
                onChangeText={handleTextChange}
                placeholderTextColor={Colors.textLight}
              />
              {/* Media Previews */}
              {media.length > 0 && (
                <View style={styles.mediaContainer}>
                  {media.map((file, index) => (
                    <View key={index} style={styles.mediaItem}>
                      {file.type === 'image' ? (
                        <Image source={{ uri: file.uri }} style={styles.mediaPreview} />
                      ) : (
                        <View style={styles.videoPreview}>
                          <Ionicons name="videocam" size={32} color={Colors.white} />
                        </View>
                      )}
                      <TouchableOpacity
                        style={styles.removeMediaButton}
                        onPress={() => handleRemoveMedia(index)}
                      >
                        <Ionicons name="close-circle" size={24} color={Colors.error} />
                      </TouchableOpacity>
                      <View style={styles.mediaInfo}>
                        <Text style={styles.mediaSize}>{formatFileSize(file.size)}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Mention Suggestions - Show when '@' is typed */}
          {showMentions && filteredUsers.length > 0 && (
            <View style={styles.suggestionsCard}>
              <Text style={styles.suggestionsTitle}>Mention someone</Text>
              {filteredUsers.map((user) => (
                <TouchableOpacity
                  key={user.id}
                  style={styles.suggestionItem}
                  onPress={() => handleMentionSelect(user)}
                >
                  <View style={styles.suggestionAvatar} />
                  <View style={styles.suggestionInfo}>
                    <Text style={styles.suggestionName}>{user.name}</Text>
                    <Text style={styles.suggestionHandle}>@{user.handle}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Attach Community/Group */}
          <View style={styles.attachSection}>
            <Text style={styles.attachLabel}>Attach to Community/Group</Text>
            <Text style={styles.attachSubtext}>
              Share this post with a specific community or group to invite people to join what you're building
            </Text>
            {selectedCommunity ? (
              <TouchableOpacity
                style={styles.selectedCommunity}
                onPress={() => setShowCommunityModal(true)}
              >
                <View style={styles.communityIcon}>
                  {selectedCommunity.icon ? (
                    <Text style={styles.iconEmoji}>{selectedCommunity.icon}</Text>
                  ) : (
                    <Ionicons name="people" size={20} color={Colors.primary} />
                  )}
                </View>
                <View style={styles.communityInfo}>
                  <Text style={styles.communityName}>{selectedCommunity.name}</Text>
                  {selectedCommunity.members && (
                    <Text style={styles.communityMembers}>
                      {selectedCommunity.members} members
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => setSelectedCommunity(null)}
                  style={styles.removeButton}
                >
                  <Ionicons name="close-circle" size={24} color={Colors.error} />
                </TouchableOpacity>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.attachButton}
                onPress={() => setShowCommunityModal(true)}
              >
                <Ionicons name="people-outline" size={20} color={Colors.primary} />
                <Text style={styles.attachButtonText}>Select Community or Group</Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.createCommunityButton}
              onPress={() => {
                Alert.alert(
                  'Create Community',
                  'Would you like to create a new community or group?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Create',
                      onPress: () => {
                        navigation.navigate('CreateCommunity');
                      },
                    },
                  ]
                );
              }}
            >
              <Ionicons name="add-circle-outline" size={20} color={Colors.primary} />
              <Text style={styles.createCommunityText}>Create New Community</Text>
            </TouchableOpacity>
          </View>

          {/* Skills Needed */}
          <View style={styles.skillsSection}>
            <Text style={styles.skillsLabel}>Skills needed (optional)</Text>
            <Text style={styles.skillsSubtext}>
              Highlight the skills you’re looking for so the right collaborators can find your project.
            </Text>
            <View style={styles.skillsChipsContainer}>
              {SKILL_TAGS.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <TouchableOpacity
                    key={skill}
                    style={[
                      styles.skillChip,
                      isSelected && styles.skillChipSelected,
                    ]}
                    onPress={() => toggleSkill(skill)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.skillChipText,
                        isSelected && styles.skillChipTextSelected,
                      ]}
                    >
                      {skill}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Thread Toggle */}
          <View style={styles.threadToggle}>
            <TouchableOpacity
              style={[styles.threadToggleButton, isThread && styles.threadToggleActive]}
              onPress={() => {
                if (!isThread) {
                  setIsThread(true);
                } else {
                  Alert.alert(
                    'Remove Thread',
                    'Are you sure you want to convert this to a single post? All additional posts will be removed.',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Remove',
                        style: 'destructive',
                        onPress: () => {
                          setIsThread(false);
                          setThreadPosts([threadPosts[0]]);
                          setCurrentPostIndex(0);
                        },
                      },
                    ]
                  );
                }
              }}
            >
              <Ionicons
                name={isThread ? 'layers' : 'layers-outline'}
                size={20}
                color={isThread ? Colors.white : Colors.primary}
              />
              <Text
                style={[
                  styles.threadToggleText,
                  isThread && styles.threadToggleTextActive,
                ]}
              >
                {isThread ? 'Thread' : 'Create Thread'}
              </Text>
            </TouchableOpacity>
            {isThread && (
              <TouchableOpacity
                style={styles.addPostButton}
                onPress={handleAddThreadPost}
              >
                <Ionicons name="add" size={20} color={Colors.primary} />
                <Text style={styles.addPostText}>Add Post</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Action Bar */}
          <View style={styles.actionBar}>
            <TouchableOpacity style={styles.actionButton} onPress={handlePickImage}>
              <Ionicons name="image-outline" size={24} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handlePickVideo}>
              <Ionicons name="videocam-outline" size={24} color={Colors.primary} />
            </TouchableOpacity>
            {media.length > 0 && (
              <Text style={styles.mediaCount}>
                {media.length} {media.length === 1 ? 'file' : 'files'}
              </Text>
            )}
            <View style={styles.characterCount}>
              <Text style={styles.characterCountText}>{characterCount}/280</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Community Selection Modal */}
      <Modal
        visible={showCommunityModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCommunityModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Community or Group</Text>
              <TouchableOpacity onPress={() => setShowCommunityModal(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {userCommunities.map((community) => (
                <TouchableOpacity
                  key={community.id}
                  style={styles.communityOption}
                  onPress={() => {
                    setSelectedCommunity(community);
                    setShowCommunityModal(false);
                  }}
                >
                  <View style={styles.communityOptionIcon}>
                    {community.icon ? (
                      <Text style={styles.optionIconEmoji}>{community.icon}</Text>
                    ) : (
                      <Ionicons name="people" size={24} color={Colors.primary} />
                    )}
                  </View>
                  <View style={styles.communityOptionInfo}>
                    <Text style={styles.communityOptionName}>{community.name}</Text>
                    {community.description && (
                      <Text style={styles.communityOptionDescription}>
                        {community.description}
                      </Text>
                    )}
                    {community.members && (
                      <View style={styles.communityOptionFooter}>
                        <Ionicons name="people-outline" size={14} color={Colors.textLight} />
                        <Text style={styles.communityOptionMembers}>
                          {community.members} members
                        </Text>
                      </View>
                    )}
                  </View>
                  {selectedCommunity?.id === community.id && (
                    <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.createNewOption}
                onPress={() => {
                  setShowCommunityModal(false);
                  navigation.navigate('CreateCommunity');
                }}
              >
                <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
                <Text style={styles.createNewText}>Create New Community</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  saveDraftButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  saveDraftButtonDisabled: {
    opacity: 0.4,
  },
  saveDraftText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  postButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  postButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  postContent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    marginRight: 12,
  },
  inputContainer: {
    flex: 1,
  },
  textInput: {
    fontSize: 16,
    color: Colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  mediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  mediaItem: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  mediaPreview: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.borderLight,
  },
  videoPreview: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeMediaButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
  mediaInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  mediaSize: {
    fontSize: 10,
    color: Colors.white,
    textAlign: 'center',
  },
  threadHeader: {
    marginBottom: 16,
  },
  threadTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  threadTabs: {
    flexDirection: 'row',
    gap: 8,
  },
  threadTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    gap: 6,
  },
  threadTabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  threadTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  threadTabTextActive: {
    color: Colors.white,
  },
  removeThreadButton: {
    marginLeft: 4,
  },
  addThreadButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  threadToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  threadToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    gap: 6,
  },
  threadToggleActive: {
    backgroundColor: Colors.primary,
  },
  threadToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  threadToggleTextActive: {
    color: Colors.white,
  },
  addPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    gap: 6,
  },
  addPostText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  mediaCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  suggestionsCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  suggestionAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.borderLight,
    marginRight: 12,
  },
  suggestionInfo: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  suggestionHandle: {
    fontSize: 14,
    color: Colors.textLight,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
  characterCount: {
    marginLeft: 'auto',
  },
  characterCountText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  attachSection: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  attachLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  attachSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight,
    gap: 8,
  },
  attachButtonText: {
    flex: 1,
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  selectedCommunity: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: 12,
  },
  communityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 20,
  },
  communityInfo: {
    flex: 1,
  },
  communityName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  communityMembers: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  removeButton: {
    padding: 4,
  },
  createCommunityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    gap: 8,
  },
  createCommunityText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  skillsSection: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  skillsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  skillsSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  skillsChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  skillChipSelected: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  skillChipText: {
    fontSize: 13,
    color: Colors.text,
  },
  skillChipTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  modalScrollView: {
    maxHeight: 400,
  },
  communityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    gap: 12,
  },
  communityOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIconEmoji: {
    fontSize: 24,
  },
  communityOptionInfo: {
    flex: 1,
  },
  communityOptionName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  communityOptionDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  communityOptionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  communityOptionMembers: {
    fontSize: 12,
    color: Colors.textLight,
  },
  createNewOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  createNewText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
  },
});

