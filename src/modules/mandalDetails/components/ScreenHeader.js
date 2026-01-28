import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../../styles/appStyles';

export default function ScreenHeader({ title, onBack, onMenuPress, showMenu = false, showArchive = false, onArchivePress, showDelete = false, onDeletePress, showEdit = false, onEditPress, showFilter = false, onFilterPress, rightElement }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerBack} onPress={onBack}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ flexDirection: 'row', marginLeft: 'auto', alignItems: 'center' }}>
        {rightElement != null ? rightElement : (
        <>
        {showFilter && (
          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={onFilterPress}
          >
            <Icon name="filter-list" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        {showEdit && !showFilter && (
          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={onEditPress}
          >
            <Icon name="edit" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        {showDelete && !showEdit && !showFilter && (
          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={onDeletePress}
          >
            <Icon name="delete" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        {showArchive && !showDelete && !showEdit && !showFilter && (
          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={onArchivePress}
          >
            <Icon name="archive" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        {showMenu && !showEdit && !showFilter && (
          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={onMenuPress}
          >
            <Icon name="more-vert" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        </>
        )}
      </View>
    </View>
  );
}

