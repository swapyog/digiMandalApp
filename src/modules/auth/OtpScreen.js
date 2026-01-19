import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles/appStyles';
import { FloatingLabelInput, PrimaryButton } from '../../components';

export default function OtpScreen({ mobileNumber, onBackToLogin, onVerified }) {
  const [otp, setOtp] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);

  const isSixDigits = /^\d{6}$/.test(otp);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }
    const timer = setTimeout(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleVerify = () => {
    if (!isSixDigits || otp !== '123456') {
      setError('Invalid OTP');
      return;
    }
    setError('');
    if (onVerified) {
      onVerified();
    }
  };

  const handleResend = () => {
    if (secondsLeft > 0 || attemptsLeft <= 0) {
      return;
    }
    setOtp('');
    setSecondsLeft(60);
    setAttemptsLeft(prev => (prev > 0 ? prev - 1 : 0));
    setError('');
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
            disabled={secondsLeft > 0 || attemptsLeft <= 0}
            onPress={handleResend}
          >
            <Text
              style={[
                styles.resendText,
                secondsLeft > 0 && { color: '#6b7280' },
              ]}
            >
              {timerText}
            </Text>
          </TouchableOpacity>
          {attemptsText ? (
            <Text style={styles.attemptsText}>{attemptsText}</Text>
          ) : null}
        </View>

        <PrimaryButton
          title="Verify"
          onPress={handleVerify}
          disabled={!isSixDigits}
          showArrow={false}
        />

        <TouchableOpacity onPress={onBackToLogin} style={styles.backToLogin}>
          <Text style={styles.backToLoginText}>Change mobile number</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


