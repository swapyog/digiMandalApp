import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../components/ScreenHeader';

const PURPLE = '#7E48DC';
const DARK_BG = '#0b021b';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const AUG_DATES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const EVENT_DATES = [18, 20, 27, 30];

const SCHEDULED_EVENTS = [
  { id: '1', day: 27, month: 'Aug', title: 'Ganeshotsav 2025', time: '11:00 AM', location: 'Ganpati Chowk', image: 'https://picsum.photos/80/80?random=g' },
  { id: '2', day: 22, month: 'Sep', title: 'Navratri 2025', time: '10:00 AM', location: 'Pawar Nagar, Thane', image: 'https://picsum.photos/80/80?random=n' },
];

export default function ScheduledEventsScreen({ onBack, onAdd, onEventPress }) {
  const [selectedDate, setSelectedDate] = useState(18);
  const [month, setMonth] = useState('Aug');
  const [year, setYear] = useState(2025);

  const hasEvent = (d) => EVENT_DATES.includes(d);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack} style={styles.headerBtn}>
          <Icon name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Scheduled Events</Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            Vasant Kunj Cultural Association, at Thane with...
          </Text>
        </View>
        <TouchableOpacity onPress={onAdd} style={styles.headerBtn}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Calendar widget */}
      <View style={styles.calendarCard}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity style={styles.todayBtn}>
            <Text style={styles.todayText}>Today</Text>
          </TouchableOpacity>
          <View style={styles.monthNav}>
            <TouchableOpacity><Icon name="chevron-left" size={24} color="#6b7280" /></TouchableOpacity>
            <Text style={styles.monthYear}>{month} {year}</Text>
            <TouchableOpacity><Icon name="chevron-right" size={24} color="#6b7280" /></TouchableOpacity>
          </View>
          <TouchableOpacity><Icon name="search" size={22} color="#6b7280" /></TouchableOpacity>
          <View style={styles.dateBadge}>
            <Text style={styles.dateBadgeText}>18</Text>
          </View>
        </View>
        <View style={styles.weekRow}>
          {DAYS.map((d) => (
            <Text key={d} style={styles.weekDay}>{d}</Text>
          ))}
        </View>
        <View style={styles.datesGrid}>
          {AUG_DATES.slice(0, 28).map((d) => (
            <TouchableOpacity
              key={d}
              style={[
                styles.dateCell,
                selectedDate === d && styles.dateCellSelected,
              ]}
              onPress={() => setSelectedDate(d)}
            >
              <Text style={[
                styles.dateNum,
                selectedDate === d && styles.dateNumSelected,
              ]}>{d}</Text>
              {hasEvent(d) && <View style={styles.dot} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.sectionLabel}>Aug 2025</Text>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {SCHEDULED_EVENTS.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventRow}
            onPress={() => onEventPress && onEventPress(event)}
            activeOpacity={0.7}
          >
            <View style={styles.eventDateWrap}>
              <Text style={styles.eventDay}>{event.day}</Text>
              <Text style={styles.eventMonth}>{event.month}</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventMeta}>{event.time} • {event.location}</Text>
            </View>
            <Image source={{ uri: event.image }} style={styles.eventThumb} />
          </TouchableOpacity>
        ))}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DARK_BG,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  headerBtn: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  calendarCard: {
    backgroundColor: '#f3f4f6',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  todayBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  todayText: {
    fontSize: 14,
    fontWeight: '600',
    color: PURPLE,
  },
  monthNav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  monthYear: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  dateBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  dateBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center',
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateCell: {
    width: '14.28%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dateCellSelected: {
    backgroundColor: PURPLE,
    borderRadius: 20,
    marginHorizontal: '2%',
  },
  dateNum: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  dateNumSelected: {
    color: '#fff',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: PURPLE,
    marginTop: 4,
  },
  sectionLabel: {
    fontSize: 13,
    color: '#6b7280',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  list: {
    flex: 1,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  eventDateWrap: {
    width: 44,
    marginRight: 16,
  },
  eventDay: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  eventMonth: {
    fontSize: 12,
    color: '#6b7280',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  eventMeta: {
    fontSize: 12,
    color: '#6b7280',
  },
  eventThumb: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
  bottomSpacer: {
    height: 40,
  },
});
