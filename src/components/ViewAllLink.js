import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PURPLE = '#7E48DC';

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: PURPLE,
  },
});

export default function ViewAllLink({
  text = 'View All',
  onPress,
  disabled = false,
  style,
  textStyle,
  iconSize = 16,
  iconColor = PURPLE,
  showIcon = true,
}) {
  return (
    <TouchableOpacity
      style={[defaultStyles.container, disabled && { opacity: 0.5 }, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[defaultStyles.linkText, textStyle]}>
        {text}
      </Text>
      {showIcon && <Icon name="chevron-right" size={iconSize} color={iconColor} />}
    </TouchableOpacity>
  );
}

