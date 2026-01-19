import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../styles/appStyles';

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  showArrow = true,
}) {
  return (
    <TouchableOpacity
      style={[styles.ctaButton, disabled && styles.ctaButtonDisabled, style]}
      disabled={disabled}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styles.ctaButtonText, textStyle]}>
          {title}
        </Text>
        {showArrow && (
          <Icon name="chevron-right" size={20} color="#ffffff" style={{ marginLeft: 8 }} />
        )}
      </View>
    </TouchableOpacity>
  );
}

