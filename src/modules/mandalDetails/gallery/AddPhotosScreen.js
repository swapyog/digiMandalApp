import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { pick, types, errorCodes, isErrorWithCode } from '@react-native-documents/picker';
import ScreenHeader from '../components/ScreenHeader';
import { PhotoGrid, AddTitleModal } from './components';

const PURPLE = '#7E48DC';

const checkDocumentPickerAvailable = () => {
  if (typeof pick !== 'function') {
    Alert.alert(
      'Module Not Available',
      'Document picker module is not properly linked. Please rebuild the app:\n\n' +
        (Platform.OS === 'ios'
          ? '1. Run: cd ios && pod install && cd ..\n2. Rebuild the app in Xcode'
          : '1. Clean and rebuild the Android app'),
      [{ text: 'OK' }]
    );
    return false;
  }
  return true;
};

export default function AddPhotosScreen({
  onBack,
  onDone,
  album = null,
}) {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [titleModalVisible, setTitleModalVisible] = useState(false);

  // Open picker on mount if no photos selected
  useEffect(() => {
    if (selectedPhotos.length === 0) {
      handlePickPhotos();
    }
  }, []);

  const handlePickPhotos = async () => {
    if (!checkDocumentPickerAvailable()) return;

    try {
      const result = await pick({
        type: [types.images],
        allowMultiSelection: true,
      });

      if (result && result.length > 0) {
        const newPhotos = result.map((file, index) => ({
          id: `new-${Date.now()}-${index}`,
          uri: file.uri,
          name: file.name,
          size: file.size,
          type: file.type,
        }));
        setSelectedPhotos((prev) => [...prev, ...newPhotos]);
      }
    } catch (err) {
      if (isErrorWithCode(err) && err.code === errorCodes.OPERATION_CANCELED) {
        // User cancelled - if no photos, go back
        if (selectedPhotos.length === 0 && onBack) {
          onBack();
        }
      } else {
        console.error('Error picking photos:', err);
        Alert.alert('Error', 'Failed to pick photos. Please try again.');
      }
    }
  };

  const handleRemovePhoto = (photo) => {
    setSelectedPhotos((prev) => prev.filter((p) => p.id !== photo.id));
  };

  const handleDone = () => {
    if (selectedPhotos.length > 0) {
      setTitleModalVisible(true);
    }
  };

  const handleTitleDone = (title) => {
    setTitleModalVisible(false);
    if (onDone) {
      onDone({
        title,
        photos: selectedPhotos,
        album,
      });
    }
  };

  const selectedIds = selectedPhotos.map((p) => p.id);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title={`${selectedPhotos.length} Photos selected`}
        onBack={onBack}
        showMenu
        onMenuPress={handlePickPhotos}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <PhotoGrid
          photos={selectedPhotos}
          selectable
          selectedIds={selectedIds}
          onPhotoPress={handleRemovePhoto}
        />
      </ScrollView>

      <AddTitleModal
        visible={titleModalVisible}
        onClose={() => setTitleModalVisible(false)}
        onDone={handleTitleDone}
        photoCount={selectedPhotos.length}
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
  },
});
