import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { homeStyles } from '../../../styles/homeStyles';

export default function DiscoverSearch({
  value,
  onChangeText,
  placeholder = 'Search',
  placeholderTextColor = '#9ca3af',
  style,
  inputStyle,
}) {
  return (
    <View style={[homeStyles.discoverSearchBox, style]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={[homeStyles.discoverSearchInput, inputStyle]}
        value={value}
        onChangeText={onChangeText}
      />
      <Icon name="search" size={24} color="#6b7280" />
    </View>
  );
}

