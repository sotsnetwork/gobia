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

const issueTypes = [
  'Bug',
  'Feature Request',
  'Account Issue',
  'Content Issue',
  'Other',
];

export default function ReportIssueScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [issueType, setIssueType] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!issueType || !subject.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      Alert.alert('Success', 'Your report has been submitted. We will review it shortly.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Report an Issue" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.intro}>
            Help us improve Gobia by reporting issues or bugs you encounter.
          </Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Issue Type *</Text>
              <View style={styles.chipContainer}>
                {issueTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[styles.chip, issueType === type && styles.chipActive]}
                    onPress={() => setIssueType(type)}
                  >
                    <Text style={[styles.chipText, issueType === type && styles.chipTextActive]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Subject *</Text>
              <TextInput
                style={styles.input}
                value={subject}
                onChangeText={setSubject}
                placeholder="Brief description of the issue"
                placeholderTextColor={Colors.textLight}
                maxLength={100}
              />
              <Text style={styles.characterCount}>{subject.length}/100</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Please provide detailed information about the issue..."
                placeholderTextColor={Colors.textLight}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                maxLength={1000}
              />
              <Text style={styles.characterCount}>{description.length}/1000</Text>
            </View>
          </View>

          <Button
            title={submitting ? 'Submitting...' : 'Submit Report'}
            onPress={handleSubmit}
            disabled={submitting || !issueType || !subject.trim() || !description.trim()}
            style={styles.submitButton}
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
    padding: 16,
    paddingBottom: 32,
  },
  intro: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 24,
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.backgroundLight,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: Colors.text,
  },
  chipTextActive: {
    color: Colors.white,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.backgroundLight,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 12,
  },
  characterCount: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'right',
    marginTop: 4,
  },
  submitButton: {
    marginTop: 8,
  },
});

