import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const PURPLE = '#7b3cff';

export default function ActionButton({ title, onPress, buttonColor = PURPLE, disabled = false }) {
  const bg = disabled ? '#D1D5DB' : buttonColor;
  return (
    <View
      style={{
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        backgroundColor: '#ffffff',
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: bg,
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: 'center',
        }}
        onPress={disabled ? undefined : onPress}
        activeOpacity={disabled ? 1 : 0.7}
      >
        <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600' }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

