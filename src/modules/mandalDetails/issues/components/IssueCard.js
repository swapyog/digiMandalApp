import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IssueStatusTag from './IssueStatusTag';

const PURPLE = '#7b3cff';

export default function IssueCard({
  title = '',
  reporter = '',
  membersCount,
  status = 'Pending',
  description = '',
  images = [],
  onPress,
  onReadMorePress,
  compact = false,
}) {
  const reporterLine = membersCount != null
    ? `By ${reporter} + ${membersCount} Members`
    : `By ${reporter}`;

  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.cardCompact]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Icon name="error-outline" size={24} color="#fff" />
        </View>
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            <IssueStatusTag status={status} />
          </View>
          <Text style={styles.reporter}>{reporterLine}</Text>

        </View>
      </View>
      <View className="row">
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
        {onReadMorePress && (
          <TouchableOpacity onPress={onReadMorePress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.readMore}>Read More</Text>
          </TouchableOpacity>
        )}
        {images && images.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.gallery}
            contentContainerStyle={styles.galleryContent}
          >
              {images.slice(0, 4).map((img, idx) => {
                const uri = typeof img === 'string' ? img : img?.uri;
                return (
                <View key={idx} style={styles.thumbWrap}>
                  {uri ? (
                    <Image source={{ uri }} style={styles.thumb} />
                  ) : (
                    <View style={[styles.thumb, styles.thumbPlaceholder]} />
                  )}
                  {idx === 3 && images.length > 4 && (
                    <View style={styles.thumbOverlay}>
                      <Text style={styles.thumbOverlayText}>+{images.length - 4}</Text>
                    </View>
                  )}
                </View>
              );
              })}
          </ScrollView>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardCompact: {
    padding: 12,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6b7280',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  reporter: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  readMore: {
    fontSize: 14,
    color: PURPLE,
    fontWeight: '500',
    marginTop: 4,
  },
  gallery: {
    marginTop: 12,
  },
  galleryContent: {
    gap: 8,
  },
  thumbWrap: {
    width: 72,
    height: 72,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  thumbPlaceholder: {},
  thumbOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbOverlayText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
