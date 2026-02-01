import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { pick, types, errorCodes, isErrorWithCode } from '@react-native-documents/picker';

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

function PhotoPreviewItem({ photo, onRemove, accentColor }) {
  return (
    <View style={styles.photoCard}>
      <View style={styles.photoImageWrap}>
        {photo.uri ? (
          <Image source={{ uri: photo.uri }} style={styles.photoImage} resizeMode="cover" />
        ) : (
          <View style={[styles.photoImage, styles.photoPlaceholder]} />
        )}
      </View>
      <View style={styles.photoFooter}>
        <Text style={styles.photoName} numberOfLines={1}>
          {photo.name || 'Photo'}
        </Text>
        <TouchableOpacity onPress={onRemove} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Icon name="close" size={20} color={accentColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function PhotoUpload({
  value = [],
  onChange,
  title = 'Upload Photo',
  helperText = 'Acceptable formats are jpeg, png up to 5MB',
  uploadButtonText = 'Upload Photos*',
  dimensionsText = 'Height 720 x Width 1080 px',
  maxFiles,
  maxSizeMB = 5,
  allowMultiple = true,
  accentColor = PURPLE,
}) {
  const handlePickPhotos = async () => {
    if (!checkDocumentPickerAvailable()) return;

    try {
      const result = await pick({
        type: [types.images],
        allowMultiSelection: allowMultiple,
      });

      if (result && result.length > 0) {
        const validFiles = [];
        for (const file of result) {
          const fileSizeMB = (file.size || 0) / (1024 * 1024);
          if (fileSizeMB > maxSizeMB) {
            Alert.alert('File Too Large', `Each file must be less than ${maxSizeMB}MB`);
            return;
          }
          validFiles.push({
            name: file.name,
            uri: file.uri,
            size: file.size,
            type: file.type,
          });
        }

        const newPhotos = [...value, ...validFiles];
        if (maxFiles && newPhotos.length > maxFiles) {
          Alert.alert('Limit Reached', `Maximum ${maxFiles} photos allowed`);
          return;
        }
        onChange(newPhotos);
      }
    } catch (err) {
      if (isErrorWithCode(err) && err.code === errorCodes.OPERATION_CANCELED) {
        // User cancelled
      } else {
        console.error('Error picking photos:', err);
        Alert.alert('Error', 'Failed to pick photos. Please try again.');
      }
    }
  };

  const removePhoto = (index) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.helperText}>{helperText}</Text>

      {value.length > 0 && (
        <View style={styles.photoList}>
          {value.map((p, i) => (
            <PhotoPreviewItem
              key={i}
              photo={p}
              onRemove={() => removePhoto(i)}
              accentColor={accentColor}
            />
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.uploadBox} onPress={handlePickPhotos} activeOpacity={0.7}>
        <View style={styles.uploadContent}>
          <View style={styles.uploadRow}>
            <Icon name="file-upload" size={24} color={accentColor} />
            <Text style={[styles.uploadText, { color: accentColor }]}>{uploadButtonText}</Text>
          </View>
          <Text style={styles.dimensionsText}>{dimensionsText}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  helperText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
  },
  photoList: {
    marginBottom: 12,
  },
  photoCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  photoImageWrap: {
    width: '100%',
    aspectRatio: 16 / 10,
    backgroundColor: '#f3f4f6',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    backgroundColor: '#e5e7eb',
  },
  photoFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  photoName: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    marginRight: 8,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e3d8f7',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#F6F2FC',
  },
  uploadContent: {
    alignItems: 'center',
  },
  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  dimensionsText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 6,
  },
});
