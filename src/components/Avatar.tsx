import React from 'react';
import { View, Image, StyleSheet, ImageStyle, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';

interface AvatarProps {
  uri?: string;
  size?: number;
  style?: ViewStyle | ImageStyle;
}

/**
 * Reusable Avatar component that displays a profile picture or placeholder
 */
export default function Avatar({ uri, size = 40, style }: AvatarProps) {
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[avatarStyle, styles.image, style]}
      />
    );
  }

  return <View style={[avatarStyle, styles.placeholder, style]} />;
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: Colors.primaryLight,
    resizeMode: 'cover',
  },
  placeholder: {
    backgroundColor: Colors.primaryLight,
  },
});

