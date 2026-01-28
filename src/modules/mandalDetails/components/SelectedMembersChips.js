import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PURPLE = '#7b3cff';

export default function SelectedMembersChips({ selectedMembers, onRemoveMember }) {
  const initialsFor = name => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (selectedMembers.length === 0) {
    return null;
  }

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>
        {selectedMembers.length} Members Selected
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 16 }}
      >
        {selectedMembers.map(member => (
          <View
            key={member.id}
            style={{
              alignItems: 'center',
              marginRight: 12,
              width: 70,
            }}
          >
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: '#e3d8f7',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 4,
                position: 'relative',
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '600', color: PURPLE }}>
                {initialsFor(member.name)}
              </Text>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: PURPLE,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => onRemoveMember(member.id)}
              >
                <Icon name="close" size={12} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text
              style={{ fontSize: 12, color: '#111827', textAlign: 'center' }}
              numberOfLines={1}
            >
              {member.name.split(' ')[0]}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

