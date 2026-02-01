import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';

const PURPLE = '#7E48DC';

const ROLES = [
  { id: '1', name: 'Decoration & Setup', joined: true },
  { id: '2', name: 'Prasad Preparation', joined: false },
  { id: '3', name: 'Crowd Management', joined: false },
  { id: '4', name: 'Cultural Program Coordination', joined: false },
];

export default function ApplyVolunteeringScreen({ onBack, onDone }) {
  const [roles, setRoles] = useState(ROLES);

  const toggleRole = (id) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === id ? { ...r, joined: !r.joined } : r))
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Apply as Volunteering" onBack={onBack} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.chooseLabel}>Choose</Text>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.id}
            style={styles.row}
            onPress={() => toggleRole(role.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.roleName}>{role.name}</Text>
            <Text style={[styles.statusText, role.joined && styles.statusJoined]}>
              {role.joined ? 'Joined' : 'Join'}
            </Text>
          </TouchableOpacity>
        ))}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => onDone && onDone()}
        activeOpacity={0.8}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  chooseLabel: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  roleName: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: PURPLE,
  },
  statusJoined: {
    color: PURPLE,
  },
  bottomSpacer: {
    height: 100,
  },
  doneButton: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 24,
    backgroundColor: PURPLE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
