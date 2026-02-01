import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../components/ScreenHeader';

const PURPLE = '#7E48DC';
const LIGHT_BG = '#FDF2F8';

export default function EventDetailScreen({
  onBack,
  onVolunteer,
  onJoin,
  event = {},
}) {
  const title = event.title || 'Ganeshotsav 2025';
  const organizer = event.organizer || 'Vasant Kunj Cultural Association, at Thane with very very long name';
  const dateTime = event.dateTime || 'Wed, August 27, 2025 at 11.00 AM';
  const location = event.location || 'Vasant Kunj, Pawar Nagar, Thane';
  const price = event.price || '₹200';
  const image = event.image || 'https://picsum.photos/400/280?random=ganesh';
  const overlayText = event.overlayText || 'गणेशउत्सव';
  const overlayYear = event.overlayYear || '२०२५';
  const description = event.description || "Ganpati Bappa Mory!\n\nJoin us as we welcome Lord Ganesha into our Mandal with great joy, devotion, and enthusiasm. This year's Ganesh Chaturthi will be filled with spiritual energy, cultural performances, and community bonding.\n\nLet's come together to celebrate the arrival of Vighnaharta, the remover of obstacles, and seek his blessings for peace, prosperity, and unity in our society.";

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title="Event Details"
        onBack={onBack}
        showMenu
        onMenuPress={() => {}}
      />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.bannerWrap}>
          <Image source={{ uri: image }} style={styles.bannerImage} resizeMode="cover" />
          <View style={styles.bannerOverlay}>
            <Text style={styles.overlayLine1}>{overlayText}</Text>
            <Text style={styles.overlayLine2}>{overlayYear}</Text>
          </View>
        </View>

        {/* Summary card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View style={styles.summaryLeft}>
              <Text style={styles.eventTitle}>{title}</Text>
              <Text style={styles.organizer} numberOfLines={1}>{organizer}</Text>
            </View>
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeMonth}>Aug</Text>
              <Text style={styles.dateBadgeDay}>27</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <Icon name="event" size={16} color="#6b7280" />
            <Text style={styles.summaryText}>{dateTime}</Text>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Religious</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <Icon name="location-on" size={16} color="#6b7280" />
            <Text style={styles.summaryText}>{location}</Text>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{price}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onVolunteer} style={styles.volunteerLink}>
            <Text style={styles.volunteerLinkText}>Become a Volunteer</Text>
          </TouchableOpacity>
        </View>

        {/* Event Details */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconWrap}>
              <Icon name="send" size={16} color="#fff" />
            </View>
            <Text style={styles.sectionTitle}>Event Details</Text>
          </View>
          <Text style={styles.bodyText}>{description}</Text>
        </View>

        {/* Highlights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIconWrap, styles.sectionIconOutline]}>
              <Icon name="star" size={16} color={PURPLE} />
            </View>
            <Text style={styles.sectionTitle}>Highlights of the Day</Text>
          </View>
          <View style={styles.highlightsImageWrap}>
            <View style={styles.highlightsPlaceholder} />
            <TouchableOpacity style={styles.joinButton} onPress={onJoin} activeOpacity={0.8}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>

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
  scroll: {
    flex: 1,
  },
  bannerWrap: {
    width: '100%',
    height: 220,
    backgroundColor: '#111',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    alignItems: 'flex-end',
  },
  overlayLine1: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FACC15',
  },
  overlayLine2: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FACC15',
    marginTop: 2,
  },
  summaryCard: {
    backgroundColor: '#fff',
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  summaryLeft: {
    flex: 1,
    marginRight: 12,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  organizer: {
    fontSize: 13,
    color: '#6b7280',
  },
  dateBadge: {
    backgroundColor: PURPLE,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 56,
  },
  dateBadgeMonth: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  dateBadgeDay: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryText: {
    flex: 1,
    fontSize: 13,
    color: '#374151',
    marginLeft: 8,
  },
  tag: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: PURPLE,
  },
  volunteerLink: {
    marginTop: 12,
  },
  volunteerLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: PURPLE,
    textDecorationLine: 'underline',
  },
  section: {
    backgroundColor: LIGHT_BG,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sectionIconOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: PURPLE,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  bodyText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },
  highlightsImageWrap: {
    height: 140,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
    position: 'relative',
    overflow: 'hidden',
  },
  highlightsPlaceholder: {
    flex: 1,
  },
  joinButton: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    marginHorizontal: 40,
    backgroundColor: PURPLE,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  bottomSpacer: {
    height: 40,
  },
});
