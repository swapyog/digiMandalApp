import React, { useState } from 'react';
import { Text, View, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles/appStyles';
import { FloatingLabelInput, PrimaryButton } from '../../components';
import { apiHost, API_PATHS } from '../../constants';
import { StorageService } from '../../utils/storage';
import { getAuthHeaders } from '../../utils/common';
import axios from 'axios';

export default function LoginScreen({ mobileNumber, setMobileNumber, onGetOtp }) {
  const [touched, setTouched] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const isTenDigits = /^\d{10}$/.test(mobileNumber);
  const hasError = touched && !isTenDigits;
  const errorText = hasError
    ? mobileNumber.length > 0
      ? 'Enter a 10-digit mobile number'
      : 'Enter a valid mobile number'
    : '';

  const handleGetOtp = async () => {
    if (!isTenDigits) return;
    setTouched(true);
    setSendingOtp(true);
    try {
      const accessToken = (await StorageService.getAccessToken?.()) ?? '';
      const res = await axios.post(
        `${apiHost.baseURL}${API_PATHS.AUTH}/send-otp`,
        { mobile: mobileNumber },
        { headers: getAuthHeaders(accessToken) }
      );
      const data = res.data;
      if (!data?.success) {
        throw new Error(data?.message || 'Failed to send OTP');
      }
      if (onGetOtp) onGetOtp();
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      Alert.alert('Error', msg || 'Could not send OTP. Check backend is running on port 3000.');
    } finally {
      setSendingOtp(false);
    }
  };

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
          title={sendingOtp ? 'Sending…' : 'Get OTP'}
          onPress={handleGetOtp}
          disabled={!isTenDigits || sendingOtp}
        />
      </View>
    </SafeAreaView>
  );
}


