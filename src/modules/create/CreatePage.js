import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Platform,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import DocumentPicker from 'react-native-document-picker';
import { homeStyles } from '../../styles/homeStyles';
import BottomNavigation from '../components/BottomNavigation';
import { FloatingLabelInput, FloatingLabelTextarea, SelectionModal } from '../../components';

const PURPLE = '#7E48DC';
const DARK_PURPLE = '#110723';
const LIGHT_PURPLE = '#E3D8F7';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: DARK_PURPLE,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerBackButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginTop: 24,
    marginBottom: 4,
  },
  sectionHelper: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: LIGHT_PURPLE,
    borderRadius: 12,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    minHeight: 60,
  },
  uploadIcon: {
    marginRight: 8,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '600',
    color: PURPLE,
  },
  selectedMediaContainer: {
    marginTop: 12,
    marginBottom: 24,
  },
  selectedMediaImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  selectedMediaInfo: {
    marginTop: 8,
    fontSize: 12,
    color: '#6b7280',
  },
  mediaPickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  mediaPickerCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },
  mediaPickerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  mediaPickerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
  },
  mediaPickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  mediaPickerOptionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  mediaPickerOptionContent: {
    flex: 1,
  },
  mediaPickerOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  mediaPickerOptionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  mediaPickerCancel: {
    marginTop: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  mediaPickerCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
  datePickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  datePickerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
    textAlign: 'center',
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  datePickerMonthYear: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  datePickerMonthYearText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginHorizontal: 8,
  },
  datePickerNavButton: {
    padding: 8,
  },
  calendarWeekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  calendarWeekDay: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  calendarWeekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  calendarDaysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  calendarDaySelected: {
    backgroundColor: PURPLE,
    borderRadius: 20,
  },
  calendarDayToday: {
    backgroundColor: LIGHT_PURPLE,
    borderRadius: 20,
  },
  calendarDayDisabled: {
    opacity: 0.3,
  },
  calendarDayText: {
    fontSize: 14,
    color: '#111827',
  },
  calendarDayTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  calendarDayTextToday: {
    color: PURPLE,
    fontWeight: '600',
  },
  calendarDayTextDisabled: {
    color: '#9ca3af',
  },
  datePickerButtons: {
    flexDirection: 'row',
    marginTop: 8,
  },
  datePickerButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  datePickerButtonCancel: {
    backgroundColor: '#f3f4f6',
  },
  datePickerButtonConfirm: {
    backgroundColor: PURPLE,
  },
  datePickerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  datePickerButtonTextCancel: {
    color: '#6b7280',
  },
  datePickerButtonTextConfirm: {
    color: '#ffffff',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingVertical: 16,
    // marginTop: 24,
    // backgroundColor: '#ffffff',
    // borderTopWidth: 1,
    // borderTopColor: '#e5e7eb',
  },
  footerButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerButtonDraft: {
    backgroundColor: LIGHT_PURPLE,
    marginRight: 8,
  },
  footerButtonPublish: {
    backgroundColor: '#f3f4f6',
    marginLeft: 8,
  },
  footerButtonTextDraft: {
    fontSize: 16,
    fontWeight: '600',
    color: PURPLE,
  },
  footerButtonTextPublish: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
});

