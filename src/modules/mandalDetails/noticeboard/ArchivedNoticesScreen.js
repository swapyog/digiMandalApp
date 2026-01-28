import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import { NoticeCard } from '../../../components';

export default function ArchivedNoticesScreen({ onBack, type = 'notice' }) {
  const isAnnouncement = type === 'announcement';

  // Sample archived notices grouped by month
  const archivedNotices = {
    'August 2025': [
      {
        id: '1',
        title: 'Mandal Elections 2025',
        date: 'Today',
        description: 'We celebrate our culture, unity, and creativity with passion and pride—ensuring every member feel...',
        attachments: ['Circular 30 Jul 2025.pdf', '+2'],
        isPinned: true,
      },
    ],
    'July 2025': [
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
    ],
    'June 2025': [
      {
        id: '4',
        title: 'Mandal Elections 2025',
        date: 'Today',
        description: 'We celebrate our culture, unity, and creativity with passion and pride—ensuring every member feel...',
        attachments: ['Circular 30 Jul 2025.pdf', '+2'],
        isPinned: true,
      },
    ],
  };

  const archivedAnnouncements = {
    'August 2025': [
      {
        id: 'a1',
        title: 'Lorem ipsum dolor sit amet, consectet adipiscingas elit asde frewd.',
        date: "15 Aug '25",
        description: "To celebrate India's Independence Day on 15th August, we will all be wearing the same dress as a symbol of unity and pride....",
      },
    ],
    'July 2025': [
      {
        id: 'a2',
        title: 'Lorem ipsum dolor sit amet, consectet adipiscingas elit asde frewd.',
        date: "15 Jul '25",
        description: "To celebrate India's Independence Day on 15th August, we will all be wearing the same dress as a symbol of unity and pride....",
      },
    ],
    'June 2025': [
      {
        id: 'a3',
        title: 'Lorem ipsum dolor sit amet, consectet adipiscingas elit asde frewd.',
        date: "15 Jun '25",
        description: "To celebrate India's Independence Day on 15th August, we will all be wearing the same dress as a symbol of unity and pride....",
      },
    ],
  };

  const data = isAnnouncement ? archivedAnnouncements : archivedNotices;

  const renderItem = (item) => (
    <NoticeCard
      key={item.id}
      variant={isAnnouncement ? 'announcement' : 'notice'}
      title={item.title}
      date={item.date}
      description={item.description}
      isPinned={item.isPinned}
      attachments={item.attachments}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Archived"
        onBack={onBack}
        showFilter={true}
        onFilterPress={() => {}}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Object.entries(data).map(([month, items]) => (
          <View key={month} style={styles.monthSection}>
            <Text style={styles.monthTitle}>{month}</Text>
            {items.map(renderItem)}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  monthSection: {
    marginBottom: 24,
  },
  monthTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 12,
  },
});

