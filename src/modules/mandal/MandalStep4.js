import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Modal, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../styles/appStyles';
import { PrimaryButton, FloatingLabelInput } from '../../components';

export default function MandalStep4({ onNext, onBack }) {
  const [dateOfRegistration, setDateOfRegistration] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [organisationAddress, setOrganisationAddress] = useState('');
  const [filePickerVisible, setFilePickerVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Check if DocumentPicker is available
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
      setFilePickerVisible(false);
      return;
    }
    
    setFilePickerVisible(false); // Close modal first
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: false,
      });
      if (result && result.length > 0) {
        const file = result[0];
        // Check file size (5MB limit)
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 5) {
          Alert.alert('File Too Large', 'File size must be less than 5MB');
          return;
        }
        setSelectedFile({
          name: file.name,
          size: file.size,
          type: file.type,
          uri: file.uri,
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled - no action needed
        console.log('User cancelled image picker');
      } else {
        console.error('Error picking image:', err);
        const errorMsg = err?.message || err?.toString() || 'Unknown error';
        if (errorMsg.includes('nativeDocumentPicker') || errorMsg.includes('undefined')) {
          Alert.alert(
            'Module Not Linked',
            'Document picker native module is not properly linked. Please:\n\n' +
            (Platform.OS === 'ios'
              ? '1. Run: cd ios && pod install\n2. Clean build folder in Xcode\n3. Rebuild the app'
              : '1. Clean the project\n2. Rebuild the app'),
            [{ text: 'OK' }]
          );
        } else {
          Alert.alert('Error', `Failed to pick image: ${errorMsg}`);
        }
      }
    }
  };

  const handlePickPDF = async () => {
    if (!checkDocumentPickerAvailable()) {
      setFilePickerVisible(false);
      return;
    }
    
    setFilePickerVisible(false); // Close modal first
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: false,
      });
      if (result && result.length > 0) {
        const file = result[0];
        // Check file size (5MB limit)
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 5) {
          Alert.alert('File Too Large', 'File size must be less than 5MB');
          return;
        }
        setSelectedFile({
          name: file.name,
          size: file.size,
          type: file.type,
          uri: file.uri,
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled - no action needed
        console.log('User cancelled PDF picker');
      } else {
        console.error('Error picking PDF:', err);
        const errorMsg = err?.message || err?.toString() || 'Unknown error';
        if (errorMsg.includes('nativeDocumentPicker') || errorMsg.includes('undefined')) {
          Alert.alert(
            'Module Not Linked',
            'Document picker native module is not properly linked. Please:\n\n' +
            (Platform.OS === 'ios'
              ? '1. Run: cd ios && pod install\n2. Clean build folder in Xcode\n3. Rebuild the app'
              : '1. Clean the project\n2. Rebuild the app'),
            [{ text: 'OK' }]
          );
        } else {
          Alert.alert('Error', `Failed to pick PDF: ${errorMsg}`);
        }
      }
    }
  };

  const handlePickDocument = async () => {
    if (!checkDocumentPickerAvailable()) {
      setFilePickerVisible(false);
      return;
    }
    
    setFilePickerVisible(false); // Close modal first
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        allowMultiSelection: false,
      });
      if (result && result.length > 0) {
        const file = result[0];
        // Check file size (5MB limit)
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 5) {
          Alert.alert('File Too Large', 'File size must be less than 5MB');
          return;
        }
        setSelectedFile({
          name: file.name,
          size: file.size,
          type: file.type,
          uri: file.uri,
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled - no action needed
        console.log('User cancelled document picker');
      } else {
        console.error('Error picking document:', err);
        const errorMsg = err?.message || err?.toString() || 'Unknown error';
        if (errorMsg.includes('nativeDocumentPicker') || errorMsg.includes('undefined')) {
          Alert.alert(
            'Module Not Linked',
            'Document picker native module is not properly linked. Please:\n\n' +
            (Platform.OS === 'ios'
              ? '1. Run: cd ios && pod install\n2. Clean build folder in Xcode\n3. Rebuild the app'
              : '1. Clean the project\n2. Rebuild the app'),
            [{ text: 'OK' }]
          );
        } else {
          Alert.alert('Error', `Failed to pick file: ${errorMsg}`);
        }
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
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
          <Icon name="check" size={18} color="#7b3cff" style={[styles.stepTabText, styles.stepTabTextActive]} />
          <View style={styles.stepTabUnderline} />
        </View>
        <View style={styles.stepTab}>
          <Text style={[styles.stepTabText, styles.stepTabTextActive]}>4</Text>
          <View style={[styles.stepTabUnderline, styles.stepTabUnderlineActive]} />
        </View>
      </View>
      <ScrollView
        style={styles.screenBody}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionTitle}>Registration Info</Text>

        <FloatingLabelInput
          label="Date of Registration"
          value={dateOfRegistration}
          onChangeText={setDateOfRegistration}
          placeholder="In DD/MM/YYYY Format"
          keyboardType="number-pad"
        />

        <FloatingLabelInput
          label="PAN number"
          value={panNumber}
          onChangeText={setPanNumber}
          placeholder="Enter organisation PAN number"
          // containerStyle={{ marginTop: 16 }}
        />

        <FloatingLabelInput
          label="Organisation Address"
          value={organisationAddress}
          onChangeText={setOrganisationAddress}
          placeholder="Enter organisation registered address"
          multiline
          textAlignVertical="top"
          // containerStyle={{ marginTop: 16 }}
        />

        <Text style={[styles.inputLabel, { marginTop: 16, fontWeight: 'bold', color: "#000" }]}>Upload Documents</Text>
        <Text style={styles.languageSecondary}>
          Acceptable formats are jpeg, pdf, png up to 5MB
        </Text>

        <TouchableOpacity
          style={[styles.languageItem, { marginTop: 12 }]}
          onPress={() => setFilePickerVisible(true)}
        >
          <Text style={styles.languagePrimary}>
            {selectedFile ? selectedFile.name : 'Upload Registration Certificate*'}
          </Text>
          {selectedFile && (
            <Text style={[styles.languageSecondary, { marginTop: 4, fontSize: 12 }]}>
              {formatFileSize(selectedFile.size)}
            </Text>
          )}
        </TouchableOpacity>

        <PrimaryButton
          title="Next"
          onPress={onNext}
          style={{ marginTop: 24 }}
        />
      </ScrollView>

      {/* File Picker Modal */}
      <Modal
        visible={filePickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilePickerVisible(false)}
      >
        <View style={styles.filePickerOverlay}>
          <View style={styles.filePickerCard}>
            <Text style={styles.filePickerTitle}>Select File Type</Text>
            <Text style={styles.filePickerSubtitle}>
              Choose how you want to upload your document
            </Text>

            <TouchableOpacity
              style={styles.filePickerOption}
              onPress={handlePickImage}
            >
              <Text style={styles.filePickerOptionIcon}>📷</Text>
              <View style={styles.filePickerOptionContent}>
                <Text style={styles.filePickerOptionTitle}>Choose from Gallery</Text>
                <Text style={styles.filePickerOptionSubtitle}>Select an image from your gallery</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filePickerOption}
              onPress={handlePickPDF}
            >
              <Text style={styles.filePickerOptionIcon}>📄</Text>
              <View style={styles.filePickerOptionContent}>
                <Text style={styles.filePickerOptionTitle}>Choose PDF Document</Text>
                <Text style={styles.filePickerOptionSubtitle}>Select a PDF file</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filePickerOption}
              onPress={handlePickDocument}
            >
              <Text style={styles.filePickerOptionIcon}>📁</Text>
              <View style={styles.filePickerOptionContent}>
                <Text style={styles.filePickerOptionTitle}>Choose Any File</Text>
                <Text style={styles.filePickerOptionSubtitle}>Select image or PDF</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filePickerCancel}
              onPress={() => setFilePickerVisible(false)}
            >
              <Text style={styles.filePickerCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}


