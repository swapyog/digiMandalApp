import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../styles/appStyles';
import { PrimaryButton, SelectionModal, Loader } from '../../components';
import InviteMembersModal from './InviteMembersModal';
import { apiHost, API_PATHS } from '../../constants';
import { StorageService } from '../../utils/storage';
import { getAuthHeaders } from '../../utils/common';
import { designationOptions } from '../../utils/mandalData';
import axios from 'axios';

const getMobileFromMember = (member) => {
  const cleaned = (member?.phone || '').replace(/\D/g, '');
  return cleaned.length >= 10 ? cleaned.slice(-10) : null;
};

export default function MandalStep3({ onNext, onBack }) {
  const [inviteVisible, setInviteVisible] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [designationModalVisible, setDesignationModalVisible] = useState(false);
  const [selectedMemberForDesignation, setSelectedMemberForDesignation] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleMembersChange = (newMembers) => {
    // Preserve designations when members are updated from the modal
    const existingMembersMap = new Map(selectedMembers.map(m => [m.id, m]));
    
    const updatedMembers = newMembers.map(member => {
      const existing = existingMembersMap.get(member.id);
      if (existing && existing.designation) {
        // Preserve designation if it exists
        return { ...member, designation: existing.designation };
      }
      return { ...member, designation: member.designation || null };
    });
    
    setSelectedMembers(updatedMembers);
  };

  const handleRemoveMember = (memberId) => {
    setSelectedMembers(selectedMembers.filter(m => m.id !== memberId));
  };

  const handleDesignationSelect = (value) => {
    if (selectedMemberForDesignation) {
      const updatedMembers = selectedMembers.map(member =>
        member.id === selectedMemberForDesignation.id
          ? { ...member, designation: value }
          : member
      );
      setSelectedMembers(updatedMembers);
      setSelectedMemberForDesignation(null);
      setDesignationModalVisible(false);
    }
  };

  const openDesignationModal = (member) => {
    setSelectedMemberForDesignation(member);
    setDesignationModalVisible(true);
  };

  const formatPhoneNumber = (phone) => {
    // Format phone number to show +91XXXXXXXXXX format
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length >= 10) {
      return `+91${cleaned.slice(-10)}`;
    }
    return phone;
  };

  const getDesignationLabel = (value) => {
    const option = designationOptions.find(opt => opt.value === value);
    return option ? option.label : 'Select designation';
  };

  const initialsFor = (name) => {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleInviteAndProceed = async () => {
    if (selectedMembers.length < 5) {
      Alert.alert('Minimum members required', 'Please invite at least 5 core members to proceed.');
      return;
    }
    const membersWithMobile = selectedMembers.filter((m) => getMobileFromMember(m));
    if (membersWithMobile.length < selectedMembers.length) {
      Alert.alert('Invalid members', 'All selected members must have a valid 10-digit mobile number.');
      return;
    }
    setSubmitting(true);
    try {
      const accessToken = (await StorageService.getAccessToken()) ?? '';
      const mandalId = await StorageService.getMandalId();
      if (!accessToken) {
        Alert.alert('Session expired', 'Please log in again.', [{ text: 'OK', onPress: () => onBack?.() }]);
        setSubmitting(false);
        return;
      }
      if (!mandalId) {
        Alert.alert('Error', 'Mandal not found. Please complete previous steps first.', [{ text: 'OK', onPress: () => onBack?.() }]);
        setSubmitting(false);
        return;
      }
      const failed = [];
      for (const member of membersWithMobile) {
        const mobile = getMobileFromMember(member);
        if (!mobile) continue;
        try {
          await axios.post(
            `${apiHost.baseURL}${API_PATHS.INVITATION}/${mandalId}/send`,
            { mobile },
            { headers: getAuthHeaders(accessToken) }
          );
        } catch (err) {
          const msg = err.response?.data?.message || err.message;
          failed.push({ name: member.name || mobile, msg });
        }
      }
      if (failed.length > 0) {
        const message = failed.map((f) => `${f.name}: ${f.msg}`).join('\n');
        Alert.alert('Some invitations failed', message);
        setSubmitting(false);
        return;
      }
      if (onNext) onNext();
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      Alert.alert('Error', msg || 'Could not send invitations. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.screenRoot}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBack} onPress={onBack}>
          <Icon name="chevron-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Mandal</Text>
      </View>
      <View style={styles.stepTabsRow}>
        <View style={styles.stepTab}>
          <Icon name="check" size={18} color="#7b3cff" style={[styles.stepTabText, styles.stepTabTextActive]} />
          <View style={styles.stepTabUnderline} />
        </View>
        <View style={styles.stepTab}>
          <Icon name="check" size={18} color="#7b3cff" style={[styles.stepTabText, styles.stepTabTextActive]} />
          <View style={styles.stepTabUnderline} />
        </View>
        <View style={styles.stepTab}>
          <Text style={[styles.stepTabText, styles.stepTabTextActive]}>3</Text>
          <View style={[styles.stepTabUnderline, styles.stepTabUnderlineActive]} />
        </View>
        <View style={styles.stepTab}>
          <Text style={styles.stepTabText}>4</Text>
          <View style={styles.stepTabUnderline} />
        </View>
      </View>
      <ScrollView
        style={styles.screenBody}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Invite Minimum 5 Core Members</Text>

        <View style={styles.memberAddRow}>
          <TouchableOpacity
            style={styles.memberAddFab}
            onPress={() => setInviteVisible(true)}
          >
            <Text style={styles.memberAddFabIcon}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setInviteVisible(true)}>
            <Text style={styles.memberAddText}>Add Member</Text>
          </TouchableOpacity>
        </View>

        {selectedMembers.map((member) => (
          <View key={member.id} style={[styles.languageItem, { marginBottom: 12 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#7b3cff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                <Icon name="person" size={20} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={styles.languagePrimary} numberOfLines={1}>
                    {member.name || 'Contact name from phonebook'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveMember(member.id)}
                    style={{ padding: 4 }}
                  >
                    <Icon name="close" size={20} color="#7b3cff" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.languageSecondary}>
                  {formatPhoneNumber(member.phone)}
                </Text>
                <TouchableOpacity
                  onPress={() => openDesignationModal(member)}
                  style={{
                    marginTop: 8,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    backgroundColor: '#f3f4f6',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: member.designation ? '#111827' : '#9ca3af',
                    }}
                  >
                    {getDesignationLabel(member.designation)}
                  </Text>
                  <Icon name="keyboard-arrow-down" size={20} color="#9ca3af" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <PrimaryButton
          title="Invite Members & Proceed"
          onPress={handleInviteAndProceed}
          disabled={submitting}
          showArrow={false}
        />
      </ScrollView>

      <Loader overlay visible={submitting} message="Sending Invites..." />

      <InviteMembersModal
        visible={inviteVisible}
        onClose={() => setInviteVisible(false)}
        selectedMembers={selectedMembers}
        onChangeSelected={handleMembersChange}
        onAddMembers={handleMembersChange}
      />
      <SelectionModal
        visible={designationModalVisible}
        title="Select Designation"
        options={designationOptions}
        selectedValue={selectedMemberForDesignation?.designation}
        onSelect={handleDesignationSelect}
        onClose={() => {
          setDesignationModalVisible(false);
          setSelectedMemberForDesignation(null);
        }}
      />
    </SafeAreaView>
  );
}


