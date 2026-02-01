import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyGallery() {
  return (
    <View style={styles.container}>
      <View style={styles.illustration}>
        <Text style={styles.illustrationText}>Illustration</Text>
      </View>
      <Text style={styles.message}>Photos not added!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  illustration: {
    width: 200,
    height: 160,
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  illustrationText: {
    fontSize: 16,
    color: '#6b7280',
  },
  message: {
    fontSize: 16,
    color: '#6b7280',
  },
});
