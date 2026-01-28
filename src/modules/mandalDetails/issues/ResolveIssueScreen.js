import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import ActionButton from '../components/ActionButton';

const PURPLE = '#7b3cff';

export default function ResolveIssueScreen({
  onBack,
  onSubmit,
  issue = {},
  associationName = 'Vasant Kunj Cultural Association, at Thane with very very long name',
}) {
  const [comment, setComment] = useState('');

  const title = issue.title || issue.subject || 'TMC Road Damaged behind kranti chowk corner.';

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Resolve Issue" onBack={onBack} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>{associationName}</Text>
        <Text style={styles.label}>Comment</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Enter comment"
          placeholderTextColor="#9ca3af"
          value={comment}
          onChangeText={setComment}
          multiline
          textAlignVertical="top"
        />
      </ScrollView>
      <ActionButton
        title="Submit"
        onPress={() => onSubmit && onSubmit({ comment })}
        disabled={!comment.trim()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, paddingHorizontal: 16 },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111827',
    minHeight: 120,
    backgroundColor: '#fff',
  },
});
