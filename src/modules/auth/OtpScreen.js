import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles/appStyles';
import { FloatingLabelInput, PrimaryButton } from '../../components';
import { apiHost, API_PATHS } from '../../constants';
import { StorageService } from '../../utils/storage';
import { getAuthHeaders } from '../../utils/common';
import axios from 'axios';

export default function OtpScreen({ mobileNumber, onBackToLogin, onVerified }) {
  const [otp, setOtp] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const isSixDigits = /^\d{6}$/.test(otp);

  const sendOtp = async (mobile = mobileNumber) => {
    if (!mobile) return;
    setSendingOtp(true);
    try {
      const accessToken = (await StorageService.getAccessToken?.()) ?? '';
      const res = await axios.post(
        `${apiHost.baseURL}${API_PATHS.AUTH}/send-otp`,
        { mobile },
        { headers: getAuthHeaders(accessToken) }
      );
      const data = res.data;
      if (!data?.success) {
        throw new Error(data?.message || 'Failed to send OTP');
      }
      setSecondsLeft(60);
      setError('');
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      Alert.alert('Error', msg || 'Could not send OTP. Check backend is running on port 3000.');
    } finally {
      setSendingOtp(false);
    }
  };

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleVerify = async () => {
    if (!isSixDigits) return;
    setError('');
    setVerifying(true);
    try {
      const accessToken = (await StorageService.getAccessToken?.()) ?? '';
      const res = await axios.post(
        `${apiHost.baseURL}${API_PATHS.AUTH}/verify-otp`,
        { mobile: mobileNumber, otp },
        { headers: getAuthHeaders(accessToken) }
      );
      const data = res.data ?? {};
      if (data.success && onVerified) {
        const token = data.token ?? data.accessToken ?? data.data?.token;
        if (token) {
          await StorageService.setAccessToken(token);
        }
        onVerified(token ?? null);
      } else {
        setError(data.message || 'Invalid or expired OTP');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setError(msg || 'Invalid or expired OTP');
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0 || attemptsLeft <= 0) return;
    setOtp('');
    setAttemptsLeft(prev => (prev > 0 ? prev - 1 : 0));
    setError('');
    await sendOtp(mobileNumber);
  };

  const timerText =
    secondsLeft > 0
      ? `Resend OTP in  ${String(Math.floor(secondsLeft / 60)).padStart(
          2,
          '0',
        )}:${String(secondsLeft % 60).padStart(2, '0')}`
      : 'Resend OTP';

  const attemptsText =
    attemptsLeft < 3 && attemptsLeft > 0
      ? `${attemptsLeft} attempts Left`
      : attemptsLeft === 0
      ? 'OTP Expired'
      : '';

  const showInvalid =
    error === 'Invalid OTP' && attemptsLeft > 0 && otp.length === 6;

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
        <Text style={styles.loginTitle}>Verify OTP</Text>
        <Text style={styles.loginSubtitle}>
          Please enter the OTP received on your registered mobile no.{' '}
          {mobileNumber}
        </Text>

        <FloatingLabelInput
          label="OTP"
          value={otp}
          onChangeText={text => {
            setOtp(text.replace(/[^0-9]/g, ''));
            setError('');
          }}
          placeholder="Enter 6-digit OTP"
          keyboardType="number-pad"
          maxLength={6}
          error={
            attemptsLeft === 0
              ? 'OTP Expired'
              : showInvalid
              ? 'Invalid OTP'
              : null
          }
          helperText={!error && attemptsLeft > 0 ? 'Enter 6-digit OTP' : null}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        <View style={styles.otpFooterRow}>
          <TouchableOpacity
            disabled={secondsLeft > 0 || attemptsLeft <= 0 || sendingOtp}
            onPress={handleResend}
          >
            <Text
              style={[
                styles.resendText,
                (secondsLeft > 0 || sendingOtp) && { color: '#6b7280' },
              ]}
            >
              {sendingOtp ? 'Sending…' : timerText}
            </Text>
          </TouchableOpacity>
          {attemptsText ? (
            <Text style={styles.attemptsText}>{attemptsText}</Text>
          ) : null}
        </View>

        <PrimaryButton
          title={verifying ? 'Verifying…' : 'Verify'}
          onPress={handleVerify}
          disabled={!isSixDigits || verifying}
          showArrow={false}
        />

        <TouchableOpacity onPress={onBackToLogin} style={styles.backToLogin}>
          <Text style={styles.backToLoginText}>Change mobile number</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


