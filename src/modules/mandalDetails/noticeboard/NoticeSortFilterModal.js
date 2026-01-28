import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PURPLE = '#7b3cff';

const SORT_OPTIONS = [
  { id: 'az', label: 'Sort A - Z', icon: 'sort' },
  { id: 'za', label: 'Sort Z - A', icon: 'sort' },
  { id: 'date', label: 'Filter by Date', icon: 'event' },
];

export default function NoticeSortFilterModal({ visible, onClose, onSelect }) {
  const handleSelect = (id) => {
    if (onSelect) onSelect(id);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', paddingHorizontal: 24 }}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            paddingVertical: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          {SORT_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 20 }}
              onPress={() => handleSelect(opt.id)}
            >
              <View style={{ width: 24, height: 24, marginRight: 16, justifyContent: 'center', alignItems: 'center' }}>
                {opt.id === 'az' ? (
                  <Icon name="sort" size={22} color={PURPLE} style={{ transform: [{ rotate: '180deg' }] }} />
                ) : opt.id === 'za' ? (
                  <Icon name="sort" size={22} color={PURPLE} />
                ) : (
                  <Icon name={opt.icon} size={22} color={PURPLE} />
                )}
              </View>
              <Text style={{ fontSize: 16, color: '#111827' }}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
