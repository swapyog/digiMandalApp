import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../../styles/appStyles';
import FiltersModal from '../components/FiltersModal';
import SearchInput from '../components/SearchInput';
import ScreenHeader from '../components/ScreenHeader';
import FilterButton from '../components/FilterButton';
import ActionButton from '../components/ActionButton';

const PURPLE = '#7b3cff';

export default function RemoveMembersScreen({ visible, onClose, associationName }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [filtersVisible, setFiltersVisible] = useState(false);

  // Sample members data
  const [members] = useState([
    { id: '1', name: 'Sarita Nair', designation: 'Chairman', avatar: null },
    { id: '2', name: 'Priya Sharma', designation: null, avatar: null },
    { id: '3', name: 'Arjun Reddy', designation: null, avatar: null },
    { id: '4', name: 'Divya Patel', designation: null, avatar: null },
    { id: '5', name: 'Amit Kapoor', designation: null, avatar: null },
    { id: '6', name: 'Anika Joshi', designation: 'President', avatar: null },
    { id: '7', name: 'Vikram Singh', designation: null, avatar: null },
    { id: '8', name: 'Deepa Menon', designation: 'Treasurer', avatar: null },
    { id: '9', name: 'Sneha Desai', designation: null, avatar: null },
    { id: '10', name: 'Rahul Khanna', designation: null, avatar: null },
  ]);

  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const toggleSelect = (member) => {
    const exists = selectedMembers.find(m => m.id === member.id);
    if (exists) {
      setSelectedMembers(selectedMembers.filter(m => m.id !== member.id));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const removeFromSelected = (memberId) => {
    setSelectedMembers(selectedMembers.filter(m => m.id !== memberId));
  };

  const handleRemoveMembers = () => {
    if (selectedMembers.length === 0) {
      Alert.alert('No Members Selected', 'Please select at least one member to remove.');
      return;
    }

    // Check if trying to remove Chairman
    const chairman = selectedMembers.find(m => m.designation === 'Chairman');
    if (chairman) {
      setMemberToRemove(chairman);
      setConfirmModalVisible(true);
      return;
    }

    confirmRemove();
  };

  const confirmRemove = () => {
    // Remove members logic here
    const removedNames = selectedMembers.map(m => m.name).join(', ');
    setSelectedMembers([]);
    setConfirmModalVisible(false);
    setMemberToRemove(null);
    Alert.alert('Success', `${removedNames} has been removed`);
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.screenRoot}>
        {/* <View style={styles.header}>
          <TouchableOpacity style={styles.headerBack} onPress={onClose}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Remove Members</Text>
        </View> */}
        <ScreenHeader title="Remove Members" onBack={onClose} />

        <ScrollView
          style={styles.screenBody}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {associationName && (
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#111827',
                marginBottom: 16,
              }}
            >
              {associationName}
            </Text>
          )}

          <SearchInput value={searchQuery} onChangeText={setSearchQuery} />

          {selectedMembers.length > 0 && (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>
                {selectedMembers.length} Members Selected
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 16 }}
              >
                {selectedMembers.map(member => (
                  <View
                    key={member.id}
                    style={{
                      alignItems: 'center',
                      marginRight: 12,
                      width: 70,
                    }}
                  >
                    <View
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 28,
                        backgroundColor: '#e3d8f7',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 4,
                        position: 'relative',
                      }}
                    >
                      <Text style={{ fontSize: 14, fontWeight: '600', color: PURPLE }}>
                        {getInitials(member.name)}
                      </Text>
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          top: -4,
                          right: -4,
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          backgroundColor: PURPLE,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => removeFromSelected(member.id)}
                      >
                        <Icon name="close" size={12} color="#fff" />
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{ fontSize: 12, color: '#111827', textAlign: 'center' }}
                      numberOfLines={1}
                    >
                      {member.name.split(' ')[0]}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>
              {members.length} Members
            </Text>
            <FilterButton onPress={() => setFiltersVisible(true)} />
          </View>

          {filteredMembers.map(member => {
            const isSelected = !!selectedMembers.find(m => m.id === member.id);
            return (
              <TouchableOpacity
                key={member.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: '#e5e7eb',
                }}
                onPress={() => toggleSelect(member)}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: '#e3d8f7',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '600', color: PURPLE }}>
                    {getInitials(member.name)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>
                    {member.name}
                  </Text>
                  {member.designation && (
                    <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 2 }}>
                      {member.designation}
                    </Text>
                  )}
                </View>
                {isSelected && (
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: '#e3d8f7',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon name="check" size={16} color={PURPLE} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <ActionButton title="Remove Members" onPress={handleRemoveMembers} />

        {/* Confirmation Modal */}
        <Modal
          visible={confirmModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setConfirmModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 24,
            }}
          >
            <View
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 16,
                padding: 24,
                width: '100%',
                maxWidth: 400,
              }}
            >
              <Text style={{ fontSize: 48, textAlign: 'center', marginBottom: 16 }}>🤔</Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: '#111827',
                  textAlign: 'center',
                  marginBottom: 8,
                }}
              >
                Unable To Remove
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#6b7280',
                  textAlign: 'center',
                  marginBottom: 24,
                }}
              >
                Please assign a new chairman before removing the current one. An active Chairman is
                mandatory for a mandal.
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 12,
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: '#f3f4f6',
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setConfirmModalVisible(false);
                    setMemberToRemove(null);
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: PURPLE,
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setConfirmModalVisible(false);
                    setMemberToRemove(null);
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#ffffff' }}>
                    Okay
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <FiltersModal
          visible={filtersVisible}
          onClose={() => setFiltersVisible(false)}
        />
      </SafeAreaView>
    </Modal>
  );
}

