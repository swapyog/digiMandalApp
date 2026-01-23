import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { donationsPageStyles } from '../../../styles/donationsPageStyles';
import PageHeader from '../components/PageHeader';

const PURPLE = '#7E48DC';
const DARK_PURPLE = '#110723';

export default function DonationsPage({ onBack }) {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 7 Days');
  const [selectedTab, setSelectedTab] = useState('total'); // 'total', 'today', 'donors'

  // Sample donation data
  const donationsSummary = {
    total: '1,00,000',
    today: '5000',
    totalDonors: '1000',
  };

  // Sample graph data for last 7 days
  const graphData = [
    { day: '1 Jun', amount: 200 },
    { day: '2 Jun', amount: 500 },
    { day: '3 Jun', amount: 800 },
    { day: '4 Jun', amount: 1000 },
    { day: '5 Jun', amount: 600 },
    { day: '6 Jun', amount: 700 },
    { day: '7 Jun', amount: 900 },
  ];

  const maxAmount = Math.max(...graphData.map(d => d.amount));
  const minAmount = Math.min(...graphData.map(d => d.amount));
  const range = maxAmount - minAmount || 1;
  const graphHeight = 150;

  // Sample donations history - all donations
  const allDonationsHistory = [
    { id: '1', name: 'Anonymous', location: 'Thane', date: '29-07-2025', amount: '2000' },
    { id: '2', name: 'Qorem', location: 'Kisan Na...', date: '29-07-2025', amount: '2000' },
    { id: '3', name: 'Norem', location: 'Kisan Na...', date: '28-07-2025', amount: '1500' },
    { id: '4', name: 'Forem ipsum', location: 'Kisan Na...', date: '29-07-2025', amount: '2000' },
    { id: '5', name: 'Porem ipsum', location: 'Kisan Na...', date: '27-07-2025', amount: '3000' },
    { id: '6', name: 'Jorem ipsum', location: 'Kisan Na...', date: '29-07-2025', amount: '2000' },
    { id: '7', name: 'Horem ipsum', location: 'Kisan Na...', date: '26-07-2025', amount: '1000' },
    { id: '8', name: 'Corem ipsum', location: 'Kisan Na...', date: '29-07-2025', amount: '2000' },
    { id: '9', name: 'Dorem ipsum', location: 'Kisan Na...', date: '25-07-2025', amount: '2500' },
    { id: '10', name: 'Vorem ipsum', location: 'Kisan Na...', date: '29-07-2025', amount: '2000' },
    { id: '11', name: 'Yorem ipsum', location: 'Kisan Na...', date: '24-07-2025', amount: '1800' },
  ];

  // Filter donations based on selected tab
  const getFilteredDonations = () => {
    const today = new Date().toLocaleDateString('en-GB').replace(/\//g, '-'); // Format: DD-MM-YYYY
    switch (selectedTab) {
      case 'today':
        // Filter donations from today (29-07-2025 in sample data)
        return allDonationsHistory.filter(donation => donation.date === '29-07-2025');
      case 'donors':
        // Show all unique donors (you might want different logic here)
        return allDonationsHistory;
      case 'total':
      default:
        // Show all donations
        return allDonationsHistory;
    }
  };

  const donationsHistory = getFilteredDonations();

  const periodOptions = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Last Year'];

  const renderDonationRow = ({ item }) => (
    <View style={donationsPageStyles.historyRow}>
      <View style={[donationsPageStyles.historyCellContainer, { flex: 1.5 }]}>
        <Text style={donationsPageStyles.historyCell} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
      <View style={[donationsPageStyles.historyCellContainer, { flex: 1.5 }]}>
        <Text style={donationsPageStyles.historyCell} numberOfLines={1}>
          {item.location}
        </Text>
      </View>
      <View style={[donationsPageStyles.historyCellContainer, { flex: 1 }]}>
        <Text style={donationsPageStyles.historyCell}>
          {item.date}
        </Text>
      </View>
      <View style={[donationsPageStyles.historyCellContainer, { flex: 1, alignItems: 'flex-end' }]}>
        <Text style={donationsPageStyles.historyCell}>
          ₹{item.amount}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={donationsPageStyles.container}>
      {/* Header */}
      <PageHeader title="Donations" onBack={onBack} />

      <ScrollView
        style={donationsPageStyles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Donation Summary Cards */}
        <View style={donationsPageStyles.summaryContainer}>
          <TouchableOpacity
            style={[
              donationsPageStyles.summaryCard,
              selectedTab === 'total' && donationsPageStyles.summaryCardPurple,
              selectedTab !== 'total' && donationsPageStyles.summaryCardInactive,
            ]}
            onPress={() => setSelectedTab('total')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                donationsPageStyles.summaryLabel,
                selectedTab === 'total' && donationsPageStyles.summaryLabelWhite
              ]}
              numberOfLines={1}
            >
              Total Donation
            </Text>
            <Text style={[
              selectedTab === 'total' ? donationsPageStyles.summaryAmountWhite : donationsPageStyles.summaryAmount
            ]}>
              ₹ {donationsSummary.total}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              donationsPageStyles.summaryCard,
              selectedTab === 'today' && donationsPageStyles.summaryCardPurple,
              selectedTab !== 'today' && donationsPageStyles.summaryCardInactive,
            ]}
            onPress={() => setSelectedTab('today')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                donationsPageStyles.summaryLabel,
                selectedTab === 'today' && donationsPageStyles.summaryLabelWhite
              ]}
              numberOfLines={1}
            >
              Donation Today
            </Text>
            <Text style={[
              selectedTab === 'today' ? donationsPageStyles.summaryAmountWhite : donationsPageStyles.summaryAmount
            ]}>
              ₹ {donationsSummary.today}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              donationsPageStyles.summaryCard,
              selectedTab === 'donors' && donationsPageStyles.summaryCardPurple,
              selectedTab !== 'donors' && donationsPageStyles.summaryCardInactive,
            ]}
            onPress={() => setSelectedTab('donors')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                donationsPageStyles.summaryLabel,
                selectedTab === 'donors' && donationsPageStyles.summaryLabelWhite
              ]}
              numberOfLines={1}
            >
              Total Donor
            </Text>
            <Text style={[
              selectedTab === 'donors' ? donationsPageStyles.summaryAmountWhite : donationsPageStyles.summaryAmount
            ]}>
              {donationsSummary.totalDonors}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={donationsPageStyles.historySection}>
          <Text>Graph</Text>
        </View>

        {/* Donations History */}
        <View style={donationsPageStyles.historySection}>
          <Text style={donationsPageStyles.historyTitle}>Donations History</Text>

          {/* Table Header */}
          <View style={donationsPageStyles.historyHeader}>
            <View style={[donationsPageStyles.historyHeaderCellContainer, { flex: 1.5 }]}>
              <Text style={donationsPageStyles.historyHeaderCell}>Name</Text>
            </View>
            <View style={[donationsPageStyles.historyHeaderCellContainer, { flex: 1.5 }]}>
              <Text style={donationsPageStyles.historyHeaderCell}>Location</Text>
            </View>
            <View style={[donationsPageStyles.historyHeaderCellContainer, { flex: 1 }]}>
              <Text style={donationsPageStyles.historyHeaderCell}>Date</Text>
            </View>
            <View style={[donationsPageStyles.historyHeaderCellContainer, { flex: 1, alignItems: 'flex-end' }]}>
              <Text style={donationsPageStyles.historyHeaderCell}>Amount</Text>
            </View>
          </View>

          {/* Table Rows */}
          <FlatList
            data={donationsHistory}
            renderItem={renderDonationRow}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

