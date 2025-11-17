import React from 'react';
import { Image, StyleSheet, ImageStyle, ViewStyle } from 'react-native';

interface LogoProps {
  size?: number;
  style?: ImageStyle | ViewStyle;
}

export default function Logo({ size = 60, style }: LogoProps) {
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
});

