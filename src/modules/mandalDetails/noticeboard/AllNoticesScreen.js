import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import FilterButton from '../components/FilterButton';
import DateFilterModal from './DateFilterModal';
import NoticeSortFilterModal from './NoticeSortFilterModal';
import { NoticeCard } from '../../../components';

const PURPLE = '#7b3cff';

export default function AllNoticesScreen({ onBack, onNavigateToArchived, onDeletePress, initialTab = 'Notice' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortFilterVisible, setSortFilterVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const notices = [
    {
      id: '1',
      title: 'Mandal Elections 2025',
      date: 'Today',
      description: 'We celebrate our culture, unity, and creativity with passion and pride—ensuring every member feel...',
      attachments: ['Circular 30 Jul 2025.pdf', '+2'],
      isPinned: true,
    },
    {
      id: '2',
      title: 'Mandal Elections 2025',
      date: 'Today',
      description: 'We celebrate our culture, unity, and creativity with passion and pride—ensuring every member feel...',
      attachments: ['Circular 30 Jul 2025.pdf', '+2'],
      isPinned: true,
    },
    {
      id: '3',
      title: 'Mandal Elections 2025',
      date: 'Today',
      description: 'We celebrate our culture, unity, and creativity with passion and pride—ensuring every member feel...',
      attachments: ['Circular 30 Jul 2025.pdf', '+2'],
      isPinned: true,
    },
  ];

  const announcements = [
    {
      id: 'a1',
      title: 'Independence Day Dress Code',
      date: 'Today',
      description: "To celebrate India's Independence Day on 15th August, we will all be wearing the same dress as a symbol of unity and pride....",
    },
    {
      id: 'a2',
      title: 'Lorem ipsum dolor sit amet, consectet adipiscingas elit asde frewd.',
      date: 'Today',
      description: "To celebrate India's Independence Day on 15th August, we will all be wearing the same dress as a symbol of unity and pride....",
    },
    {
      id: 'a3',
      title: 'Independence Day Dress Code',
      date: 'Today',
      description: "To celebrate India's Independence Day on 15th August, we will all be wearing the same dress as a symbol of unity and pride....",
    },
  ];

  const handleFilterPress = () => {
    if (activeTab === 'Announcements') {
      setSortFilterVisible(true);
    } else {
      setFilterVisible(true);
    }
  };

  const handleSortFilterSelect = (id) => {
    if (id === 'date') setFilterVisible(true);
  };

  const renderNotice = ({ item }) => (
    <NoticeCard
      title={item.title}
      date={item.date}
      description={item.description}
      isPinned={item.isPinned}
      attachments={item.attachments}
    />
  );

  const renderAnnouncement = ({ item }) => (
    <NoticeCard
      variant="announcement"
      title={item.title}
      date={item.date}
      description={item.description}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader 
        title="All Notices" 
        onBack={onBack} 
        showArchive={true}
        onArchivePress={() => {
          if (onNavigateToArchived) {
            onNavigateToArchived(activeTab);
          }
        }}
        showDelete={true}
        onDeletePress={onDeletePress || (() => {})}
      />
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Notice' && styles.tabActive]}
          onPress={() => setActiveTab('Notice')}
        >
          <Text style={[styles.tabText, activeTab === 'Notice' && styles.tabTextActive]}>
            Notice
          </Text>
          {activeTab === 'Notice' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Announcements' && styles.tabActive]}
          onPress={() => setActiveTab('Announcements')}
        >
          <Text style={[styles.tabText, activeTab === 'Announcements' && styles.tabTextActive]}>
            Announcements
          </Text>
          {activeTab === 'Announcements' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {activeTab === 'Announcements' ? 'All announcement' : 'All Notices'}
          </Text>
          <FilterButton onPress={handleFilterPress} />
        </View>

        {activeTab === 'Notice' && (
          <FlatList
            data={notices}
            renderItem={renderNotice}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        )}
        {activeTab === 'Announcements' && (
          <FlatList
            data={announcements}
            renderItem={renderAnnouncement}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        )}
      </ScrollView>

      <NoticeSortFilterModal
        visible={sortFilterVisible}
        onClose={() => setSortFilterVisible(false)}
        onSelect={handleSortFilterSelect}
      />
      <DateFilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onApply={(year, month) => {
          setSelectedYear(year);
          setSelectedMonth(month);
          setFilterVisible(false);
        }}
        applyButtonLabel={activeTab === 'Announcements' ? 'Done' : 'Apply Filter'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#3D2A6B',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  tabActive: {
    // Active styling handled by underline
  },
  tabText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: PURPLE,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
});

