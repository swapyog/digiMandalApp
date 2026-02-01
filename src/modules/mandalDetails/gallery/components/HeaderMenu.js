import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PURPLE = '#7E48DC';

export default function HeaderMenu({
  visible,
  onClose,
  onFilter,
  onAddPhotos,
  onRemovePhotos,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.menuContainer}>
          {onFilter != null && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                onFilter && onFilter();
              }}
            >
              <Icon name="filter-list" size={20} color={PURPLE} />
              <Text style={styles.menuText}>Filter</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onClose();
              onAddPhotos && onAddPhotos();
            }}
          >
            <Icon name="add" size={20} color={PURPLE} />
            <Text style={styles.menuText}>Add Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onClose();
              onRemovePhotos && onRemovePhotos();
            }}
          >
            <Icon name="close" size={20} color={PURPLE} />
            <Text style={styles.menuText}>Remove Photos</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  menuContainer: {
    position: 'absolute',
    top: 56,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 14,
    color: '#111827',
    marginLeft: 12,
  },
});
