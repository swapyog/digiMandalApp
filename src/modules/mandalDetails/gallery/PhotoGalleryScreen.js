import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import { AlbumSection, HeaderMenu, EmptyGallery } from './components';
import RemovePhotosScreen from './RemovePhotosScreen';

const PURPLE = '#7E48DC';

// Mock data
const MOCK_ALBUMS = [
  {
    id: '1',
    title: 'Ganpati Fest 2024',
    date: 'September 2024',
    photos: Array.from({ length: 16 }, (_, i) => ({
      id: `1-${i}`,
      uri: `https://picsum.photos/200?random=${i + 1}`,
    })),
  },
  {
    id: '2',
    title: 'Independence Day',
    date: 'August 2024',
    photos: Array.from({ length: 8 }, (_, i) => ({
      id: `2-${i}`,
      uri: `https://picsum.photos/200?random=${i + 20}`,
    })),
  },
  {
    id: '3',
    title: '1 May Kamgar Din',
    date: 'May 2024',
    photos: Array.from({ length: 4 }, (_, i) => ({
      id: `3-${i}`,
      uri: `https://picsum.photos/200?random=${i + 40}`,
    })),
  },
];

export default function PhotoGalleryScreen({
  onBack,
  onAddPhotos,
  onPhotoPress,
}) {
  const [albums, setAlbums] = useState(MOCK_ALBUMS);
  const [headerMenuVisible, setHeaderMenuVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successToastGreen, setSuccessToastGreen] = useState(false);
  const [removePhotosVisible, setRemovePhotosVisible] = useState(false);

  const isEmpty = albums.length === 0;

  const handleAddPhotos = (album) => {
    if (onAddPhotos) {
      onAddPhotos(album);
    }
  };

  const handleHeaderAddPhotos = () => {
    if (onAddPhotos) {
      onAddPhotos(null); // null means create new album
    }
  };

  const handleRemovePhotos = () => {
    setHeaderMenuVisible(false);
    setRemovePhotosVisible(true);
  };

  const handleRemoveDone = (removedIds, count) => {
    setRemovePhotosVisible(false);
    setAlbums((prev) =>
      prev.map((album) => ({
        ...album,
        photos: album.photos.filter((p) => !removedIds.includes(p.id)),
      })).filter((album) => album.photos.length > 0)
    );
    const countStr = String(count).padStart(2, '0');
    setSuccessMessage(`${countStr} Photos has been removed!`);
    setSuccessToastGreen(true);
    setTimeout(() => {
      setSuccessMessage('');
      setSuccessToastGreen(false);
    }, 3000);
  };

  const handleShare = (album) => {
    // TODO: Implement share functionality
  };

  const handleFilter = () => {
    // TODO: Implement filter
  };

  if (removePhotosVisible) {
    return (
      <RemovePhotosScreen
        onBack={() => setRemovePhotosVisible(false)}
        onClose={() => setRemovePhotosVisible(false)}
        onRemove={handleRemoveDone}
        albums={albums}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title="Photo Gallery"
        onBack={onBack}
        showMenu
        onMenuPress={() => setHeaderMenuVisible(true)}
      />

      {isEmpty ? (
        <EmptyGallery />
      ) : (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {albums.map((album) => (
            <AlbumSection
              key={album.id}
              album={album}
              onAddPhotos={handleAddPhotos}
              onShare={handleShare}
              onRemovePhotos={handleRemovePhotos}
              onPhotoPress={onPhotoPress}
            />
          ))}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      )}

      {/* Success Toast */}
      {successMessage !== '' && (
        <View style={[styles.toast, successToastGreen && styles.toastGreen]}>
          <Text style={[styles.toastText, successToastGreen && styles.toastTextDark]}>
            {successMessage}
          </Text>
        </View>
      )}

      <HeaderMenu
        visible={headerMenuVisible}
        onClose={() => setHeaderMenuVisible(false)}
        onFilter={handleFilter}
        onAddPhotos={handleHeaderAddPhotos}
        onRemovePhotos={handleRemovePhotos}
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
  bottomSpacer: {
    height: 24,
  },
  toast: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#1f2937',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  toastGreen: {
    backgroundColor: '#D1FAE5',
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
  },
  toastTextDark: {
    color: '#111827',
  },
});
