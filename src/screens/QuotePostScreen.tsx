import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RoutePropType = RouteProp<RootStackParamList, 'QuotePost'>;

export default function QuotePostScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { post, reply } = route.params || {};
  const [quoteText, setQuoteText] = useState('');
  const [posting, setPosting] = useState(false);

  const quotedContent = post || reply;

  const handlePost = () => {
    if (!quoteText.trim()) {
      Alert.alert('Error', 'Please add your quote text');
      return;
    }
    setPosting(true);
    // Simulate API call
    setTimeout(() => {
      setPosting(false);
      Alert.alert('Success', 'Your quote post has been published!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quote {post ? 'Post' : 'Reply'}</Text>
        <TouchableOpacity onPress={handlePost} disabled={posting || !quoteText.trim()}>
          <Text style={[styles.postButton, (!quoteText.trim() || posting) && styles.postButtonDisabled]}>
            {posting ? 'Posting...' : 'Post'}
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.quoteSection}>
            <Text style={styles.quoteLabel}>Add your thoughts</Text>
            <TextInput
              style={styles.quoteInput}
              placeholder="What are your thoughts?"
              placeholderTextColor={Colors.textLight}
              value={quoteText}
              onChangeText={setQuoteText}
              multiline
              maxLength={280}
              textAlignVertical="top"
            />
            <Text style={styles.characterCount}>{quoteText.length}/280</Text>
          </View>

          <View style={styles.quotedPost}>
            <View style={styles.quotedHeader}>
              <View style={styles.quotedAvatar} />
              <View style={styles.quotedUserInfo}>
                <Text style={styles.quotedName}>{quotedContent?.name || 'User'}</Text>
                <Text style={styles.quotedHandle}>{quotedContent?.handle || '@user'}</Text>
              </View>
            </View>
            <Text style={styles.quotedText}>{quotedContent?.text || 'Original post content'}</Text>
            {quotedContent?.timestamp && (
              <Text style={styles.quotedTimestamp}>{quotedContent.timestamp}</Text>
            )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  postButton: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  quoteSection: {
    marginBottom: 24,
  },
  quoteLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  quoteInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.white,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'right',
    marginTop: 4,
  },
  quotedPost: {
    backgroundColor: Colors.backgroundLight,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  quotedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  quotedAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    marginRight: 12,
  },
  quotedUserInfo: {
    flex: 1,
  },
  quotedName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  quotedHandle: {
    fontSize: 12,
    color: Colors.textLight,
  },
  quotedText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  quotedTimestamp: {
    fontSize: 12,
    color: Colors.textLight,
  },
});

