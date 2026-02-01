import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles/appStyles';
import { FloatingLabelInput, PrimaryButton, Loader } from '../../components';
import { apiHost, API_PATHS } from '../../constants';
import { StorageService } from '../../utils/storage';
import { getAuthHeaders } from '../../utils/common';
import axios from 'axios';

export default function LoginScreen({ mobileNumber, setMobileNumber, onGetOtp }) {
  const [touched, setTouched] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [apiError, setApiError] = useState('');

  const isTenDigits = /^\d{10}$/.test(mobileNumber);
  const hasValidationError = touched && !isTenDigits;
  const validationMessage = hasValidationError
    ? mobileNumber.length > 0
      ? 'Enter a 10-digit mobile number'
      : 'Enter a valid mobile number'
    : '';
  const displayError = apiError || validationMessage || null;

  const getErrorMessage = (err) => {
    const data = err.response?.data;
    if (!data) return err.message || 'Could not send OTP. Please try again.';
    const msg = data.message ?? data.error ?? data.msg;
    if (Array.isArray(msg)) return msg[0] || 'Could not send OTP. Please try again.';
    if (typeof msg === 'string') return msg;
    return err.message || 'Could not send OTP. Please try again.';
  };

  const handleGetOtp = async () => {
    if (!isTenDigits) {
      setTouched(true);
      return;
    }
    setApiError('');
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
      setApiError(getErrorMessage(err));
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
            setApiError('');
          }}
          placeholder="Mobile Number"
          keyboardType="number-pad"
          maxLength={10}
          error={displayError}
          onBlur={() => setTouched(true)}
        />

        <PrimaryButton
          title="Get OTP"
          onPress={handleGetOtp}
          disabled={!isTenDigits || sendingOtp}
          style={{ marginTop: 24 }}
        />
      </View>

      <Loader overlay visible={sendingOtp} message="Sending OTP..." />
    </SafeAreaView>
  );
}


