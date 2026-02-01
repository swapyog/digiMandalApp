import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../components/ScreenHeader';
import SelectPaymentAppModal from './components/SelectPaymentAppModal';

const PURPLE = '#7E48DC';

function PaymentCard({ icon, title, subtitle, onPress, showChevron }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardIcon}>
        <Icon name={icon} size={24} color={PURPLE} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        {subtitle ? <Text style={styles.cardSubtitle}>{subtitle}</Text> : null}
      </View>
      {showChevron ? (
        <Icon name="chevron-right" size={24} color={PURPLE} />
      ) : (
        <Icon name="add" size={24} color={PURPLE} />
      )}
    </TouchableOpacity>
  );
}

export default function PayScreen({ onBack, amount = 2000, onSuccess, onAddAccount, onAddCard }) {
  const [upiId, setUpiId] = useState('');
  const [upiVerified, setUpiVerified] = useState(false);
  const [paymentAppModalVisible, setPaymentAppModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title={`Pay : ₹${amount}`}
        onBack={onBack}
        showMenu
        onMenuPress={() => {}}
      />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Recommended */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended</Text>
          <PaymentCard
            icon="account-balance-wallet"
            title="UPI Apps"
            subtitle="Phone Pay, Gpay, Paytm"
            onPress={() => setPaymentAppModalVisible(true)}
            showChevron
          />
        </View>

        {/* UPI ID */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>UPI ID</Text>
          <View style={styles.upiRow}>
            <TextInput
              style={styles.upiInput}
              placeholder="Enter UPI ID"
              placeholderTextColor="#9ca3af"
              value={upiId}
              onChangeText={(t) => {
                setUpiId(t);
                setUpiVerified(false);
              }}
            />
            <TouchableOpacity
              style={[styles.verifyButton, upiVerified && styles.verifyButtonSuccess]}
              onPress={() => setUpiVerified(true)}
            >
              {upiVerified ? (
                <>
                  <Icon name="check" size={18} color="#fff" />
                  <Text style={styles.verifyText}>Verified</Text>
                </>
              ) : (
                <Text style={styles.verifyText}>Verify</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cards</Text>
          <PaymentCard
            icon="credit-card"
            title="Add credit or debit cards"
            onPress={() => onAddCard && onAddCard(amount)}
            showChevron={false}
          />
          <PaymentCard
            icon="card-giftcard"
            title="Add Pluxee"
            onPress={() => {}}
            showChevron={false}
          />
        </View>

        {/* Netbanking */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Netbanking</Text>
          <PaymentCard
            icon="account-balance"
            title="Netbanking"
            onPress={() => onAddAccount && onAddAccount(amount)}
            showChevron={false}
          />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <TouchableOpacity
        style={styles.payButton}
        onPress={() => onSuccess && onSuccess(amount)}
        activeOpacity={0.8}
      >
        <Text style={styles.payButtonText}>Pay Now ₹{amount}</Text>
      </TouchableOpacity>

      <SelectPaymentAppModal
        visible={paymentAppModalVisible}
        onClose={() => setPaymentAppModalVisible(false)}
        onSelect={(app) => setPaymentAppModalVisible(false)}
      />
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
    paddingTop: 16,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e3d8f7',
    padding: 16,
    marginBottom: 10,
  },
  cardIcon: {
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  upiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: '#f9fafb',
  },
  upiInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#111827',
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 6,
    borderRadius: 8,
  },
  verifyButtonSuccess: {
    backgroundColor: '#059669',
  },
  verifyText: {
    fontSize: 14,
    fontWeight: '600',
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
