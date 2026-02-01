import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../components/ScreenHeader';

const PURPLE = '#7E48DC';

const POPULAR_BANKS = [
  { id: 'yes', name: 'Yes Bank' },
  { id: 'hdfc', name: 'HDFC Bank' },
  { id: 'central', name: 'Central Bank' },
  { id: 'icici', name: 'ICICI Bank' },
  { id: 'axis', name: 'Axis Bank' },
];

const ALL_BANKS = [
  'A P Mahesh Bank',
  'AU small finance bank',
  'Abhyudaya Co-operative Bank Ltd.',
  'Adarsh Co-operative Bank Ltd.',
  'Akola Janata Commercial Co-operative Bank',
  'Allahabad Bank',
  'Andhra Bank',
  'Bandhan Bank',
  'Bank of Baroda',
  'Bank of India',
  'Canara Bank',
  'Central Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Indian Bank',
  'Indian Overseas Bank',
  'Punjab National Bank',
  'State Bank of India',
  'Yes Bank',
];

export default function SelectBankScreen({ onBack, onSelectBank }) {
  const [search, setSearch] = useState('');
  const filtered = search.trim()
    ? ALL_BANKS.filter((b) => b.toLowerCase().includes(search.toLowerCase()))
    : ALL_BANKS;

  const renderBank = ({ item }) => (
    <TouchableOpacity
      style={styles.bankRow}
      onPress={() => onSelectBank && onSelectBank(item)}
      activeOpacity={0.7}
    >
      <View style={styles.bankIconWrap}>
        <Icon name="account-balance" size={24} color={PURPLE} />
      </View>
      <Text style={styles.bankName}>{item}</Text>
      <Icon name="chevron-right" size={20} color="#9ca3af" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title="Select Bank"
        onBack={onBack}
        showMenu
        onMenuPress={() => {}}
      />

      <View style={styles.searchWrap}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Bank Name"
          placeholderTextColor="#9ca3af"
          value={search}
          onChangeText={setSearch}
        />
        <Icon name="search" size={22} color="#6b7280" style={styles.searchIcon} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Banks</Text>
        <FlatList
          data={POPULAR_BANKS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.popularItem}
              onPress={() => onSelectBank && onSelectBank(item.name)}
            >
              <View style={styles.popularIcon}>
                <Icon name="account-balance" size={28} color={PURPLE} />
              </View>
              <Text style={styles.popularName} numberOfLines={2}>{item.name}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.popularList}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Banks</Text>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item}
          renderItem={renderBank}
          contentContainerStyle={styles.allBanksList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#111827',
  },
  searchIcon: {
    marginRight: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  popularList: {
    paddingHorizontal: 16,
    gap: 16,
    paddingBottom: 8,
  },
  popularItem: {
    width: 80,
    alignItems: 'center',
  },
  popularIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  popularName: {
    fontSize: 12,
    color: '#111827',
    textAlign: 'center',
    fontWeight: '500',
  },
  allBanksList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  bankIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bankName: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
});
