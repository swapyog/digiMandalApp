import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../styles/appStyles';
import { PrimaryButton } from '../../components';
import InviteMembersModal from './InviteMembersModal';

export default function MandalStep3({ onNext, onBack }) {
  const [inviteVisible, setInviteVisible] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);

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

        <View style={[styles.languageItem, { marginBottom: 12 }]}>
          <View>
            <Text style={styles.languagePrimary}>Contact name from phonebook</Text>
            <Text style={styles.languageSecondary}>+91XXXXXXXXXX</Text>
          </View>
        </View>

        <PrimaryButton
          title="Invite Members & Proceed"
          onPress={onNext}
          showArrow={false}
        />
      </ScrollView>
      <InviteMembersModal
        visible={inviteVisible}
        onClose={() => setInviteVisible(false)}
        selectedMembers={selectedMembers}
        onChangeSelected={setSelectedMembers}
      />
    </SafeAreaView>
  );
}


