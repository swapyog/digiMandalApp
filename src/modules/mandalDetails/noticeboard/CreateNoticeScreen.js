import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../components/ScreenHeader';
import ActionButton from '../components/ActionButton';
import { pick, types, errorCodes, isErrorWithCode } from '@react-native-documents/picker';
import { FloatingLabelInput, FloatingLabelTextarea, FloatingDatePicker } from '../../../components';

const PURPLE = '#7b3cff';
const ACTIVE_TAB_COLOR = '#7E48DC';
const INACTIVE_TAB_COLOR = '#F6F2FC';
const ACTIVE_AUDIENCE_BG = '#F6F2FC';
const ACTIVE_AUDIENCE_BORDER = '#D1BDF2';
const INACTIVE_AUDIENCE_BG = '#FFFFFF';
const INACTIVE_AUDIENCE_BORDER = '#E7EDF3';

export default function CreateNoticeScreen({ onBack, onNext }) {
  const [noticeType, setNoticeType] = useState('Notice');
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [audience, setAudience] = useState('All');

  const handleUploadBanner = async () => {
    try {
      const result = await pick({
        type: [types.images],
      });
      if (result[0]) {
        setBannerImage(result[0]);
      }
    } catch (err) {
      if (isErrorWithCode(err) && err.code === errorCodes.OPERATION_CANCELED) {
        // User cancelled
      }
    }
  };

  const handleUploadAttachments = async () => {
    try {
      const result = await pick({
        type: [types.allFiles],
        allowMultiSelection: true,
      });
      if (result.length > 0) {
        setAttachments([...attachments, ...result]);
      }
    } catch (err) {
      if (isErrorWithCode(err) && err.code === errorCodes.OPERATION_CANCELED) {
        // User cancelled
      }
    }
  };

  const removeBanner = () => {
    setBannerImage(null);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (onNext) {
      onNext({
        noticeType,
        heading,
        description,
        date,
        bannerImage,
        attachments,
        audience,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Create New Notice" onBack={onBack} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Notice Type Tabs */}
        <View style={styles.typeTabs}>
          <TouchableOpacity
            style={[styles.typeTab, noticeType === 'Notice' && styles.typeTabActive]}
            onPress={() => setNoticeType('Notice')}
          >
            <Icon 
              name="push-pin" 
              size={20} 
              color={noticeType === 'Notice' ? '#FFFFFF' : '#7E48DC'} 
            />
            <Text style={[styles.typeTabText, noticeType === 'Notice' && styles.typeTabTextActive]}>
              Notice
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeTab, noticeType === 'Announcement' && styles.typeTabActive]}
            onPress={() => setNoticeType('Announcement')}
          >
            <Icon 
              name="campaign" 
              size={20} 
              color={noticeType === 'Announcement' ? '#FFFFFF' : '#7E48DC'} 
            />
            <Text style={[styles.typeTabText, noticeType === 'Announcement' && styles.typeTabTextActive]}>
              Announcement
            </Text>
          </TouchableOpacity>
        </View>

        {/* Announcement note banner */}
        {noticeType === 'Announcement' && (
          <View style={styles.noteBanner}>
            <Icon name="auto-awesome" size={20} color="#7E48DC" />
            <Text style={styles.noteBannerText}>
              Announcement will be sent to all members.
            </Text>
          </View>
        )}

        {/* Banner Image Section - hide for Announcement */}
        {noticeType !== 'Announcement' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Banner Image <Text style={styles.optionalText}>(if required)</Text>
          </Text>
          <Text style={styles.helperText}>Acceptable formats are jpeg and png up to 5MB</Text>
          {bannerImage ? (
            <View style={styles.bannerCard}>
              <Icon name="image" size={24} color={PURPLE} />
              <Text style={styles.bannerName} numberOfLines={1}>
                {bannerImage.name || 'Banner Image'}
              </Text>
              <TouchableOpacity onPress={removeBanner} style={styles.removeButton}>
                <Icon name="close" size={20} color={PURPLE} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadBox} onPress={handleUploadBanner}>
              <Icon name="file-upload" size={24} color={PURPLE} />
              <Text style={styles.uploadText}>Upload Banner Image</Text>
            </TouchableOpacity>
          )}
        </View>
        )}

        {/* Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          
          <FloatingLabelInput
            label="Heading"
            value={heading}
            onChangeText={setHeading}
            placeholder="Enter heading"
          />

          {noticeType !== 'Announcement' && (
            <FloatingDatePicker
              label="Date"
              value={date}
              onChange={setDate}
              placeholder="In DD/MM/YYYY Format"
            />
          )}

          <FloatingLabelTextarea
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Enter subject"
          />
        </View>

        {/* Attachments Section - hide for Announcement */}
        {noticeType !== 'Announcement' && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Attachments</Text>
            {attachments.length > 0 && (
              <Text style={styles.attachmentCount}>{attachments.length} Added</Text>
            )}
          </View>
          <Text style={styles.helperText}>Acceptable formats are jpeg, pdf, png up to 5MB</Text>
          
          {attachments.map((attachment, index) => (
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
              <TouchableOpacity onPress={() => removeAttachment(index)}>
                <Icon name="close" size={20} color={PURPLE} />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.uploadBox} onPress={handleUploadAttachments}>
            <Icon name="file-upload" size={24} color={PURPLE} />
            <Text style={styles.uploadText}>Upload Attachments*</Text>
          </TouchableOpacity>
        </View>
        )}

        {/* Who can see Section - hide for Announcement */}
        {noticeType !== 'Announcement' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Who can see?</Text>
          <View style={styles.audienceButtons}>
            <TouchableOpacity
              style={[styles.audienceButton, audience === 'All' && styles.audienceButtonActive]}
              onPress={() => setAudience('All')}
            >
              <Icon 
                name="public" 
                size={20} 
                color={audience === 'All' ? '#7E48DC' : '#6b7280'} 
              />
              <Text style={[styles.audienceButtonText, audience === 'All' && styles.audienceButtonTextActive]}>
                All Members
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.audienceButton, audience === 'Selective' && styles.audienceButtonActive]}
              onPress={() => setAudience('Selective')}
            >
              <Icon 
                name="person" 
                size={20} 
                color={audience === 'Selective' ? '#7E48DC' : '#6b7280'} 
              />
              <Text style={[styles.audienceButtonText, audience === 'Selective' && styles.audienceButtonTextActive]}>
                Selective
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.audienceButton, audience === 'Committee' && styles.audienceButtonActive]}
              onPress={() => setAudience('Committee')}
            >
              <Icon 
                name="groups" 
                size={20} 
                color={audience === 'Committee' ? '#7E48DC' : '#6b7280'} 
              />
              <Text style={[styles.audienceButtonText, audience === 'Committee' && styles.audienceButtonTextActive]}>
                Committee
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
      </ScrollView>

      <ActionButton
        title="Next"
        onPress={handleNext}
        disabled={noticeType === 'Announcement' ? !heading.trim() || !description.trim() : false}
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
  typeTabs: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
    marginVertical: 16,
  },
  typeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: INACTIVE_TAB_COLOR,
  },
  typeTabActive: {
    backgroundColor: ACTIVE_TAB_COLOR,
  },
  typeTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7E48DC',
    marginLeft: 8,
  },
  typeTabTextActive: {
    color: '#FFFFFF',
  },
  noteBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F0FB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  noteBannerText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  optionalText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6b7280',
  },
  helperText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
  },
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
  uploadText: {
    fontSize: 14,
    fontWeight: '600',
    color: PURPLE,
    marginLeft: 8,
  },
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  bannerName: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    marginLeft: 12,
  },
  removeButton: {
    padding: 4,
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
  attachmentCount: {
    fontSize: 14,
    fontWeight: '600',
    color: PURPLE,
  },
  audienceButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  audienceButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: INACTIVE_AUDIENCE_BG,
    borderWidth: 1,
    borderColor: INACTIVE_AUDIENCE_BORDER,
  },
  audienceButtonActive: {
    backgroundColor: ACTIVE_AUDIENCE_BG,
    borderColor: ACTIVE_AUDIENCE_BORDER,
  },
  audienceButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#808F9E',
    marginLeft: 6,
  },
  audienceButtonTextActive: {
    color: '#7E48DC',
  },
});

