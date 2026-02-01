import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const PURPLE = '#7E48DC';

export default function RemoveConfirmModal({
  visible,
  onClose,
  onConfirm,
  selectedCount = 0,
}) {
  const countStr = String(selectedCount).padStart(2, '0');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />
      <View style={styles.container}>
        <Text style={styles.emoji}>🤔</Text>
        <Text style={styles.title}>Are You Sure</Text>
        <Text style={styles.message}>
          {countStr} photos selected. Would you like to remove them?
        </Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.yesButton}
            onPress={() => {
              onClose();
              onConfirm && onConfirm();
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.yesText}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3E8FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: PURPLE,
  },
  yesButton: {
    flex: 1,
    backgroundColor: PURPLE,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  yesText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
