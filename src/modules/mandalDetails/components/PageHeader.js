import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { donationsPageStyles } from '../../../styles/donationsPageStyles';

export default function PageHeader({ title, onBack, rightComponent }) {
  return (
    <View style={donationsPageStyles.header}>
      <View style={donationsPageStyles.headerTop}>
        <TouchableOpacity onPress={onBack} style={donationsPageStyles.backButton}>
          <Icon name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={donationsPageStyles.headerTitle}>{title}</Text>
        {rightComponent || <View style={{ width: 24 }} />}
      </View>
    </View>
  );
}

