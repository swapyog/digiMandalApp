import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const PURPLE = '#7E48DC';

const defaultStyles = StyleSheet.create({
  joinButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1BDF2',
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: PURPLE,
  },
});

export default function JoinButton({
  text = '+ Join',
  onPress,
  disabled = false,
  style,
  textStyle,
}) {
  return (
    <TouchableOpacity
      style={[defaultStyles.joinButton, disabled && { opacity: 0.5 }, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[defaultStyles.joinButtonText, textStyle]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

