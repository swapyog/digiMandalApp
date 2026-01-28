import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../components/ScreenHeader';
import SelectedMembersChips from '../components/SelectedMembersChips';
import ChooseMembersScreen from '../member/InviteMembersScreen';

const PURPLE = '#7b3cff';

export default function NoticeDetailScreen({ onBack, notice, type = 'notice' }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [chooseMembersVisible, setChooseMembersVisible] = useState(false);
  const [selectedMembers] = useState([
    { id: '1', name: 'Sanskruti', avatar: null },
    { id: '2', name: 'Shalini', avatar: null },
    { id: '3', name: 'Avinash', avatar: null },
    { id: '4', name: 'Kriti', avatar: null },
    { id: '5', name: 'Kriti', avatar: null },
  ]);

  const isAnnouncement = type === 'announcement';
  const noticeData = notice || {
    title: isAnnouncement ? 'Independence Day Dress Code' : 'Mandal Elections 2025',
    subtitle: 'Vasant Kunj Cultural Association, at Thane with very very long name',
    publishedDate: "5 Aug '25",
    editedDate: "7 Aug '25",
    description: isAnnouncement
      ? "To celebrate India's Independence Day on 15th August, we will all be wearing the same dress as a symbol of unity and pride. Let's come together in spirit and style!"
      : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    attachments: [
      { name: 'Circular 30 Jul 2025.pdf', label: 'Circular' },
      { name: 'Circular 30 Jul 2025 (1).pdf', label: 'Circular (1)' },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader 
        title={isAnnouncement ? 'Announcement' : 'Notice Detail'} 
        onBack={onBack}
        showMenu={!isAnnouncement}
        onMenuPress={() => setMenuVisible(true)}
        showEdit={isAnnouncement}
        onEditPress={() => {}}
      />
      
      {/* Menu Dropdown */}
      {menuVisible && (
        <>
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
          />
          <View style={styles.menuDropdown}>
            <TouchableOpacity style={styles.menuItem}>
              <Icon name="edit" size={20} color={PURPLE} />
              <Text style={styles.menuItemText}>Edit Notice</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Icon name="delete" size={20} color={PURPLE} />
              <Text style={styles.menuItemText}>Delete Notice</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Icon name="archive" size={20} color={PURPLE} />
              <Text style={styles.menuItemText}>Archive</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Banner - hide for announcement */}
        {!isAnnouncement && (
        <View style={styles.bannerContainer}>
          <Text style={styles.bannerPlaceholder}>Banner Image</Text>
        </View>
        )}

        {/* Notice/Announcement Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.noticeTitle}>{noticeData.title}</Text>
          {!isAnnouncement && (
            <Text style={styles.noticeSubtitle}>{noticeData.subtitle}</Text>
          )}
          <View style={styles.dateTags}>
            <View style={styles.dateTag}>
              <Text style={styles.dateTagText}>Published on {noticeData.publishedDate}</Text>
            </View>
            <View style={styles.dateTag}>
              <Text style={styles.dateTagText}>Edited on {noticeData.editedDate}</Text>
            </View>
          </View>
        </View>

        {/* Subject */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {isAnnouncement ? 'Subject of Announcement' : 'Subject of Notice'}
          </Text>
          <Text style={styles.descriptionText}>{noticeData.description}</Text>
        </View>

        {/* Attachments - hide for announcement */}
        {!isAnnouncement && noticeData.attachments && noticeData.attachments.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Attachments</Text>
            {noticeData.attachments.map((attachment, index) => (
              <View key={index} style={styles.attachmentCard}>
                <Icon name="description" size={24} color={PURPLE} />
                <View style={styles.attachmentInfo}>
                  <Text style={styles.attachmentLabel}>{attachment.label}</Text>
                  <Text style={styles.attachmentFileName}>{attachment.name}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* People with Access - hide for announcement */}
        {!isAnnouncement && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>People with Access</Text>
            <TouchableOpacity onPress={() => setChooseMembersVisible(true)}>
              <Text style={styles.membersCountText}>
                {selectedMembers.length} Members <Icon name="chevron-right" size={16} color={PURPLE} />
              </Text>
            </TouchableOpacity>
          </View>
          <SelectedMembersChips
            selectedMembers={selectedMembers}
            onRemoveMember={() => {}}
          />
          <TouchableOpacity 
            style={styles.changeAccessButton}
            onPress={() => setChooseMembersVisible(true)}
          >
            <Icon name="refresh" size={20} color={PURPLE} />
            <Text style={styles.changeAccessText}>Change Access</Text>
          </TouchableOpacity>
        </View>
        )}
      </ScrollView>

      <ChooseMembersScreen
        visible={chooseMembersVisible}
        onClose={() => setChooseMembersVisible(false)}
        onSuccess={() => setChooseMembersVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  menuDropdown: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  bannerContainer: {
    height: 200,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerPlaceholder: {
    fontSize: 16,
    color: '#6b7280',
  },
  detailsSection: {
    marginBottom: 24,
  },
  noticeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  noticeSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  dateTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dateTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  dateTagText: {
    fontSize: 12,
    color: '#6b7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 22,
  },
  attachmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  attachmentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  attachmentLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  attachmentFileName: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  membersCountText: {
    fontSize: 14,
    color: PURPLE,
    fontWeight: '500',
  },
  changeAccessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e3d8f7',
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 12,
  },
  changeAccessText: {
    fontSize: 14,
    color: PURPLE,
    fontWeight: '500',
    marginLeft: 8,
  },
});

