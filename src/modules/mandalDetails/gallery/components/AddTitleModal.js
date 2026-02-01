import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, KeyboardAvoidingView, Platform } from 'react-native';

const PURPLE = '#7E48DC';

export default function AddTitleModal({
  visible,
  onClose,
  onDone,
  photoCount = 0,
}) {
  const [title, setTitle] = useState('');

  const handleDone = () => {
    if (title.trim()) {
      onDone(title.trim());
      setTitle('');
    }
  };

  const handleClose = () => {
    setTitle('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />
        <View style={styles.container}>
          <View style={styles.handle} />
          <Text style={styles.title}>Add Title to New Photos</Text>
          <Text style={styles.subtitle}>{photoCount} photos selected</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter album title"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <TouchableOpacity
            style={[styles.doneButton, !title.trim() && styles.doneButtonDisabled]}
            onPress={handleDone}
            disabled={!title.trim()}
            activeOpacity={0.8}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: PURPLE,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    fontSize: 16,
    color: '#111827',
    paddingVertical: 8,
  },
  doneButton: {
    backgroundColor: PURPLE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonDisabled: {
    opacity: 0.5,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
