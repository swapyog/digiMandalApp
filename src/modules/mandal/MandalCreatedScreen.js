import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles/appStyles';

export default function MandalCreatedScreen({ onNext, onBack }) {
  return (
    <SafeAreaView style={styles.screenRoot}>
      <View style={[styles.screenBody, { justifyContent: 'center', alignItems: 'center' }]}>
        <View
          style={{
            width: 160,
            height: 160,
            backgroundColor: '#e5e7eb',
            marginBottom: 24,
          }}
        >
          <Text style={{ textAlign: 'center', marginTop: 70 }}>Animation</Text>
        </View>
        <Text style={styles.loginTitle}>Congratulations!</Text>
        <Text style={styles.loginSubtitle}>Your mandal has been created!</Text>
        <View
          style={{
            width: '100%',
            height: 140,
            backgroundColor: '#e5e7eb',
            marginTop: 24,
            borderRadius: 16,
          }}
        >
          <Text style={{ textAlign: 'center', marginTop: 60 }}>Mandal Preview</Text>
        </View>
      </View>

      <View style={styles.screenFooter}>
        <TouchableOpacity style={styles.ctaButton} onPress={onNext}>
          <Text style={styles.ctaButtonText}>Next  ›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


