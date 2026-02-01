import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PURPLE = '#7E48DC';

const APPS = [
  { id: 'gpay', name: 'Gpay', icon: 'account-balance-wallet' },
  { id: 'phonepe', name: 'Phone Pay', icon: 'phone-android' },
  { id: 'paytm', name: 'PayTm', icon: 'payment' },
  { id: 'other', name: 'Other', icon: 'more-horiz' },
];

export default function SelectPaymentAppModal({
  visible,
  onClose,
  onSelect,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={styles.container}>
        <Text style={styles.title}>Select Payment App</Text>
        <Text style={styles.subtitle}>To make a payment, choose a payment app.</Text>
        <View style={styles.appsRow}>
          {APPS.map((app) => (
            <TouchableOpacity
              key={app.id}
              style={styles.appItem}
              onPress={() => {
                onSelect && onSelect(app);
                onClose();
              }}
            >
              <View style={styles.appIconWrap}>
                <Icon name={app.icon} size={32} color={PURPLE} />
              </View>
              <Text style={styles.appName}>{app.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>
        <TouchableOpacity style={styles.doneButton} onPress={onClose} activeOpacity={0.8}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
  },
  appsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  appItem: {
    alignItems: 'center',
    flex: 1,
  },
  appIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  appName: {
    fontSize: 12,
    color: '#111827',
    fontWeight: '500',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#d1d5db',
  },
  dotActive: {
    backgroundColor: PURPLE,
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