export default function CreatePage({ selectedTab, onTabChange }) {
  const [heading, setHeading] = useState('');
  const [startDate, setStartDate] = useState('');
  const [category, setCategory] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [description, setDescription] = useState('');
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [mediaPickerVisible, setMediaPickerVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Category options
  const categoryOptions = [
    { label: 'Mandals', value: 'mandals' },
    { label: 'Academies', value: 'academies' },
    { label: 'Vendors', value: 'vendors' },
    { label: 'NGOs', value: 'ngos' },
    { label: 'Events', value: 'events' },
    { label: 'News', value: 'news' },
  ];

  const handleCategorySelect = (value) => {
    setCategoryValue(value);
    const selectedOption = categoryOptions.find(opt => opt.value === value);
    setCategory(selectedOption ? selectedOption.label : '');
    setCategoryModalVisible(false);
  };

  const getSelectedCategoryValue = () => {
    return categoryValue;
  };

  // Media Picker Functions
  const checkDocumentPickerAvailable = () => {
    if (!DocumentPicker || !DocumentPicker.pick) {
      Alert.alert(
        'Module Not Available',
        'Document picker module is not properly linked. Please rebuild the app:\n\n' +
        (Platform.OS === 'ios' 
          ? '1. Run: cd ios && pod install && cd ..\n2. Rebuild the app in Xcode'
          : '1. Clean and rebuild the Android app'),
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const handlePickImage = async () => {
    if (!checkDocumentPickerAvailable()) {
      setMediaPickerVisible(false);
      return;
    }
    
    setMediaPickerVisible(false);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: false,
      });
      if (result && result.length > 0) {
        const file = result[0];
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 10) {
          Alert.alert('File Too Large', 'File size must be less than 10MB');
          return;
        }
        setSelectedMedia({
          name: file.name,
          size: file.size,
          type: file.type,
          uri: file.uri,
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled image picker');
      } else {
        console.error('Error picking image:', err);
        Alert.alert('Error', 'Failed to pick image. Please try again.');
      }
    }
  };

  const handlePickVideo = async () => {
    if (!checkDocumentPickerAvailable()) {
      setMediaPickerVisible(false);
      return;
    }
    
    setMediaPickerVisible(false);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
        allowMultiSelection: false,
      });
      if (result && result.length > 0) {
        const file = result[0];
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 50) {
          Alert.alert('File Too Large', 'Video size must be less than 50MB');
          return;
        }
        setSelectedMedia({
          name: file.name,
          size: file.size,
          type: file.type,
          uri: file.uri,
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled video picker');
      } else {
        console.error('Error picking video:', err);
        Alert.alert('Error', 'Failed to pick video. Please try again.');
      }
    }
  };

  const handlePickMedia = async () => {
    if (!checkDocumentPickerAvailable()) {
      setMediaPickerVisible(false);
      return;
    }
    
    setMediaPickerVisible(false);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.video],
        allowMultiSelection: false,
      });
      if (result && result.length > 0) {
        const file = result[0];
        const fileSizeMB = file.size / (1024 * 1024);
        const maxSize = file.type?.includes('video') ? 50 : 10;
        if (fileSizeMB > maxSize) {
          Alert.alert('File Too Large', `File size must be less than ${maxSize}MB`);
          return;
        }
        setSelectedMedia({
          name: file.name,
          size: file.size,
          type: file.type,
          uri: file.uri,
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled media picker');
      } else {
        console.error('Error picking media:', err);
        Alert.alert('Error', 'Failed to pick media. Please try again.');
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // Date Picker Functions
  const handleDateInputOpen = () => {
    if (startDate) {
      const parts = startDate.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
        const year = parseInt(parts[2], 10);
        setSelectedDate(new Date(year, month, day));
        setCurrentMonth(month);
        setCurrentYear(year);
      } else {
        const today = new Date();
        setSelectedDate(null);
        setCurrentMonth(today.getMonth());
        setCurrentYear(today.getFullYear());
      }
    } else {
      const today = new Date();
      setSelectedDate(null);
      setCurrentMonth(today.getMonth());
      setCurrentYear(today.getFullYear());
    }
    setDatePickerVisible(true);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateDisabled = (day, month, year) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(year, month, day);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const isDateSelected = (day, month, year) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  const handleDaySelect = (day) => {
    if (isDateDisabled(day, currentMonth, currentYear)) {
      return;
    }
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
  };

  const handleDateConfirm = () => {
    if (selectedDate) {
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDate.getFullYear().toString();
      setStartDate(`${day}/${month}/${year}`);
      setDatePickerVisible(false);
    } else {
      Alert.alert('Invalid Date', 'Please select a date');
    }
  };

  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    const today = new Date();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isDisabled = isDateDisabled(day, currentMonth, currentYear);
      const isSelected = isDateSelected(day, currentMonth, currentYear);
      const isToday = 
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarDay,
            isSelected && styles.calendarDaySelected,
            isToday && !isSelected && styles.calendarDayToday,
            isDisabled && styles.calendarDayDisabled,
          ]}
          onPress={() => handleDaySelect(day)}
          disabled={isDisabled}
        >
          <Text
            style={[
              styles.calendarDayText,
              isSelected && styles.calendarDayTextSelected,
              isDisabled && styles.calendarDayTextDisabled,
              isToday && !isSelected && !isDisabled && styles.calendarDayTextToday,
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Custom Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.headerBackButton}>
            <Icon name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Update</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="edit" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Create New Post Section */}
        <Text style={styles.sectionTitle}>Create New Post</Text>

        {/* Select Media */}
        <Text style={styles.sectionSubtitle}>Select Media</Text>
        <Text style={styles.sectionHelper}>
          Select images and videos (jpeg, png, mp4)
        </Text>
        <TouchableOpacity 
          style={styles.uploadBox}
          onPress={() => setMediaPickerVisible(true)}
        >
          <Icon name="cloud-upload" size={32} color={PURPLE} style={styles.uploadIcon} />
          <Text style={styles.uploadText}>
            {selectedMedia ? selectedMedia.name : 'Upload Media'}
          </Text>
        </TouchableOpacity>
        {selectedMedia && selectedMedia.type?.includes('image') && (
          <View style={styles.selectedMediaContainer}>
            <Image 
              source={{ uri: selectedMedia.uri }} 
              style={styles.selectedMediaImage}
            />
            <Text style={styles.selectedMediaInfo}>
              {formatFileSize(selectedMedia.size)}
            </Text>
          </View>
        )}
        {selectedMedia && selectedMedia.type?.includes('video') && (
          <View style={styles.selectedMediaContainer}>
            <Text style={styles.selectedMediaInfo}>
              Video: {selectedMedia.name} ({formatFileSize(selectedMedia.size)})
            </Text>
          </View>
        )}

        {/* Form Fields */}
        <FloatingLabelInput
          label="Heading"
          value={heading}
          onChangeText={setHeading}
          placeholder="Enter heading"
          containerStyle={{ marginTop: 8 }}
        />

        <TouchableOpacity onPress={handleDateInputOpen}>
          <FloatingLabelInput
            label="Start Date"
            value={startDate}
            onChangeText={() => {}}
            placeholder="DD/MM/YYYY"
            editable={false}
            rightIconName="calendar-today"
            containerStyle={{ marginTop: 8 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCategoryModalVisible(true)}>
          <FloatingLabelInput
            label="Category"
            value={category}
            onChangeText={() => {}}
            placeholder="Please select category"
            editable={false}
            rightIcon={true}
            containerStyle={{ marginTop: 8 }}
          />
        </TouchableOpacity>

        <FloatingLabelTextarea
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          containerStyle={{ marginTop: 8 }}
        />

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity style={[styles.footerButton, styles.footerButtonDraft]}>
            <Text style={styles.footerButtonTextDraft}>Save as Draft</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footerButton, styles.footerButtonPublish]}>
            <Text style={styles.footerButtonTextPublish}>Publish</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Category Selection Modal */}
      <SelectionModal
        visible={categoryModalVisible}
        title="Select Category"
        options={categoryOptions}
        selectedValue={getSelectedCategoryValue()}
        onSelect={handleCategorySelect}
        onClose={() => setCategoryModalVisible(false)}
        showSearch={true}
        searchPlaceholder="Search category"
      />

      {/* Media Picker Modal */}
      <Modal
        visible={mediaPickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMediaPickerVisible(false)}
      >
        <View style={styles.mediaPickerOverlay}>
          <View style={styles.mediaPickerCard}>
            <Text style={styles.mediaPickerTitle}>Select Media Type</Text>
            <Text style={styles.mediaPickerSubtitle}>
              Choose how you want to upload your media
            </Text>

            <TouchableOpacity
              style={styles.mediaPickerOption}
              onPress={handlePickImage}
            >
              <Text style={styles.mediaPickerOptionIcon}>📷</Text>
              <View style={styles.mediaPickerOptionContent}>
                <Text style={styles.mediaPickerOptionTitle}>Choose Image</Text>
                <Text style={styles.mediaPickerOptionSubtitle}>Select an image (JPEG, PNG)</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mediaPickerOption}
              onPress={handlePickVideo}
            >
              <Text style={styles.mediaPickerOptionIcon}>🎥</Text>
              <View style={styles.mediaPickerOptionContent}>
                <Text style={styles.mediaPickerOptionTitle}>Choose Video</Text>
                <Text style={styles.mediaPickerOptionSubtitle}>Select a video (MP4)</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mediaPickerOption}
              onPress={handlePickMedia}
            >
              <Text style={styles.mediaPickerOptionIcon}>📁</Text>
              <View style={styles.mediaPickerOptionContent}>
                <Text style={styles.mediaPickerOptionTitle}>Choose Any Media</Text>
                <Text style={styles.mediaPickerOptionSubtitle}>Select image or video</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mediaPickerCancel}
              onPress={() => setMediaPickerVisible(false)}
            >
              <Text style={styles.mediaPickerCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date Picker Modal */}
      <Modal
        visible={datePickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDatePickerVisible(false)}
      >
        <View style={styles.datePickerOverlay}>
          <View style={styles.datePickerCard}>
            <Text style={styles.datePickerTitle}>Select Date</Text>
            
            {/* Month/Year Navigation */}
            <View style={styles.datePickerHeader}>
              <TouchableOpacity
                style={styles.datePickerNavButton}
                onPress={() => handleMonthChange('prev')}
              >
                <Icon name="chevron-left" size={24} color="#111827" />
              </TouchableOpacity>
              <View style={styles.datePickerMonthYear}>
                <Text style={styles.datePickerMonthYearText}>
                  {monthNames[currentMonth]} {currentYear}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.datePickerNavButton}
                onPress={() => handleMonthChange('next')}
              >
                <Icon name="chevron-right" size={24} color="#111827" />
              </TouchableOpacity>
            </View>

            {/* Week Day Headers */}
            <View style={styles.calendarWeekDays}>
              {dayNames.map((day) => (
                <View key={day} style={styles.calendarWeekDay}>
                  <Text style={styles.calendarWeekDayText}>{day}</Text>
                </View>
              ))}
            </View>

            {/* Calendar Days */}
            <View style={styles.calendarDaysContainer}>
              {renderCalendarDays()}
            </View>

            <View style={styles.datePickerButtons}>
              <TouchableOpacity
                style={[styles.datePickerButton, styles.datePickerButtonCancel]}
                onPress={() => setDatePickerVisible(false)}
              >
                <Text style={[styles.datePickerButtonText, styles.datePickerButtonTextCancel]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.datePickerButton, styles.datePickerButtonConfirm]}
                onPress={handleDateConfirm}
              >
                <Text style={[styles.datePickerButtonText, styles.datePickerButtonTextConfirm]}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <BottomNavigation selectedTab={selectedTab} onTabChange={onTabChange} />
    </SafeAreaView>
  );
}
