import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PhotoGrid from './PhotoGrid';

const PURPLE = '#7E48DC';

export default function AlbumSection({
  album,
  onAddPhotos,
  onShare,
  onRemovePhotos,
  onPhotoPress,
}) {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuOption = (action) => {
    setMenuVisible(false);
    if (action === 'add') onAddPhotos && onAddPhotos(album);
    if (action === 'share') onShare && onShare(album);
    if (action === 'remove') onRemovePhotos && onRemovePhotos(album);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{album.title}</Text>
          <Text style={styles.date}> • {album.date}</Text>
        </View>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon name="more-vert" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <PhotoGrid
        photos={album.photos}
        onPhotoPress={onPhotoPress}
      />

      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuOption('add')}
            >
              <Icon name="add" size={20} color={PURPLE} />
              <Text style={styles.menuText}>Add Photos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuOption('share')}
            >
              <Icon name="share" size={20} color={PURPLE} />
              <Text style={styles.menuText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuOption('remove')}
            >
              <Icon name="close" size={20} color={PURPLE} />
              <Text style={styles.menuText}>Remove Photos</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
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
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  date: {
    fontSize: 14,
    color: '#6b7280',
  },
  menuButton: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
  },
  menuContainer: {
    position: 'absolute',
    top: 100,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 14,
    color: '#111827',
    marginLeft: 12,
  },
});
