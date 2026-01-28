import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const PURPLE = '#7b3cff';

export default function IssueStatusTag({ status = 'Pending' }) {
  const isPending = status === 'Pending' || status === 'pending';
  return (
    <View style={[styles.tag, isPending ? styles.tagPending : styles.tagResolved]}>
      <Text style={[styles.text, isPending ? styles.textPending : styles.textResolved]}>
        {isPending ? 'Pending' : 'Resolved'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagPending: {
    backgroundColor: '#D1FAE5',
  },
  tagResolved: {
    backgroundColor: '#E5E7EB',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  textPending: {
    color: '#065F46',
  },
  textResolved: {
    color: '#6b7280',
  },
});
