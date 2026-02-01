import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PURPLE = '#7E48DC';

export default function PhotoGrid({
  photos = [],
  selectable = false,
  selectionMode = false,
  selectedIds = [],
  onPhotoPress,
  onPhotoLongPress,
  numColumns = 4,
}) {
  const rows = [];
  for (let i = 0; i < photos.length; i += numColumns) {
    rows.push(photos.slice(i, i + numColumns));
  }

  const isSelected = (photo) => selectedIds.includes(photo.id);

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((photo) => (
            <TouchableOpacity
              key={photo.id}
              style={[styles.photoWrap, selectionMode && isSelected(photo) && styles.photoWrapSelected]}
              onPress={() => onPhotoPress && onPhotoPress(photo)}
              onLongPress={() => onPhotoLongPress && onPhotoLongPress(photo)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: photo.uri }}
                style={styles.photo}
                resizeMode="cover"
              />
              {selectable && isSelected(photo) && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => onPhotoPress && onPhotoPress(photo)}
                  hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
                >
                  <View style={styles.removeCircle}>
                    <Icon name="close" size={12} color={PURPLE} />
                  </View>
                </TouchableOpacity>
              )}
              {selectionMode && (
                <View style={[styles.checkbox, isSelected(photo) && styles.checkboxSelected]}>
                  {isSelected(photo) && (
                    <Icon name="check" size={14} color="#fff" />
                  )}
                </View>
              )}
            </TouchableOpacity>
          ))}
          {row.length < numColumns &&
            Array(numColumns - row.length)
              .fill(null)
              .map((_, i) => <View key={`empty-${i}`} style={styles.photoWrap} />)}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
  },
  photoWrap: {
    flex: 1,
    aspectRatio: 1,
    padding: 2,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
  },
  photoWrapSelected: {
    opacity: 0.85,
  },
  checkbox: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  checkboxSelected: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 1,
  },
  removeCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
