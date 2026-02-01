import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../styles/appStyles';

export default function FloatingLabelInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  maxLength,
  multiline = false,
  textAlignVertical,
  error,
  helperText,
  onBlur,
  onFocus,
  editable = true,
  autoFocus = false,
  containerStyle,
  rightIcon,
  rightIconName,
  secureTextEntry = false,
}) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const showFloatingLabel = focused || value.length > 0;
  const hasError = !!error;
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
        ]}
      >
        <TextInput
          style={[styles.input, multiline && { textAlignVertical: textAlignVertical || 'top' }]}
          value={value}
          placeholder={showFloatingLabel ? '' : placeholder}
          placeholderTextColor="#9ca3af"
          keyboardType={keyboardType}
          maxLength={maxLength}
          multiline={multiline}
          editable={editable}
          autoFocus={autoFocus}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {hasError ? (
          <Text style={styles.inputErrorIcon}>!</Text>
        ) : rightIcon || rightIconName ? (
          <Icon 
            name={rightIconName || "keyboard-arrow-down"} 
            size={rightIconName === "calendar-today" ? 20 : 24} 
            color="#6b7280" 
            style={styles.inputRightIcon} 
          />
        ) : null}
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

