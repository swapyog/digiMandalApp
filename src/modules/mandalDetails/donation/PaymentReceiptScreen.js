import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../components/ScreenHeader';

const PURPLE = '#7E48DC';

export default function PaymentReceiptScreen({
  onBack,
  onDownload,
  amount = 2000,
  transactionId = '989712hkjjcka798498491',
  paidTo = 'Sai Foundation',
  method = 'Gpay',
  dateTime = '28 Aug 2025, 2:10 AM',
}) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title="Payment Receipt"
        onBack={onBack}
        rightElement={
          <TouchableOpacity onPress={onDownload} style={{ padding: 8 }}>
            <Icon name="file-download" size={24} color="#fff" />
          </TouchableOpacity>
        }
      />

      <View style={styles.content}>
        <View style={styles.successWrap}>
          <View style={styles.successCircle}>
            <Icon name="check" size={40} color={PURPLE} />
          </View>
        </View>
        <Text style={styles.amount}>₹{amount}</Text>
        <Text style={styles.status}>Payment Successful</Text>
        <Text style={styles.dateTime}>{dateTime}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Transaction Details</Text>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID</Text>
            <Text style={styles.value}>{transactionId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Paid To</Text>
            <Text style={styles.value}>{paidTo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Method</Text>
            <Text style={styles.value}>{method}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.doneButton} onPress={onBack} activeOpacity={0.8}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PURPLE,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 16,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  successWrap: {
    alignItems: 'center',
    marginBottom: 16,
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    fontSize: 28,
    fontWeight: '700',
    color: PURPLE,
    textAlign: 'center',
    marginBottom: 6,
  },
  status: {
    fontSize: 14,
    color: PURPLE,
    textAlign: 'center',
    marginBottom: 4,
  },
  dateTime: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
  },
  value: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
  doneButton: {
    backgroundColor: PURPLE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
