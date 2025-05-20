import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FavorisScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favoris Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});