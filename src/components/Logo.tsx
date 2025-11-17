import React from 'react';
import { Image, StyleSheet, ImageStyle, ViewStyle, View, Text } from 'react-native';
import { Colors } from '../constants/colors';

interface LogoProps {
  size?: number;
  style?: ImageStyle | ViewStyle;
}

export default function Logo({ size = 60, style }: LogoProps) {
  // Use the Gobia logo (stylized orange 'g' on black background)
  // Place assets/logo.png in the assets folder to use your actual logo
  return (
    <Image
      source={require('../../assets/logo.png')}
      style={[styles.logo, { width: size, height: size }, style]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    borderRadius: 12,
  },
  placeholder: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});
