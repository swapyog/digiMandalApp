import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Modal, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DocumentPicker from 'react-native-document-picker';
import { styles, PURPLE } from '../../styles/appStyles';
import { PrimaryButton, FloatingLabelInput, SelectionModal } from '../../components';

export default function BankDetailsScreen({ onNext, onBack }) {
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [filePickerVisible, setFilePickerVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [bankModalVisible, setBankModalVisible] = useState(false);

  // Sample bank list - replace with actual bank list
  const bankOptions = [
    { label: 'State Bank of India', value: 'sbi' },
    { label: 'HDFC Bank', value: 'hdfc' },
    { label: 'ICICI Bank', value: 'icici' },
    { label: 'Axis Bank', value: 'axis' },
    { label: 'Kotak Mahindra Bank', value: 'kotak' },
    { label: 'Punjab National Bank', value: 'pnb' },
    { label: 'Bank of Baroda', value: 'bob' },
    { label: 'Canara Bank', value: 'canara' },
    { label: 'Union Bank of India', value: 'union' },
    { label: 'Indian Bank', value: 'indian' },
  ];

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
    
    setFilePickerVisible(false);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: false,
      });
      if (result && result.length > 0) {
        const file = result[0];
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
    
    setFilePickerVisible(false);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: false,
      });
      if (result && result.length > 0) {
        const file = result[0];
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
    
    setFilePickerVisible(false);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        allowMultiSelection: false,
      });
      if (result && result.length > 0) {
        const file = result[0];
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

  const handleBankSelect = value => {
    const selectedOption = bankOptions.find(opt => opt.value === value);
    if (selectedOption) {
      setBankName(selectedOption.label);
    }
  };

  const getSelectedBankValue = () => {
    const selectedOption = bankOptions.find(opt => opt.label === bankName);
    return selectedOption ? selectedOption.value : null;
  };

  return (
    <SafeAreaView style={styles.screenRoot}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBack} onPress={onBack}>
          <Text style={styles.headerBackText}>{'‹'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Bank Details</Text>
      </View>

      <ScrollView
        style={styles.screenBody}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.languageSecondary, { marginTop: 16, marginBottom: 24 }]}>
          Add bank details to accept donations seemlessly from the members.
        </Text>

        <TouchableOpacity
          onPress={() => setBankModalVisible(true)}
        >
          <FloatingLabelInput
            label="Bank Name"
            value={bankName}
            onChangeText={() => {}}
            placeholder="Select your Bank"
            editable={false}
            rightIcon="▼"
            containerStyle={{ marginTop: 0 }}
          />
        </TouchableOpacity>

        <FloatingLabelInput
          label="Account Name"
          value={accountName}
          onChangeText={setAccountName}
          placeholder="Enter Account Name"
        />

        <FloatingLabelInput
          label="Account Number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          placeholder="Enter Account Number"
          keyboardType="number-pad"
        />

        <FloatingLabelInput
          label="Confirm Account Number"
          value={confirmAccountNumber}
          onChangeText={setConfirmAccountNumber}
          placeholder="Re-Enter Account Number"
          keyboardType="number-pad"
        />

        <FloatingLabelInput
          label="IFSC Code"
          value={ifscCode}
          onChangeText={setIfscCode}
          placeholder="IFSC Code"
        />

        <Text style={[styles.inputLabel, { marginTop: 16, fontWeight: 'bold', color: "#000" }]}>
          Upload Documents
        </Text>
        <Text style={styles.languageSecondary}>
          Acceptable formats are jpeg, pdf, png up to 5MB
        </Text>

        <TouchableOpacity
          style={[styles.languageItem, { marginTop: 12, borderColor: '#d1d5db', borderWidth: 1.5 }]}
          onPress={() => setFilePickerVisible(true)}
        >
          <Text style={[styles.languagePrimary, { color: PURPLE }]}>
            ⬆ Upload Cancelled Cheque*
          </Text>
          {selectedFile && (
            <Text style={[styles.languageSecondary, { marginTop: 4, fontSize: 12 }]}>
              {selectedFile.name} ({formatFileSize(selectedFile.size)})
            </Text>
          )}
        </TouchableOpacity>

        <PrimaryButton
          title="Next"
          onPress={onNext}
          style={{ marginTop: 24 }}
        />
      </ScrollView>

      {/* Bank Selection Modal */}
      <SelectionModal
        visible={bankModalVisible}
        title="Select your Bank"
        options={bankOptions}
        selectedValue={getSelectedBankValue()}
        onSelect={handleBankSelect}
        onClose={() => setBankModalVisible(false)}
        showSearch={true}
        searchPlaceholder="Search bank"
      />

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

