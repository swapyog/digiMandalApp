import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../components/ScreenHeader';
import { PhotoGrid, RemoveConfirmModal } from './components';

const PURPLE = '#7E48DC';

function RemoveAlbumSection({
  album,
  collapsed,
  onToggleCollapse,
  selectedIds,
  onTogglePhoto,
  isFirst,
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>{album.title}</Text>
          <Text style={styles.sectionDate}> • {album.date}</Text>
        </View>
        {isFirst ? (
          <TouchableOpacity
            style={styles.collapseButton}
            onPress={onToggleCollapse}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <View style={styles.collapseCircle}>
              <Icon name="remove" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.menuButton} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Icon name="more-vert" size={20} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>
      {!collapsed && (
        <View style={styles.gridWrap}>
          <PhotoGrid
            photos={album.photos}
            selectionMode
            selectedIds={selectedIds}
            onPhotoPress={(photo) => onTogglePhoto(photo.id)}
          />
        </View>
      )}
    </View>
  );
}

export default function RemovePhotosScreen({
  onBack,
  onClose,
  onRemove,
  albums = [],
}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [collapsedAlbums, setCollapsedAlbums] = useState({});

  const togglePhoto = useCallback((photoId) => {
    setSelectedIds((prev) =>
      prev.includes(photoId) ? prev.filter((id) => id !== photoId) : [...prev, photoId]
    );
  }, []);

  const toggleCollapse = useCallback((albumId) => {
    setCollapsedAlbums((prev) => ({ ...prev, [albumId]: !prev[albumId] }));
  }, []);

  const handleRemove = () => {
    if (selectedIds.length === 0) return;
    setConfirmVisible(true);
  };

  const handleConfirm = () => {
    setConfirmVisible(false);
    if (onRemove) {
      const count = selectedIds.length;
      onRemove(selectedIds, count);
    }
    onBack && onBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title="Remove Photos"
        onBack={onBack}
        rightElement={
          <TouchableOpacity onPress={onClose || onBack} style={{ padding: 8 }}>
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {albums.map((album, index) => (
          <RemoveAlbumSection
            key={album.id}
            album={album}
            collapsed={!!collapsedAlbums[album.id]}
            onToggleCollapse={() => toggleCollapse(album.id)}
            selectedIds={selectedIds}
            onTogglePhoto={togglePhoto}
            isFirst={index === 0}
          />
        ))}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      <TouchableOpacity
        style={[styles.removeButton, selectedIds.length === 0 && styles.removeButtonDisabled]}
        onPress={handleRemove}
        disabled={selectedIds.length === 0}
        activeOpacity={0.8}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>

      <RemoveConfirmModal
        visible={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        onConfirm={handleConfirm}
        selectedCount={selectedIds.length}
      />
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
    paddingTop: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  sectionDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  collapseCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collapseButton: {
    padding: 4,
  },
  menuButton: {
    padding: 4,
  },
  gridWrap: {
    paddingHorizontal: 12,
  },
  bottomSpacer: {
    height: 80,
  },
  removeButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: PURPLE,
    paddingVertical: 16,
    alignItems: 'center',
  },
  removeButtonDisabled: {
    opacity: 0.5,
  },
  removeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
