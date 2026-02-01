import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../components/ScreenHeader';

const PURPLE = '#7E48DC';
const DARK_BG = '#0b021b';

const MONTHS = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];

const UPCOMING_EVENTS = [
  {
    id: '1',
    title: 'Ganeshotsav 2025',
    overlayText: 'गणेशउत्सव २०२५',
    image: 'https://picsum.photos/400/220?random=ganesh',
    dateRange: '27/08/2025 - 06/09/2025',
    location: 'Vasant Kunj, Pawar Nagar, Thane',
    attendeesCount: 123,
    price: '₹200',
    attendees: [1, 2, 3],
  },
  {
    id: '2',
    title: 'Navratri 2025',
    overlayText: 'नवरात्रि २०२५',
    image: 'https://picsum.photos/400/220?random=navratri',
    dateRange: '22/09/2025',
    location: 'Vasant Kunj, Pawar Nagar, Thane',
    attendeesCount: 123,
    price: '₹200',
    attendees: [1, 2, 3],
  },
  {
    id: '3',
    title: 'Diwali Celebration 2025',
    overlayText: 'दिवाळी २०२५',
    image: 'https://picsum.photos/400/220?random=diwali',
    dateRange: '20/10/2025',
    location: 'Vasant Kunj, Pawar Nagar, Thane',
    attendeesCount: 89,
    price: '₹150',
    attendees: [1, 2, 3],
  },
];

const LIVE_EVENTS = [
  {
    id: '4',
    title: 'Republic Day Celebration',
    overlayText: 'प्रजासत्ताक दिन',
    image: 'https://picsum.photos/400/220?random=republic',
    dateRange: '26/01/2025',
    location: 'Vasant Kunj, Pawar Nagar, Thane',
    attendeesCount: 245,
    price: 'Free',
    attendees: [1, 2, 3],
  },
  {
    id: '5',
    title: 'Bhajan Evening',
    overlayText: 'भजन संध्या',
    image: 'https://picsum.photos/400/220?random=bhajan',
    dateRange: '31/01/2025',
    location: 'Vasant Kunj, Pawar Nagar, Thane',
    attendeesCount: 67,
    price: 'Free',
    attendees: [1, 2, 3],
  },
];

function EventCard({ event, onPress }) {
  return (
    <TouchableOpacity style={styles.eventCard} onPress={() => onPress && onPress(event)} activeOpacity={0.9}>
      <View style={styles.eventImageWrap}>
        <Image source={{ uri: event.image }} style={styles.eventImage} resizeMode="cover" />
        <View style={styles.overlayTextWrap}>
          <Text style={styles.overlayText}>{event.overlayText}</Text>
        </View>
      </View>
      <View style={styles.eventBody}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={styles.eventRow}>
          <Icon name="calendar-today" size={14} color="#6b7280" />
          <Text style={styles.eventMeta}>{event.dateRange}</Text>
        </View>
        <View style={styles.eventRow}>
          <Icon name="location-on" size={14} color="#6b7280" />
          <Text style={styles.eventMeta}>{event.location}</Text>
        </View>
        <View style={styles.eventFooter}>
          <View style={styles.avatarsRow}>
            <View style={[styles.avatar, styles.avatar1]} />
            <View style={[styles.avatar, styles.avatar2]} />
            <View style={[styles.avatar, styles.avatar3]} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>+{event.attendeesCount}</Text>
            </View>
          </View>
          <Text style={styles.price}>{event.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function AllEventsScreen({ onBack, onAddEvent, onEventPress }) {
  const [tab, setTab] = useState('Upcoming');
  const [selectedMonth, setSelectedMonth] = useState('Aug');

  const displayEvents = tab === 'Upcoming' ? UPCOMING_EVENTS : LIVE_EVENTS;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack} style={styles.headerBack}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Events</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={onAddEvent} style={styles.addTextBtn}>
            <Text style={styles.addText}>ADD</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onAddEvent} style={styles.addIconBtn}>
            <Icon name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tab, tab === 'Upcoming' && styles.tabActive]}
          onPress={() => setTab('Upcoming')}
        >
          <Text style={[styles.tabText, tab === 'Upcoming' && styles.tabTextActive]}>
            Upcoming Events
          </Text>
          {tab === 'Upcoming' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'Live' && styles.tabActive]}
          onPress={() => setTab('Live')}
        >
          <Text style={[styles.tabText, tab === 'Live' && styles.tabTextActive]}>Live</Text>
          {tab === 'Live' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
      </View>

      {/* Month strip */}
      <View style={styles.monthStrip}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.monthStripContent}
          style={styles.monthStripScroll}
        >
          {MONTHS.map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.monthChip, selectedMonth === m && styles.monthChipActive]}
              onPress={() => setSelectedMonth(m)}
            >
              <Text style={[styles.monthText, selectedMonth === m && styles.monthTextActive]}>{m}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {displayEvents.map((event) => (
          <EventCard key={event.id} event={event} onPress={onEventPress} />
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
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  headerBack: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addTextBtn: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginRight: 4,
  },
  addText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  addIconBtn: {
    padding: 8,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: DARK_BG,
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
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 2,
    backgroundColor: PURPLE,
  },
  monthStrip: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    minHeight: 52,
    justifyContent: 'center',
  },
  monthStripScroll: {
    flexGrow: 0,
  },
  monthStripContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  monthChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
  },
  monthChipActive: {
    backgroundColor: PURPLE,
  },
  monthText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  monthTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  eventImageWrap: {
    width: '100%',
    height: 180,
    backgroundColor: '#e5e7eb',
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  overlayTextWrap: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  overlayText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FACC15',
  },
  eventBody: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventMeta: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 6,
  },
  eventFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatar1: { marginLeft: 0 },
  avatar2: { marginLeft: -8 },
  avatar3: { marginLeft: -8 },
  badge: {
    backgroundColor: PURPLE,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  bottomSpacer: {
    height: 24,
  },
});
