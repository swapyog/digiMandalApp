import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles/appStyles';
import { FloatingLabelInput, PrimaryButton } from '../../components';

export default function LoginScreen({ mobileNumber, setMobileNumber, onGetOtp }) {
  const [touched, setTouched] = useState(false);

  const isTenDigits = /^\d{10}$/.test(mobileNumber);
  const hasError = touched && !isTenDigits;
  const errorText = hasError
    ? mobileNumber.length > 0
      ? 'Enter a 10-digit mobile number'
      : 'Enter a valid mobile number'
    : '';

  return (
    <SafeAreaView style={styles.loginRoot}>
      <View style={styles.loginCardTop}>
        <View style={styles.loginTopContent}>
          <Image
            source={require('../../public/images/loginscreen.png')}
            // style={styles.loginLogo}
            resizeMode="contain"
            accessible
            accessibilityLabel="DigiMandal logo"
          />
        </View>
      </View>
      <View style={styles.loginCard}>
        <Text style={styles.loginTitle}>Login</Text>
        <Text style={styles.loginSubtitle}>
          Please enter the mobile number to login or register to DigiMandal
        </Text>

        <FloatingLabelInput
          label="Mobile Number"
          value={mobileNumber}
          onChangeText={text => {
            setMobileNumber(text.replace(/[^0-9]/g, ''));
          }}
          placeholder="Mobile Number"
          keyboardType="number-pad"
          maxLength={10}
          error={hasError ? errorText : null}
          onBlur={() => setTouched(true)}
        />

        <PrimaryButton
          title="Get OTP"
          onPress={() => {
            setTouched(true);
            if (isTenDigits) {
              onGetOtp();
            }
          }}
          disabled={!isTenDigits}
        />
      </View>
    </SafeAreaView>
  );
}


