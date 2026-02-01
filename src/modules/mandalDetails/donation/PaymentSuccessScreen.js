import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PURPLE = '#7E48DC';

export default function PaymentSuccessScreen({
  onDone,
  amount = 2000,
  transactionId = '989712hkjjcka798498491',
  paidTo = 'Sai Foundation',
  method = 'Gpay',
  dateTime = '28 Aug 2025, 2:10 AM',
}) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.successIconWrap}>
          <View style={styles.successIconInner}>
            <Icon name="check" size={48} color="#fff" />
          </View>
        </View>
        <Text style={styles.amount}>₹{amount}</Text>
        <Text style={styles.status}>Payment Successful</Text>
        <Text style={styles.dateTime}>{dateTime}</Text>
      </View>

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
        <TouchableOpacity style={styles.doneButton} onPress={onDone} activeOpacity={0.8}>
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
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  successIconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successIconInner: {},
  amount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  dateTime: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
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
    marginTop: 24,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
