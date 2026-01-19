import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/appStyles';

export default function ModalButton({
  primaryLabel = 'Allow',
  secondaryLabel = 'Exit',
  onPrimaryPress,
  onSecondaryPress,
  primaryDisabled = false,
  secondaryDisabled = false,
}) {
  return (
    <View style={styles.modalActions}>
      <TouchableOpacity
        style={styles.modalSecondaryButton}
        disabled={secondaryDisabled}
        onPress={onSecondaryPress}
      >
        <Text style={styles.modalSecondaryText}>{secondaryLabel}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalPrimaryButton}
        disabled={primaryDisabled}
        onPress={onPrimaryPress}
      >
        <Text style={styles.modalPrimaryText}>{primaryLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

