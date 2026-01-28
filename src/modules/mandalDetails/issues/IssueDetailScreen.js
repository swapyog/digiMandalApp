import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../components/ScreenHeader';
import { IssueStatusTag } from './components';

const PURPLE = '#7b3cff';

export default function IssueDetailScreen({
  onBack,
  onResolve,
  issue = {},
  associationName = 'Vasant Kunj Cultural Association, at Thane with very very very long name',
}) {
  const [comment, setComment] = useState('');
  const [commentsExpanded, setCommentsExpanded] = useState(true);

  const title = issue.title || issue.subject || 'TMC Road Damaged behind kranti chowk corner.';
  const reporter = issue.reporter || 'Yogita Shivarkar';
  const supportersCount = issue.membersCount ?? 32;
  const status = issue.status || 'Pending';
  const occurrenceDate = issue.occurrenceDate || "5 Aug '25";
  const publishedDate = issue.publishedDate || "7 Aug '25";
  const description = issue.description || 'I would like to report that the road in the area behind the circle is severely damaged. The condition of the road has become a serious concern for both drivers and pedestrians, posing safety risks and causing inconvenience. We request that the concerned authorities inspect the area as soon as possible and take the necessary steps to repair the damage. Immediate action is needed to prevent further deterioration and ensure public safety.';
  const images = issue.images || [];
  const existingComments = issue.comments || [
    { id: '1', author: 'Yogita Shivarka', date: '15/08/2025', text: 'Could you please confirm if the road repair issue behind the circle has been resolved?' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Issue Details"
        onBack={onBack}
        rightElement={
          <View style={styles.headerRight}>
            <IssueStatusTag status={status} />
          </View>
        }
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.association} numberOfLines={2}>{associationName}</Text>
        <Text style={styles.reporter}>By {reporter}</Text>
        <View style={styles.supportersRow}>
          <View style={styles.avatars}>
            <View style={[styles.avatar]} />
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
            {images.slice(0, 4).map((img, i) => (
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
        <View style={styles.commentsSection}>
          <TouchableOpacity
            style={styles.commentsHeader}
            onPress={() => setCommentsExpanded(!commentsExpanded)}
          >
            <Text style={styles.commentsTitle}>Comments</Text>
            <Icon name={commentsExpanded ? 'expand-less' : 'expand-more'} size={24} color="#111827" />
          </TouchableOpacity>
          {commentsExpanded && existingComments.map((c) => (
            <View key={c.id} style={styles.commentBubble}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentAuthor}>{c.author}</Text>
                <Text style={styles.commentDate}>{c.date}</Text>
                <TouchableOpacity><Icon name="more-vert" size={20} color="#6b7280" /></TouchableOpacity>
              </View>
              <Text style={styles.commentText}>{c.text}</Text>
            </View>
          ))}
        </View>
        <View style={styles.commentInputRow}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write your comment here..."
            placeholderTextColor="#9ca3af"
            value={comment}
            onChangeText={setComment}
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <Icon name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
        {onResolve && (
          <TouchableOpacity style={styles.resolveButton} onPress={onResolve}>
            <Text style={styles.resolveButtonText}>Resolve Issue</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, paddingHorizontal: 16 },
  headerRight: { marginRight: 8, flexDirection: 'row', alignItems: 'center' },
  resolveButton: {
    marginTop: 16,
    marginBottom: 24,
    backgroundColor: PURPLE,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  resolveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  title: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 8, marginTop: 16 },
  association: { fontSize: 14, color: '#6b7280', marginBottom: 4 },
  reporter: { fontSize: 14, color: '#6b7280', marginBottom: 12 },
  supportersRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
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
  avatar2: {},
  avatar3: {},
  supportersText: { flex: 1, fontSize: 14, color: PURPLE, fontWeight: '500' },
  dateRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  dateChip: { backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  dateChipText: { fontSize: 12, color: '#6b7280' },
  body: { fontSize: 14, color: '#111827', lineHeight: 22, marginBottom: 24 },
  imagesSection: { gap: 12, marginBottom: 24 },
  imgWrap: { borderRadius: 12, overflow: 'hidden' },
  img: { width: '100%', height: 180, borderRadius: 12, backgroundColor: '#f3f4f6' },
  imgPlaceholder: {},
  commentsSection: { marginBottom: 24 },
  commentsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  commentsTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
  commentBubble: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  commentHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  commentAuthor: { flex: 1, fontSize: 14, fontWeight: '600', color: '#111827' },
  commentDate: { fontSize: 12, color: '#6b7280', marginRight: 8 },
  commentText: { fontSize: 14, color: '#374151', lineHeight: 20 },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
    paddingBottom: 24,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
    maxHeight: 100,
    minHeight: 44,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
});
