import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PURPLE = '#7b3cff';

export default function FiltersModal({ visible, onClose, onSelect }) {
  const filterOptions = [
    { id: 'az', label: 'A - Z', icon: 'arrow-upward' },
    { id: 'za', label: 'Z - A', icon: 'arrow-downward' },
    { id: 'latest', label: 'Latest First', icon: 'access-time' },
    { id: 'invited', label: 'Invited Members', icon: 'person-add' },
    { id: 'core', label: 'Core Members', icon: 'people' },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: '80%',
            minHeight: 300,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 24,
              paddingTop: 24,
              paddingBottom: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#e5e7eb',
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#111827' }}>
              Filters
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 8 }}
            showsVerticalScrollIndicator={false}
          >
            {filterOptions.map((option, index) => (
              <TouchableOpacity
                key={option.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 16,
                  borderBottomWidth: index < filterOptions.length - 1 ? 1 : 0,
                  borderBottomColor: '#e5e7eb',
                }}
                onPress={() => {
                  if (onSelect) {
                    onSelect(option.id);
                  }
                  onClose();
                }}
              >
                <View style={{ width: 24, height: 24, marginRight: 16, justifyContent: 'center', alignItems: 'center' }}>
                  {option.id === 'az' ? (
                    <Icon name="sort" size={24} color={PURPLE} style={{ transform: [{ rotate: '180deg' }] }} />
                  ) : option.id === 'za' ? (
                    <Icon name="sort" size={24} color={PURPLE} />
                  ) : (
                    <Icon name={option.icon} size={24} color={PURPLE} />
                  )}
                </View>
                <Text style={{ fontSize: 16, color: '#111827' }}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

