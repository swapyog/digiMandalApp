import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PURPLE = '#7E48DC';

export default function EventThankYouScreen({
  onDone,
  date = '22/09/2025',
  time = '10:00 AM',
  venue = 'Pawar Nagar, Thane',
}) {
  const [reminder, setReminder] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.cloudLeft}>
          <Icon name="cloud" size={40} color="#E9D5FF" />
        </View>
        <View style={styles.cloudRight}>
          <Icon name="cloud" size={32} color="#E9D5FF" />
        </View>
        <View style={styles.heartWrap}>
          <Icon name="favorite" size={24} color="#C4B5FD" />
        </View>
        <View style={styles.starWrap}>
          <Icon name="star" size={24} color="#C4B5FD" />
        </View>

        <Text style={styles.title}>Thank you for</Text>
        <Text style={styles.title}>the participation</Text>

        <View style={styles.card}>
          <Text style={styles.cardLine}>Your registration is confirmed</Text>
          <Text style={styles.cardLine}>for the event.</Text>
          <Text style={styles.cardDetail}>Date: {date}</Text>
          <Text style={styles.cardDetail}>Time: {time}</Text>
          <Text style={styles.cardDetail}>Venue: {venue}</Text>
        </View>

        <TouchableOpacity
          style={styles.reminderRow}
          onPress={() => setReminder(!reminder)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, reminder && styles.checkboxChecked]}>
            {reminder && <Icon name="check" size={16} color="#fff" />}
          </View>
          <Text style={styles.reminderText}>Do you want to set reminder?</Text>
        </TouchableOpacity>

        <View style={styles.planeWrap}>
          <Icon name="flight" size={28} color={PURPLE} />
        </View>
      </View>

      <View style={styles.waveWrap}>
        <TouchableOpacity style={styles.doneButton} onPress={onDone} activeOpacity={0.8}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  cloudLeft: {
    position: 'absolute',
    top: 60,
    left: 24,
  },
  cloudRight: {
    position: 'absolute',
    top: 100,
    right: 32,
  },
  heartWrap: {
    position: 'absolute',
    left: 40,
    top: '38%',
  },
  starWrap: {
    position: 'absolute',
    right: 40,
    top: '36%',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginTop: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  cardLine: {
    fontSize: 15,
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardDetail: {
    fontSize: 14,
    color: '#374151',
    marginTop: 8,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderRadius: 12,
    padding: 16,
    alignSelf: 'stretch',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: PURPLE,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },
  reminderText: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  planeWrap: {
    position: 'absolute',
    bottom: 140,
    left: 32,
  },
  waveWrap: {
    backgroundColor: '#E9D5FF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    alignItems: 'center',
  },
  doneButton: {
    backgroundColor: PURPLE,
    paddingVertical: 16,
    paddingHorizontal: 80,
    borderRadius: 28,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
