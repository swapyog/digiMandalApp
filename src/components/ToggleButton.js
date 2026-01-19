import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/appStyles';

export default function ToggleButton({
  options,
  selectedValue,
  onValueChange,
  containerStyle,
}) {
  return (
    <View style={[styles.mandalToggleRow, containerStyle]}>
      {options.map((option, index) => {
        const isSelected = selectedValue === option.value;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;

        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.mandalToggle,
              isFirst && { marginRight: 8 },
              !isFirst && !isLast && { marginHorizontal: 4 },
              isLast && { marginLeft: 8 },
              isSelected && styles.mandalToggleSelected,
            ]}
            onPress={() => onValueChange(option.value)}
          >
            <Text
              style={[
                styles.mandalToggleText,
                isSelected && styles.mandalToggleTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

