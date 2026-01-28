import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../components/ScreenHeader';
import SelectedMembersChips from '../components/SelectedMembersChips';
import ChooseMembersScreen from '../member/InviteMembersScreen';
import SuccessModal from './SuccessModal';
import { NoticeCard } from '../../../components';

const PURPLE = '#7b3cff';

export default function NoticePreviewScreen({ onBack, noticeData, onEdit, onPublish, onNavigateToAllNotices }) {
  const [chooseMembersVisible, setChooseMembersVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const autoRedirectTimeoutRef = useRef(null);
  const [selectedMembers, setSelectedMembers] = useState([
    { id: '1', name: 'Omkar' },
    { id: '2', name: 'Emily' },
    { id: '3', name: 'Michael' },
    { id: '4', name: 'Rameshva...' },
    { id: '5', name: 'Carlos' },
  ]);

  const isAnnouncement = noticeData?.noticeType === 'Announcement';

  const handleChooseMembers = (members) => {
    setSelectedMembers(members);
    setChooseMembersVisible(false);
  };

  const handlePublish = () => {
    // Show success modal
    setSuccessModalVisible(true);
    // Call the onPublish callback if provided
    // if (onPublish) {
    //   onPublish();
    // }
  };

  const redirectToAllNotices = useCallback(() => {
    setSuccessModalVisible(false);
    // Clear any pending timeout
    if (autoRedirectTimeoutRef.current) {
      clearTimeout(autoRedirectTimeoutRef.current);
      autoRedirectTimeoutRef.current = null;
    }
    // Navigate to All Notices screen
    if (onNavigateToAllNotices) {
      onNavigateToAllNotices();
    } else if (onBack) {
      // Fallback to going back if navigation callback not provided
      onBack();
    }
  }, [onNavigateToAllNotices, onBack]);

  const handleSuccessModalClose = () => {
    redirectToAllNotices();
  };

  // Auto-redirect after 3 seconds if modal is visible
  useEffect(() => {
    if (successModalVisible) {
      autoRedirectTimeoutRef.current = setTimeout(() => {
        redirectToAllNotices();
      }, 3000); // 3 seconds

      // Cleanup timeout on unmount or when modal closes
      return () => {
        if (autoRedirectTimeoutRef.current) {
          clearTimeout(autoRedirectTimeoutRef.current);
        }
      };
    }
  }, [successModalVisible, redirectToAllNotices]);

  if (isAnnouncement) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="Announcement Preview" onBack={onBack} />
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.previewSubtitle}>
            Kindly check the announcement that you have created before publishing.
          </Text>
          <View style={styles.previewCardWrap}>
            <NoticeCard
              variant="announcement"
              title={noticeData?.heading || ''}
              date="Today"
              description={noticeData?.description || ''}
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
            <Text style={styles.publishButtonText}>Publish</Text>
          </TouchableOpacity>
        </View>
        <SuccessModal
          visible={successModalVisible}
          onClose={handleSuccessModalClose}
          variant="announcement"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Notice Preview" onBack={onBack} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Banner Image Placeholder */}
        {noticeData?.bannerImage && (
          <View style={styles.bannerContainer}>
            <Text style={styles.bannerPlaceholder}>Banner Image</Text>
          </View>
        )}

        {/* Notice Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.noticeTitle}>{noticeData?.heading || 'Mandal Elections 2025'}</Text>
          <Text style={styles.noticeSubtitle}>
            Vasant Kunj Cultural Association, at Thane with very very long name
          </Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            {noticeData?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'}
          </Text>
        </View>

        {/* Attachments */}
        {noticeData?.attachments && noticeData.attachments.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Attachments</Text>
            {noticeData.attachments.map((attachment, index) => (
              <View key={index} style={styles.attachmentCard}>
                <Icon name="description" size={24} color={PURPLE} />
                <View style={styles.attachmentInfo}>
                  <Text style={styles.attachmentLabel}>
                    {attachment.name?.split('.')[0] || `Attachment ${index + 1}`}
                  </Text>
                  <Text style={styles.attachmentFileName} numberOfLines={1}>
                    {attachment.name || 'File'}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Icon name="visibility" size={20} color={PURPLE} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 12 }}>
                  <Icon name="close" size={20} color={PURPLE} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Members Selected */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{selectedMembers.length} Members Selected</Text>
            <TouchableOpacity onPress={() => setChooseMembersVisible(true)}>
              <Text style={styles.changeAccessText}>Change Access</Text>
            </TouchableOpacity>
          </View>
          <SelectedMembersChips
            selectedMembers={selectedMembers}
            onRemoveMember={(id) => setSelectedMembers(selectedMembers.filter(m => m.id !== id))}
          />
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishButtonText}>Publish</Text>
        </TouchableOpacity>
      </View>

      <ChooseMembersScreen
        visible={chooseMembersVisible}
        onClose={() => setChooseMembersVisible(false)}
        onSuccess={() => {
          setChooseMembersVisible(false);
        }}
      />

      <SuccessModal
        visible={successModalVisible}
        onClose={handleSuccessModalClose}
        memberCount={selectedMembers.length}
        message={`The notice has been shared with the ${selectedMembers.length} chosen members.`}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  previewSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  previewCardWrap: {
    marginBottom: 24,
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
  changeAccessText: {
    fontSize: 14,
    color: PURPLE,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#e3d8f7',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: PURPLE,
    fontSize: 16,
    fontWeight: '600',
  },
  publishButton: {
    flex: 1,
    backgroundColor: PURPLE,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

