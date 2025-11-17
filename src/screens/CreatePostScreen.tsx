import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CreatePostScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [text, setText] = useState('I am building an AI app and I would love to connect with @');
  const [characterCount, setCharacterCount] = useState(60);

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
              onChangeText={(value) => {
                setText(value);
                setCharacterCount(280 - value.length);
              }}
              placeholderTextColor={Colors.textLight}
            />
          </View>

          {/* Mention Suggestions */}
          <View style={styles.suggestionsCard}>
            <View style={styles.suggestionItem}>
              <View style={styles.suggestionAvatar} />
              <View style={styles.suggestionInfo}>
                <Text style={styles.suggestionName}>SarahDayan</Text>
                <Text style={styles.suggestionHandle}>@sdayan</Text>
              </View>
            </View>
            <View style={styles.suggestionItem}>
              <View style={styles.suggestionAvatar} />
              <View style={styles.suggestionInfo}>
                <Text style={styles.suggestionName}>JohnDoe</Text>
                <Text style={styles.suggestionHandle}>@john</Text>
              </View>
            </View>
            <View style={styles.suggestionItem}>
              <View style={styles.suggestionAvatar} />
              <View style={styles.suggestionInfo}>
                <Text style={styles.suggestionName}>JaneSmith</Text>
                <Text style={styles.suggestionHandle}>@jane_smith</Text>
              </View>
            </View>
          </View>

          {/* Hashtag Suggestions */}
          <View style={styles.hashtagsContainer}>
            <TouchableOpacity style={styles.hashtag}>
              <Text style={styles.hashtagText}># AI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hashtag}>
              <Text style={styles.hashtagText}># Web3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hashtag}>
              <Text style={styles.hashtagText}># Design</Text>
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
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="pricetag-outline" size={24} color={Colors.primary} />
            </TouchableOpacity>
            <View style={styles.characterCount}>
              <Text style={styles.characterCountText}>{characterCount}/280</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  hashtag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  hashtagText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
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
});

