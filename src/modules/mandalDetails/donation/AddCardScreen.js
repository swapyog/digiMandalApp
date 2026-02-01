import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../components/ScreenHeader';
import { FloatingLabelInput } from '../../../components';

const PURPLE = '#7E48DC';

export default function AddCardScreen({ onBack, onPay, amount = 2000 }) {
  const [nameOnCard, setNameOnCard] = useState('Krunal Salvi');
  const [cardNumber, setCardNumber] = useState('1234 5678 9012 3456');
  const [expiry, setExpiry] = useState('12 / 26');
  const [cvv, setCvv] = useState('****');
  const [saveCard, setSaveCard] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title="Add a card"
        onBack={onBack}
        showMenu
        onMenuPress={() => {}}
      />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <FloatingLabelInput
            label="Name on Card"
            value={nameOnCard}
            onChangeText={setNameOnCard}
            placeholder="Enter name"
            containerStyle={styles.input}
          />
          <FloatingLabelInput
            label="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="1234 5678 9012 3456"
            keyboardType="number-pad"
            containerStyle={styles.input}
          />
          <FloatingLabelInput
            label="Expiry Date"
            value={expiry}
            onChangeText={setExpiry}
            placeholder="MM / YY"
            containerStyle={styles.input}
          />
          <FloatingLabelInput
            label="CVV"
            value={cvv}
            onChangeText={setCvv}
            placeholder="***"
            keyboardType="number-pad"
            containerStyle={styles.input}
          />

          <TouchableOpacity
            style={styles.checkboxWrap}
            onPress={() => setSaveCard(!saveCard)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, saveCard && styles.checkboxChecked]}>
              {saveCard && <Icon name="check" size={16} color="#fff" />}
            </View>
            <Text style={styles.checkboxLabelPurple}>
              Do you want to save your debit card for future payments?
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
  checkboxLabelPurple: {
    flex: 1,
    fontSize: 14,
    color: PURPLE,
    fontWeight: '500',
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
