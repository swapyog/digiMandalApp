import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PURPLE = '#7b3cff';

export default function FilterButton({ onPress, color = PURPLE }) {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center' }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 14, color: color, fontWeight: '500', marginRight: 4 }}>
        Filter
      </Text>
      <Icon name="filter-list" size={20} color={color} />
    </TouchableOpacity>
  );
}

