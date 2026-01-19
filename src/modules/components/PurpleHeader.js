import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PURPLE = '#110723';

const styles = StyleSheet.create({
  purpleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: PURPLE,
  },
  purpleHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'left',
    flex: 1,
  },
  purpleHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  purpleHeaderIcon: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function PurpleHeader({ title = 'Profile' }) {
  return (
    <View style={styles.purpleHeader}>
      <Text style={styles.purpleHeaderTitle}>{title}</Text>
      <View style={styles.purpleHeaderRight}>
        <TouchableOpacity style={styles.purpleHeaderIcon}>
          <Icon name="notifications-none" size={26} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.purpleHeaderIcon}>
          <Icon name="menu" size={26} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

