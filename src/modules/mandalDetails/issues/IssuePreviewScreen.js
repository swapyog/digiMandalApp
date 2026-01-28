import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../components/ScreenHeader';
import ActionButton from '../components/ActionButton';
import { IssueStatusTag } from './components';

const PURPLE = '#7b3cff';

export default function IssuePreviewScreen({
  onBack,
  onNext,
  issueData = {},
  associationName = 'Vasant Kunj Cultural Association, at Thane with very very very long name',
}) {
  const title = issueData.subject || 'TMC Road Damaged behind kranti chowk corner.';
  const reporter = issueData.reporterName || 'Yogita Shivarkar';
  const supportersCount = issueData.selectedMembers?.length ?? 32;
  const occurrenceDate = issueData.occurrenceDate || "5 Aug '25";
  const publishedDate = issueData.publishedDate || "7 Aug '25";
  const description = issueData.description || 'I would like to report that the road in the area behind the circle is severely damaged. The condition of the road has become a serious concern for both drivers and pedestrians, posing safety risks and causing inconvenience. We request that the concerned authorities inspect the area as soon as possible and take the necessary steps to repair the damage. Immediate action is needed to prevent further deterioration and ensure public safety.';
  const images = issueData.photos || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Issue Preview" onBack={onBack} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.association} numberOfLines={2}>{associationName}</Text>
        <Text style={styles.reporter}>By {reporter}</Text>
        <View style={styles.supportersRow}>
          <View style={styles.avatars}>
            <View style={[styles.avatar, styles.avatar1]} />
            <View style={[styles.avatar, styles.avatar2]} />
            <View style={[styles.avatar, styles.avatar3]} />
          </View>
          <Text style={styles.supportersText}>+{supportersCount} Supporters</Text>
          <Icon name="chevron-right" size={20} color="#6b7280" />
        </View>
        <View style={styles.dateRow}>
          <View style={styles.dateChip}>
            <Text style={styles.dateChipText}>Issue Occurance {occurrenceDate}</Text>
          </View>
          <View style={styles.dateChip}>
            <Text style={styles.dateChipText}>Published on {publishedDate}</Text>
          </View>
        </View>
        <Text style={styles.body}>{description}</Text>
        {images.length > 0 && (
          <View style={styles.imagesSection}>
            {images.slice(0, 2).map((img, i) => (
              <View key={i} style={styles.imgWrap}>
                {typeof img === 'string' ? (
                  <Image source={{ uri: img }} style={styles.img} />
                ) : (
                  <View style={[styles.img, styles.imgPlaceholder]} />
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <ActionButton title="Next" onPress={onNext} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, paddingHorizontal: 16 },
  title: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 8 },
  association: { fontSize: 14, color: '#6b7280', marginBottom: 4 },
  reporter: { fontSize: 14, color: '#6b7280', marginBottom: 12 },
  supportersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatars: { flexDirection: 'row', marginRight: 8 },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e5e7eb',
    marginLeft: -8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatar1: { marginLeft: 0 },
  avatar2: {},
  avatar3: {},
  supportersText: { flex: 1, fontSize: 14, color: PURPLE, fontWeight: '500' },
  dateRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  dateChip: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  dateChipText: { fontSize: 12, color: '#6b7280' },
  body: { fontSize: 14, color: '#111827', lineHeight: 22, marginBottom: 24 },
  imagesSection: { gap: 12, marginBottom: 24 },
  imgWrap: { borderRadius: 12, overflow: 'hidden' },
  img: { width: '100%', height: 180, borderRadius: 12, backgroundColor: '#f3f4f6' },
  imgPlaceholder: {},
});
