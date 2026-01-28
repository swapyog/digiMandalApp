import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PURPLE = '#7b3cff';

export default function DateFilterModal({ visible, onClose, selectedYear, selectedMonth, onApply, applyButtonLabel = 'Apply Filter' }) {
  const [tempSelectedYear, setTempSelectedYear] = useState(selectedYear || 2004);
  const [tempSelectedMonth, setTempSelectedMonth] = useState(selectedMonth || 'April');

  const years = Array.from({ length: 25 }, (_, i) => 2000 + i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleApply = () => {
    if (onApply) {
      onApply(tempSelectedYear, tempSelectedMonth);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.filterContent}>
            {/* Year Column */}
            <View style={styles.column}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {years.map((year) => (
                  <TouchableOpacity
                    key={year}
                    style={[
                      styles.filterItem,
                      tempSelectedYear === year && styles.filterItemSelected,
                    ]}
                    onPress={() => setTempSelectedYear(year)}
                  >
                    <Text
                      style={[
                        styles.filterItemText,
                        tempSelectedYear === year && styles.filterItemTextSelected,
                      ]}
                    >
                      {year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Month Column */}
            <View style={styles.column}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {months.map((month) => (
                  <TouchableOpacity
                    key={month}
                    style={[
                      styles.filterItem,
                      tempSelectedMonth === month && styles.filterItemSelected,
                    ]}
                    onPress={() => setTempSelectedMonth(month)}
                  >
                    <Text
                      style={[
                        styles.filterItemText,
                        tempSelectedMonth === month && styles.filterItemTextSelected,
                      ]}
                    >
                      {month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>{applyButtonLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  filterContent: {
    flexDirection: 'row',
    flex: 1,
    minHeight: 300,
  },
  column: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  filterItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterItemSelected: {
    backgroundColor: '#e3d8f7',
  },
  filterItemText: {
    fontSize: 16,
    color: '#111827',
  },
  filterItemTextSelected: {
    color: PURPLE,
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: PURPLE,
    paddingVertical: 16,
    marginHorizontal: 24,
    marginVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

