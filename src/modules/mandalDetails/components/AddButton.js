import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { memberDashboardStyles } from '../../../styles/memberDashboardStyles';

const PURPLE = '#7E48DC';

export default function AddButton({ text, onPress }) {
  return (
    <TouchableOpacity style={memberDashboardStyles.addButton} onPress={onPress}>
      <Icon name="add" size={20} color={PURPLE} />
      <Text style={memberDashboardStyles.addButtonText}>{text}</Text>
    </TouchableOpacity>
  );
}

