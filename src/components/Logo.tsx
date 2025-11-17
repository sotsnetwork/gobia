import React from 'react';
import { Image, StyleSheet, ImageStyle, ViewStyle, View, Text } from 'react-native';
import { Colors } from '../constants/colors';

interface LogoProps {
  size?: number;
  style?: ImageStyle | ViewStyle;
}

export default function Logo({ size = 60, style }: LogoProps) {
  // For now, show a placeholder until you add your logo
  // Once you add assets/logo.png, uncomment the Image component below
  // and remove the placeholder View
  
  return (
    <View
      style={[
        styles.placeholder,
        { width: size, height: size, borderRadius: size * 0.2 },
        style,
      ]}
    >
      <Text style={[styles.placeholderText, { fontSize: size * 0.4 }]}>≥</Text>
    </View>
  );

  // Uncomment this once you add assets/logo.png:
  /*
  return (
    <Image
      source={require('../../assets/logo.png')}
      style={[styles.logo, { width: size, height: size }, style]}
      resizeMode="contain"
    />
  );
  */
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
