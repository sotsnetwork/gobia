import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Button from '../components/Button';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RateAppScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (stars: number) => {
    setRating(stars);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }

    setSubmitted(true);
    // Simulate API call
    setTimeout(() => {
      if (rating >= 4) {
        Alert.alert(
          'Thank You!',
          'We appreciate your feedback! Would you like to rate us on the App Store?',
          [
            { text: 'Not Now', onPress: () => navigation.goBack() },
            { text: 'Rate on App Store', onPress: () => navigation.goBack() },
          ]
        );
      } else {
        Alert.alert(
          'Thank You',
          'We appreciate your feedback. We\'re always working to improve Gobia!',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }
    }, 500);
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header title="Rate the App" />
        <View style={styles.submittedContainer}>
          <Ionicons name="checkmark-circle" size={64} color={Colors.success} />
          <Text style={styles.submittedTitle}>Thank You!</Text>
          <Text style={styles.submittedText}>Your feedback has been submitted.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Rate the App" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <View style={styles.appIcon}>
            <Text style={styles.appIconText}>g</Text>
          </View>
          <Text style={styles.appName}>Gobia</Text>
          <Text style={styles.appTagline}>Build. Share. Connect.</Text>
        </View>

        <View style={styles.ratingSection}>
          <Text style={styles.ratingTitle}>How would you rate your experience?</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRating(star)}
                style={styles.starButton}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={48}
                  color={star <= rating ? Colors.warning : Colors.textLight}
                />
              </TouchableOpacity>
            ))}
          </View>
          {rating > 0 && (
            <Text style={styles.ratingText}>
              {rating === 5 && "Excellent! We're thrilled you love Gobia!"}
              {rating === 4 && "Great! We're glad you're enjoying Gobia!"}
              {rating === 3 && "Good! We'd love to hear how we can improve."}
              {rating === 2 && "We're sorry to hear that. How can we do better?"}
              {rating === 1 && "We're sorry for the poor experience. We'll work to improve."}
            </Text>
          )}
        </View>

        {rating > 0 && rating < 5 && (
          <View style={styles.feedbackSection}>
            <Text style={styles.feedbackTitle}>Tell us more (Optional)</Text>
            <Text style={styles.feedbackHint}>
              Your feedback helps us improve Gobia for everyone.
            </Text>
          </View>
        )}

        <Button
          title={rating === 0 ? 'Select a Rating' : 'Submit Rating'}
          onPress={handleSubmit}
          disabled={rating === 0}
          style={styles.submitButton}
        />

        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.skipText}>Maybe Later</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appIconText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.white,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  ratingTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  starButton: {
    padding: 4,
  },
  ratingText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  feedbackSection: {
    width: '100%',
    marginBottom: 24,
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  feedbackHint: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  submitButton: {
    width: '100%',
    marginBottom: 16,
  },
  skipButton: {
    paddingVertical: 12,
  },
  skipText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  submittedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  submittedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  submittedText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

