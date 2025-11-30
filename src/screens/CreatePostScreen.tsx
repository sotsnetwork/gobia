import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

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

export default function CreatePostScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [text, setText] = useState('I am building an AI app and I would love to connect with @');
  const [characterCount, setCharacterCount] = useState(60);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [showMentions, setShowMentions] = useState(true);
  const [mentionQuery, setMentionQuery] = useState('');

  // Sample users for mentions
  const suggestedUsers: User[] = [
    { id: '1', name: 'SarahDayan', handle: 'sdayan' },
    { id: '2', name: 'JohnDoe', handle: 'john' },
    { id: '3', name: 'JaneSmith', handle: 'jane_smith' },
  ];

  const handleTextChange = (value: string) => {
    setText(value);
    setCharacterCount(280 - value.length);

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
      setText(newText);
      setCharacterCount(280 - newText.length);
      setShowMentions(false);
      setMentionQuery('');
    }
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
            <TouchableOpacity style={styles.saveDraftButton}>
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
          <View style={styles.postContent}>
            <View style={styles.avatar} />
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="What are you working on?"
              value={text}
              onChangeText={handleTextChange}
              placeholderTextColor={Colors.textLight}
            />
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

          {/* Action Bar */}
          <View style={styles.actionBar}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="image-outline" size={24} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="videocam-outline" size={24} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="link-outline" size={24} color={Colors.primary} />
            </TouchableOpacity>
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
  textInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
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

