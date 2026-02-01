import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles as appStyles } from '../../styles/appStyles';
import { FloatingLabelInput, PrimaryButton } from '../../components';

const PURPLE = '#7E48DC';
const DARK_BG = '#0b021b';

export default function BuildProfileScreen({ onNext }) {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!fullName?.trim()) next.fullName = 'Enter your full name';
    if (!password?.trim()) next.password = 'Create a password';
    else if (password.length < 8) next.password = 'Minimum 8 characters';
    if (password !== confirmPassword) next.confirmPassword = 'Passwords do not match';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onNext?.({ fullName: fullName.trim(), password });
  };

  return (
    <SafeAreaView style={localStyles.root} edges={['top']}>
      <View style={localStyles.header}>
        <Image
          source={require('../../public/images/logo.png')}
          style={localStyles.headerLogo}
          resizeMode="contain"
        />
        <Text style={localStyles.headerTitle}>DigiMandal</Text>
      </View>

      <ScrollView
        style={localStyles.scroll}
        contentContainerStyle={localStyles.card}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[appStyles.loginTitle, localStyles.title]}>
          Build your Profile
        </Text>
        <Text style={[appStyles.loginSubtitle, localStyles.subtitle]}>
          Please enter your details to proceed to use the app.
        </Text>

        <FloatingLabelInput
          label="Your Full Name"
          value={fullName}
          onChangeText={(t) => { setFullName(t); setErrors((e) => ({ ...e, fullName: '' })); }}
          placeholder="Enter Full Name"
          error={errors.fullName || null}
        />

        <FloatingLabelInput
          label="Create New Password"
          value={password}
          onChangeText={(t) => { setPassword(t); setErrors((e) => ({ ...e, password: '' })); }}
          placeholder="Create Password"
          secureTextEntry
          helperText="Minimum 8 characters"
          error={errors.password || null}
          containerStyle={localStyles.inputSpacer}
        />

        <FloatingLabelInput
          label="Confirm New Password"
          value={confirmPassword}
          onChangeText={(t) => { setConfirmPassword(t); setErrors((e) => ({ ...e, confirmPassword: '' })); }}
          placeholder="Confirm Password"
          secureTextEntry
          error={errors.confirmPassword || null}
          containerStyle={localStyles.inputSpacer}
        />

        <Text style={localStyles.sectionTitle}>Link account for easy login (Optional)</Text>
        <View style={localStyles.linkedRow}>
          <TouchableOpacity style={localStyles.linkedBtn} activeOpacity={0.7}>
            <View style={[localStyles.linkedCircle, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb' }]}>
              <Text style={localStyles.linkedLetter}>G</Text>
            </View>
            <Text style={localStyles.linkedLabel}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={localStyles.linkedBtn} activeOpacity={0.7}>
            <View style={[localStyles.linkedCircle, { backgroundColor: '#0A66C2' }]}>
              <Text style={[localStyles.linkedLetter, { color: '#fff' }]}>in</Text>
            </View>
            <Text style={localStyles.linkedLabel}>LinkedIn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={localStyles.linkedBtn} activeOpacity={0.7}>
            <View style={[localStyles.linkedCircle, { backgroundColor: '#1877F2' }]}>
              <Text style={[localStyles.linkedLetter, { color: '#fff' }]}>f</Text>
            </View>
            <Text style={localStyles.linkedLabel}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <PrimaryButton
          title="Submit"
          onPress={handleSubmit}
          showArrow={false}
          style={localStyles.submitBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: DARK_BG,
  },
  headerLogo: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  scroll: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 20,
  },
  inputSpacer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 24,
    marginBottom: 12,
  },
  linkedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  linkedBtn: {
    alignItems: 'center',
  },
  linkedCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  linkedLetter: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  linkedLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  submitBtn: {
    marginTop: 32,
  },
});
