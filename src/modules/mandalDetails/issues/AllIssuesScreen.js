import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import FilterButton from '../components/FilterButton';
import { IssueCard, IssueFilterModal } from './components';
import IssueSuccessModal from './IssueSuccessModal';

const PURPLE = '#7b3cff';

const MOCK_ISSUES = [
  {
    id: '1',
    title: 'TMC Road Damaged behind kranti chowk corner.',
    reporter: 'Yogita Shivarkar',
    membersCount: 32,
    status: 'Pending',
    description: 'Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra...',
    images: [1, 2, 3, 4, 5, 6],
  },
  {
    id: '2',
    title: 'Main Street Potholes Near City Center',
    reporter: 'Rajesh Kumar',
    membersCount: null,
    status: 'Resolved',
    description: 'Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra...',
    images: [],
  },
  {
    id: '3',
    title: 'Pavement Cracks on Elm Avenue',
    reporter: 'Sarah Adams',
    membersCount: null,
    status: 'Resolved',
    description: 'Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra...',
    images: [],
  },
  {
    id: '4',
    title: 'Bridge Repair Needed at Riverside Crossing',
    reporter: 'Tom Wilson',
    membersCount: 32,
    status: 'Resolved',
    description: 'Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra...',
    images: [],
  },
];

export default function AllIssuesScreen({ onBack, onRaiseIssue, onIssuePress, showFilter = true, successIssue, onSuccessModalClose }) {
  const [activeTab, setActiveTab] = useState('All');
  const [filterVisible, setFilterVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(!!successIssue);

  useEffect(() => {
    if (successIssue) setShowSuccess(true);
  }, [successIssue]);

  const handleSuccessClose = () => {
    setShowSuccess(false);
    if (onSuccessModalClose) onSuccessModalClose();
  };

  const filtered = MOCK_ISSUES.filter((item) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Pending') return item.status === 'Pending' || item.status === 'pending';
    if (activeTab === 'Resolved') return item.status === 'Resolved' || item.status === 'resolved';
    return true;
  });

  const tabs = ['All', 'Pending', 'Resolved'];

  const renderItem = ({ item }) => (
    <IssueCard
      title={item.title}
      reporter={item.reporter}
      membersCount={item.membersCount}
      status={item.status}
      description={item.description}
      images={item.images}
      onPress={() => onIssuePress && onIssuePress(item)}
      onReadMorePress={() => onIssuePress && onIssuePress(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title="Issues"
        onBack={onBack}
        showFilter={showFilter}
        onFilterPress={() => setFilterVisible(true)}
      />
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            {activeTab === tab && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Issues</Text>
          <FilterButton onPress={() => setFilterVisible(true)} />
        </View>
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
        <View style={styles.fabSpacer} />
      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={onRaiseIssue} activeOpacity={0.8}>
        <Text style={styles.fabText}>Raised New Issue</Text>
      </TouchableOpacity>
      <IssueFilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onSelect={() => setFilterVisible(false)}
      />
      <IssueSuccessModal
        visible={showSuccess && !!successIssue}
        onClose={handleSuccessClose}
        issue={successIssue ? { title: successIssue.subject, reporter: successIssue.reporterName || 'Member', membersCount: successIssue.selectedMembers?.length, status: 'Pending', description: successIssue.description, images: successIssue.photos } : {}}
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
  tabActive: {},
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
  fabSpacer: {
    height: 72,
  },
  fab: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
    backgroundColor: PURPLE,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
