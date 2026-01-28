import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const PURPLE = '#7b3cff';

export default function SuccessModal({ visible, onClose, message, memberCount, variant = 'notice' }) {
  const isAnnouncement = variant === 'announcement';
  const emoji = isAnnouncement ? '✌️' : '👍';
  const title = isAnnouncement ? 'Announcement Published!' : 'Notice Published!';
  const defaultMessage = isAnnouncement
    ? 'The announcement was published successfully.'
    : `The notice has been shared with the ${memberCount ?? 4} chosen members.`;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {isAnnouncement ? (
            <View style={styles.emojiCircleAnnouncement}>
              <Text style={styles.emojiSmall}>{emoji}</Text>
            </View>
          ) : (
            <Text style={styles.emoji}>{emoji}</Text>
          )}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>
            {message ?? defaultMessage}
          </Text>
          <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '100%',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emojiSmall: {
    fontSize: 40,
  },
  emojiCircleAnnouncement: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
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
    marginBottom: 24,
    lineHeight: 22,
  },
  doneButton: {
    backgroundColor: PURPLE,
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

