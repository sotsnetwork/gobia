import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DesignImage } from '../components';

/**
 * Template for creating screens based on design images
 * 
 * To create a new screen:
 * 1. Copy this file and rename it (e.g., LoginScreen.tsx)
 * 2. Import the design image
 * 3. Replace the placeholder content with your screen implementation
 * 4. Add the screen to App.tsx navigation
 */

interface ScreenTemplateProps {
  // Add props as needed
}

export default function ScreenTemplate({}: ScreenTemplateProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* 
            Replace this with your screen content based on the design
            Example:
            <DesignImage source={require('../../assets/designs/login-screen.png')} />
          */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
});

