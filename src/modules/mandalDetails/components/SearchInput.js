import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SearchInput({ value, onChangeText, placeholder = 'Search' }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
      }}
    >
      <TextInput
        style={{ flex: 1, fontSize: 16, color: '#111827' }}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
      />
      <Icon name="search" size={20} color="#9ca3af" />
    </View>
  );
}

