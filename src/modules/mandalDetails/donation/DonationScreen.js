import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../components/ScreenHeader';

const PURPLE = '#7E48DC';
const DARK_BG = '#0b021b';

const AMOUNTS = [100, 200, 500, 1000];

const FOUNDATION = {
  name: 'Sai Foundation',
  about: 'Gorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
};

export default function DonationScreen({ onBack, onPay }) {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [headerMenuVisible, setHeaderMenuVisible] = useState(false);

  const payAmount = customAmount.trim() ? (Number(customAmount) || selectedAmount) : selectedAmount;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title="Donation"
        onBack={onBack}
        showMenu
        onMenuPress={() => setHeaderMenuVisible(true)}
      />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Donation Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerSymbol}>र</Text>
            <Text style={styles.bannerTitle}>DONATION</Text>
            <Text style={styles.bannerSubtitle}>
              Gorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </View>
          <View style={styles.bannerIllustration}>
            <Icon name="volunteer-activism" size={80} color="#9ca3af" />
          </View>
        </View>

        {/* Make Donation of */}
        <View style={styles.sectionDark}>
          <Text style={styles.sectionLabel}>Make Donation of</Text>
          <View style={styles.amountRow}>
            {AMOUNTS.map((amt) => (
              <TouchableOpacity
                key={amt}
                style={[
                  styles.amountButton,
                  selectedAmount === amt && !customAmount.trim()
                    ? styles.amountButtonSelected
                    : styles.amountButtonOutlined,
                ]}
                onPress={() => {
                  setSelectedAmount(amt);
                  setCustomAmount('');
                }}
              >
                <Text
                  style={[
                    styles.amountText,
                    selectedAmount === amt && !customAmount.trim()
                      ? styles.amountTextSelected
                      : styles.amountTextOutlined,
                  ]}
                >
                  ₹{amt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.customAmountWrap}>
            <TextInput
              style={styles.customAmountInput}
              placeholder="₹ Enter amount"
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={customAmount}
              onChangeText={setCustomAmount}
              keyboardType="number-pad"
              onFocus={() => setSelectedAmount(0)}
            />
          </View>
        </View>

        {/* Foundation Details */}
        <View style={styles.sectionWhite}>
          <Text style={styles.foundationName}>{FOUNDATION.name}</Text>
          <Text style={styles.foundationLabel}>About:</Text>
          <Text style={styles.foundationAbout}>{FOUNDATION.about}</Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <TouchableOpacity
        style={styles.payButton}
        onPress={() => onPay && onPay(payAmount)}
        activeOpacity={0.8}
      >
        <Text style={styles.payButtonText}>Pay Now ₹{payAmount}</Text>
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
  banner: {
    flexDirection: 'row',
    backgroundColor: '#F5F0E6',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    minHeight: 140,
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerSymbol: {
    fontSize: 24,
    color: '#dc2626',
    marginBottom: 4,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#374151',
    letterSpacing: 1,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 6,
  },
  bannerIllustration: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionDark: {
    backgroundColor: DARK_BG,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 12,
  },
  amountRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  amountButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  amountButtonSelected: {
    backgroundColor: PURPLE,
  },
  amountButtonOutlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  amountText: {
    fontSize: 14,
    fontWeight: '600',
  },
  amountTextSelected: {
    color: '#fff',
  },
  amountTextOutlined: {
    color: '#fff',
  },
  customAmountWrap: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  customAmountInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#fff',
  },
  sectionWhite: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  foundationName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  foundationLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
  },
  foundationAbout: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
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
