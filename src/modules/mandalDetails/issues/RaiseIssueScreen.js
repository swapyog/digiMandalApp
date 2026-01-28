import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../components/ScreenHeader';
import ActionButton from '../components/ActionButton';
import { FloatingLabelInput, FloatingLabelTextarea, FloatingDatePicker } from '../../../components';

const PURPLE = '#7b3cff';

const initials = (name) => {
  const parts = String(name).trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function RaiseIssueScreen({ onBack, onNext, associationName = 'Vasant Kunj Cultural Association, at Thane with very very long name' }) {
  const [subject, setSubject] = useState('');
  const [occurrenceDate, setOccurrenceDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([
    { id: '1', name: 'Sarvadnya' },
    { id: '2', name: 'Yogita' },
    { id: '3', name: 'Aarna' },
    { id: '4', name: 'Advik' },
    { id: '5', name: 'Aditya' },
  ]);
  const [photos, setPhotos] = useState([]);
  const [chooseMembersVisible, setChooseMembersVisible] = useState(false);

  const handleNext = () => {
    if (onNext) {
      onNext({
        subject,
        occurrenceDate,
        description,
        selectedMembers,
        photos,
      });
    }
  };

  const canNext = subject.trim().length > 0 && description.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Raise an Issue" onBack={onBack} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Issue Details</Text>
        <FloatingLabelInput
          label="Subject"
          value={subject}
          onChangeText={setSubject}
          placeholder="Enter issue"
          containerStyle={styles.input}
        />
        <FloatingDatePicker
          label="Issue Occurrence Date"
          value={occurrenceDate}
          onChange={setOccurrenceDate}
          placeholder="DD/MM/YYYY"
          containerStyle={styles.input}
        />
        <FloatingLabelTextarea
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter details"
          containerStyle={styles.input}
        />

        <View style={styles.membersSection}>
          <Text style={styles.membersHeading}>{selectedMembers.length} Members Selected</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.membersRow}>
            <TouchableOpacity style={styles.addChip} onPress={() => setChooseMembersVisible(true)}>
              <View style={styles.addCircle}>
                <Icon name="add" size={24} color={PURPLE} />
              </View>
              <Text style={styles.addLabel}>Add</Text>
            </TouchableOpacity>
            {selectedMembers.map((m) => (
              <View key={m.id} style={styles.chipWrap}>
                <View style={styles.chipCircle}>
                  <Text style={styles.chipInitials}>{initials(m.name)}</Text>
                  <TouchableOpacity
                    style={styles.chipRemove}
                    onPress={() => setSelectedMembers((prev) => prev.filter((x) => x.id !== m.id))}
                  >
                    <Icon name="close" size={14} color={PURPLE} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.chipName} numberOfLines={1}>{m.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.sectionTitle}>Upload Photo</Text>
        <Text style={styles.helperText}>Acceptable formats are jpeg, png up to 5MB</Text>
        {photos.length > 0 ? (
          photos.map((p, i) => (
            <View key={i} style={styles.photoCard}>
              <View style={styles.photoPlaceholder} />
              <Text style={styles.photoName}>{p.name || 'Photo ' + (i + 1)}</Text>
              <TouchableOpacity onPress={() => setPhotos((prev) => prev.filter((_, j) => j !== i))}>
                <Icon name="close" size={20} color={PURPLE} />
              </TouchableOpacity>
            </View>
          ))
        ) : null}
        <TouchableOpacity style={styles.uploadBox}>
          <Icon name="file-upload" size={24} color={PURPLE} />
          <Text style={styles.uploadText}>Upload Photos*</Text>
        </TouchableOpacity>
      </ScrollView>
      <ActionButton title="Next" onPress={handleNext} disabled={!canNext} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 8 },
  input: { marginBottom: 16 },
  helperText: { fontSize: 12, color: '#6b7280', marginBottom: 12 },
  membersSection: { marginBottom: 24 },
  membersHeading: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 8 },
  membersRow: { flexDirection: 'row', marginBottom: 8 },
  addChip: { alignItems: 'center', marginRight: 12, width: 70 },
  addCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e3d8f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  addLabel: { fontSize: 12, color: PURPLE, fontWeight: '500' },
  chipWrap: { alignItems: 'center', marginRight: 12, width: 70 },
  chipCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e3d8f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    position: 'relative',
  },
  chipInitials: { fontSize: 14, fontWeight: '600', color: PURPLE },
  chipRemove: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipName: { fontSize: 12, color: '#374151', width: 70, textAlign: 'center' },
  photoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  photoPlaceholder: { width: 48, height: 48, borderRadius: 8, backgroundColor: '#e5e7eb' },
  photoName: { flex: 1, marginLeft: 12, fontSize: 14, color: '#111827' },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e3d8f7',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: { fontSize: 14, fontWeight: '600', color: PURPLE, marginLeft: 8 },
});
