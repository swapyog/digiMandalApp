import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { IssueCard } from './components';

const PURPLE = '#7b3cff';

export default function IssueSuccessModal({
  visible,
  onClose,
  issue = {},
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.emojiCircle}>
            <Text style={styles.emoji}>👍</Text>
          </View>
          <Text style={styles.title}>Issue Post Successfully!</Text>
          <Text style={styles.message}>The issue is published.</Text>
          {issue.title && (
            <View style={styles.previewWrap}>
              <IssueCard
                title={issue.title}
                reporter={issue.reporter || ''}
                membersCount={issue.membersCount}
                status={issue.status || 'Pending'}
                description={issue.description || ''}
                images={issue.images}
                compact
              />
            </View>
          )}
          <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  emojiCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emoji: { fontSize: 40 },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  previewWrap: { width: '100%', marginBottom: 20 },
  doneButton: {
    backgroundColor: PURPLE,
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  doneButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
