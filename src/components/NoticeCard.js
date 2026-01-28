import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PURPLE = '#7b3cff';

export default function NoticeCard({
  title = '',
  date = '',
  description = '',
  isPinned = false,
  attachments = [],
  onPress,
  onReadMorePress,
  containerStyle,
  variant = 'notice', // 'notice' | 'announcement'
}) {
  const isAnnouncement = variant === 'announcement';

  if (isAnnouncement) {
    return (
      <TouchableOpacity
        style={[styles.noticeCard, styles.announcementCard, containerStyle]}
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
      >
        <View style={styles.announcementRow}>
          <View style={styles.announcementIconWrap}>
            <Icon name="campaign" size={22} color={PURPLE} />
          </View>
          <View style={styles.announcementContent}>
            <View style={styles.announcementHeader}>
              <Text style={styles.announcementTitle} numberOfLines={2}>{title}</Text>
              <Text style={styles.noticeDate}>{date}</Text>
            </View>
            <Text style={styles.noticeDescription} numberOfLines={2}>
              {description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={[styles.noticeCard, containerStyle]} 
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.noticeHeader}>
        {isPinned && <Icon name="push-pin" size={20} color={PURPLE} />}
        <Text style={styles.noticeTitle}>{title}</Text>
        <Text style={styles.noticeDate}>{date}</Text>
      </View>
      <View style={styles.descriptionRow}>
        <Text style={styles.noticeDescription} numberOfLines={2}>
          {description}
        </Text>
        <TouchableOpacity onPress={onReadMorePress}>
          <Text style={styles.readMoreText}>Read More</Text>
        </TouchableOpacity>
      </View>
      {attachments && attachments.length > 0 && (
        <View style={styles.attachmentsRow}>
          <View style={styles.attachmentItem}>
            <Icon name="picture-as-pdf" size={16} color={PURPLE} />
            <Text style={styles.attachmentText}>{attachments[0]}</Text>
          </View>
          {attachments[1] && (
            <TouchableOpacity style={styles.attachmentCount}>
              <Text style={styles.attachmentCountText}>{attachments[1]}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  noticeCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E7EDF3',
  },
  announcementCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  announcementRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  announcementIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  announcementContent: {
    flex: 1,
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 6,
    gap: 8,
  },
  announcementTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  noticeTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  noticeDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  noticeDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    flex: 1,
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
    gap: 8,
  },
  readMoreText: {
    fontSize: 14,
    color: PURPLE,
    fontWeight: '500',
  },
  attachmentsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachmentItem: {
    flexDirection: 'row',
    backgroundColor: '#F6F2FC',
    paddingHorizontal: 12,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
  },
  attachmentText: {
    fontSize: 12,
    color: '#111827',
    marginLeft: 8,
  },
  attachmentCount: {
    backgroundColor: '#F6F2FC',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  attachmentCountText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
  },
});

