import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { styles } from '../styles/appStyles';

export default function FloatingLabelTextarea({
  label,
  value,
  onChangeText,
  placeholder,
  maxLength,
  error,
  helperText,
  onBlur,
  onFocus,
  editable = true,
  autoFocus = false,
  containerStyle,
  minHeight = 120,
  numberOfLines = 4,
}) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const showFloatingLabel = focused || value.length > 0;
  const hasError = touched && error;
  const isValid = touched && !error && value.length > 0;

  const handleFocus = () => {
    setFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setFocused(false);
    setTouched(true);
    if (onBlur) onBlur();
  };

  return (
    <View style={[styles.inputGroup, containerStyle]}>
      {showFloatingLabel && (
        <Text
          style={[
            styles.inputFloatingLabel,
            hasError && styles.inputFloatingLabelError,
            !hasError && isValid && styles.inputFloatingLabelActive,
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          hasError && styles.inputWrapperError,
          !hasError && isValid && styles.inputWrapperSuccess,
          focused && !hasError && !isValid && styles.inputWrapperFocused,
          {
            alignItems: 'flex-start',
            paddingVertical: 12,
            minHeight: minHeight,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              textAlignVertical: 'top',
              minHeight: minHeight - 24,
              paddingTop: 0,
            },
          ]}
          value={value}
          placeholder={showFloatingLabel ? '' : placeholder}
          placeholderTextColor="#9ca3af"
          maxLength={maxLength}
          multiline={true}
          numberOfLines={numberOfLines}
          editable={editable}
          autoFocus={autoFocus}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
      {hasError ? (
        <Text style={styles.inputErrorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.inputHelperText}>{helperText}</Text>
      ) : (
        <Text style={styles.inputHelperText}> </Text>
      )}
    </View>
  );
}

