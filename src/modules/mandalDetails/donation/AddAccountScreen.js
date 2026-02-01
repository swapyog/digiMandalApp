import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../components/ScreenHeader';
import { FloatingLabelInput } from '../../../components';

const PURPLE = '#7E48DC';

export default function AddAccountScreen({ onBack, onPay, amount = 2000 }) {
  const [accountName, setAccountName] = useState('Krunal Salvi');
  const [accountNumber, setAccountNumber] = useState('1234567890123456');
  const [reEnterAccount, setReEnterAccount] = useState('');
  const [ifsc, setIfsc] = useState('IFSC9087D');
  const [saveDetails, setSaveDetails] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title="Add Account"
        onBack={onBack}
        showMenu
        onMenuPress={() => {}}
      />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <FloatingLabelInput
            label="Account Holder Name"
            value={accountName}
            onChangeText={setAccountName}
            placeholder="Enter name"
            containerStyle={styles.input}
          />
          <FloatingLabelInput
            label="Account Number"
            value={accountNumber}
            onChangeText={setAccountNumber}
            placeholder="Enter account number"
            keyboardType="number-pad"
            containerStyle={styles.input}
          />
          <FloatingLabelInput
            label="Re-enter Account Number"
            value={reEnterAccount}
            onChangeText={setReEnterAccount}
            placeholder="Re-enter account number"
            keyboardType="number-pad"
            containerStyle={styles.input}
          />
          <FloatingLabelInput
            label="IFSC Code"
            value={ifsc}
            onChangeText={setIfsc}
            placeholder="Enter IFSC"
            containerStyle={styles.input}
          />

          <TouchableOpacity
            style={styles.checkboxWrap}
            onPress={() => setSaveDetails(!saveDetails)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, saveDetails && styles.checkboxChecked]}>
              {saveDetails && <Icon name="check" size={16} color="#fff" />}
            </View>
            <Text style={styles.checkboxLabel}>
              Do you want to save your account details for future payments?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <TouchableOpacity
        style={styles.payButton}
        onPress={() => onPay && onPay(amount)}
        activeOpacity={0.8}
      >
        <Text style={styles.payButtonText}>Pay Now ₹{amount}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  form: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  input: {
    marginBottom: 20,
  },
  checkboxWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: PURPLE,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  bottomSpacer: {
    height: 100,
  },
  payButton: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
    backgroundColor: PURPLE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
