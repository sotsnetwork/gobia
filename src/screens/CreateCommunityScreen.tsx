import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Button from '../components/Button';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CreateCommunityScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [creating, setCreating] = useState(false);

  const categories = ['Technology', 'Design', 'Business', 'Education', 'Other'];

  const handleCreate = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a community name');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }
    setCreating(true);
    // Simulate API call
    setTimeout(() => {
      setCreating(false);
      Alert.alert('Success', 'Community created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Create Community" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.iconSection}>
            <View style={styles.communityIcon}>
              <Ionicons name="people" size={40} color={Colors.primary} />
            </View>
            <TouchableOpacity style={styles.changeIconButton}>
              <Text style={styles.changeIconText}>Change Icon</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Community Name *</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter community name"
                placeholderTextColor={Colors.textLight}
                maxLength={50}
              />
              <Text style={styles.characterCount}>{name.length}/50</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Describe your community"
                placeholderTextColor={Colors.textLight}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                maxLength={500}
              />
              <Text style={styles.characterCount}>{description.length}/500</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoryGrid}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.categoryChip, category === cat && styles.categoryChipActive]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        category === cat && styles.categoryChipTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Privacy</Text>
              <TouchableOpacity
                style={styles.privacyOption}
                onPress={() => setIsPublic(true)}
              >
                <View style={styles.privacyInfo}>
                  <Ionicons name="globe-outline" size={24} color={Colors.text} />
                  <View style={styles.privacyText}>
                    <Text style={styles.privacyTitle}>Public</Text>
                    <Text style={styles.privacySubtitle}>Anyone can join and see posts</Text>
                  </View>
                </View>
                <View style={[styles.radio, isPublic && styles.radioActive]}>
                  {isPublic && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.privacyOption}
                onPress={() => setIsPublic(false)}
              >
                <View style={styles.privacyInfo}>
                  <Ionicons name="lock-closed-outline" size={24} color={Colors.text} />
                  <View style={styles.privacyText}>
                    <Text style={styles.privacyTitle}>Private</Text>
                    <Text style={styles.privacySubtitle}>Requires approval to join</Text>
                  </View>
                </View>
                <View style={[styles.radio, !isPublic && styles.radioActive]}>
                  {!isPublic && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <Button
            title={creating ? 'Creating...' : 'Create Community'}
            onPress={handleCreate}
            disabled={creating || !name.trim() || !description.trim()}
            style={styles.createButton}
          />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  iconSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  communityIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  changeIconButton: {
    paddingVertical: 8,
  },
  changeIconText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  form: {
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.white,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  characterCount: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'right',
    marginTop: 4,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: 14,
    color: Colors.text,
  },
  categoryChipTextActive: {
    color: Colors.white,
    fontWeight: '600',
  },
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: Colors.white,
  },
  privacyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  privacyText: {
    marginLeft: 12,
    flex: 1,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  privacySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  createButton: {
    marginHorizontal: 16,
    marginTop: 8,
  },
});

