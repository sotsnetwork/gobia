import React from 'react';
import { Image, StyleSheet, View, ImageSourcePropType } from 'react-native';

interface DesignImageProps {
  source: ImageSourcePropType;
  style?: object;
}

export default function DesignImage({ source, style }: DesignImageProps) {
  return (
    <View style={[styles.container, style]}>
      <Image 
        source={source} 
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

