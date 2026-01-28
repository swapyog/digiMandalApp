import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../styles/appStyles';
import {
  FloatingLabelInput,
  ToggleButton,
  PrimaryButton,
  SelectionModal,
} from '../../components';
import { apiHost, API_PATHS } from '../../constants';
import { StorageService } from '../../utils/storage';
import { getAuthHeaders } from '../../utils/common';
import { sizeOptions, categoryOptions, categorySections, getYearOptions } from '../../utils/mandalData';
import axios from 'axios';

export default function MandalStep1({ onNext, onBack }) {
  const [mandalName, setMandalName] = useState('');
  const [mandalSize, setMandalSize] = useState('');
  const [mandalCategory, setMandalCategory] = useState('');
  const [formationYear, setFormationYear] = useState('');
  const [mandalType, setMandalType] = useState('private');
  const [isRegistered, setIsRegistered] = useState(true);
  const [sizeModalVisible, setSizeModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [formationYearModalVisible, setFormationYearModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const yearOptions = getYearOptions(2025, 1950);

  const handleSizeSelect = value => {
    const selectedOption = sizeOptions.find(opt => opt.value === value);
    if (selectedOption) {
      setMandalSize(selectedOption.label);
    }
  };

  const handleCategorySelect = value => {
    const selectedOption = categoryOptions.find(opt => opt.value === value);
    if (selectedOption) {
      setMandalCategory(selectedOption.label);
    }
  };

  const handleFormationYearSelect = value => {
    setFormationYear(value);
  };

  const getSelectedSizeValue = () => {
    const selectedOption = sizeOptions.find(opt => opt.label === mandalSize);
    return selectedOption ? selectedOption.value : null;
  };

  const getSelectedCategoryValue = () => {
    const selectedOption = categoryOptions.find(opt => opt.label === mandalCategory);
    return selectedOption ? selectedOption.value : null;
  };

  const handleNext = async () => {
    const category = getSelectedCategoryValue();
    if (!mandalName?.trim()) {
      Alert.alert('Required', 'Please enter Mandal Name');
      return;
    }
    if (!category) {
      Alert.alert('Required', 'Please select Mandal Category');
      return;
    }
    setSubmitting(true);
    try {
      const accessToken = (await StorageService.getAccessToken()) ?? '';
      if (!accessToken) {
        Alert.alert(
          'Session expired',
          'Please log in again to create a mandal.',
          [{ text: 'OK', onPress: () => onBack?.() }]
        );
        setSubmitting(false);
        return;
      }
      const res = await axios.post(
        `${apiHost.baseURL}${API_PATHS.MANDAL}`,
        {
          name: mandalName.trim(),
          category,
          size: getSelectedSizeValue() || undefined,
          formationYear: formationYear ? parseInt(formationYear, 10) : undefined,
          isPrivate: mandalType === 'private',
        },
        { headers: getAuthHeaders(accessToken) }
      );
      const data = res.data;
      const mandalId = data?.data?.id;
      if (mandalId != null) {
        await StorageService.setMandalId(String(mandalId));
      }
      if (data && onNext) {
        onNext();
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      Alert.alert('Error', msg || 'Could not create mandal. Please try again.');
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
          <Text style={[styles.stepTabText, styles.stepTabTextActive]}>1</Text>
          <View style={[styles.stepTabUnderline, styles.stepTabUnderlineActive]} />
        </View>
        <View style={styles.stepTab}>
          <Text style={styles.stepTabText}>2</Text>
          <View style={styles.stepTabUnderline} />
        </View>
        <View style={styles.stepTab}>
          <Text style={styles.stepTabText}>3</Text>
          <View style={styles.stepTabUnderline} />
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
        <Text style={styles.sectionTitle}>Mandal Details</Text>

        <FloatingLabelInput
          label="Mandal Name"
          value={mandalName}
          onChangeText={setMandalName}
          placeholder="Mandal Name"
        />

        <Text style={[styles.inputLabel]}>What is mandal type?</Text>
        <ToggleButton
          options={[
            { label: 'Public', value: 'public' },
            { label: 'Private', value: 'private' },
          ]}
          selectedValue={mandalType}
          onValueChange={setMandalType}
        />

        <TouchableOpacity
          onPress={() => setSizeModalVisible(true)}
          style={{ marginTop: 8 }}
        >
          <FloatingLabelInput
            label="Size"
            value={mandalSize}
            onChangeText={() => {}}
            placeholder="Select mandal size"
            editable={false}
            rightIcon="▼"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCategoryModalVisible(true)}
          // style={{ marginTop: 16 }}
        >
          <FloatingLabelInput
            label="Category"
            value={mandalCategory}
            onChangeText={() => {}}
            placeholder="Select mandal category"
            editable={false}
            rightIcon="▼"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFormationYearModalVisible(true)}
          // style={{ marginTop: 16 }}
        >
          <FloatingLabelInput
            label="Formation year"
            value={formationYear}
            onChangeText={() => {}}
            placeholder="Select mandal's formation year"
            editable={false}
            rightIcon="▼"
          />
        </TouchableOpacity>

        <Text style={[styles.inputLabel]}>Is your mandal registered?</Text>
        <ToggleButton
          options={[
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ]}
          selectedValue={isRegistered}
          onValueChange={setIsRegistered}
          containerStyle={{ marginBottom: 24 }}
        />

        <PrimaryButton
          title={submitting ? 'Creating…' : 'Next'}
          onPress={handleNext}
          disabled={submitting}
        />
      </ScrollView>

      <SelectionModal
        visible={sizeModalVisible}
        title="Select Mandal Size"
        options={sizeOptions}
        selectedValue={getSelectedSizeValue()}
        onSelect={handleSizeSelect}
        onClose={() => setSizeModalVisible(false)}
      />

      <SelectionModal
        visible={categoryModalVisible}
        title="Select Mandal Category"
        options={categoryOptions}
        selectedValue={getSelectedCategoryValue()}
        onSelect={handleCategorySelect}
        onClose={() => setCategoryModalVisible(false)}
        showSearch={true}
        sections={categorySections}
      />

      <SelectionModal
        visible={formationYearModalVisible}
        title="Select Mandal's Formation year"
        options={yearOptions}
        selectedValue={formationYear}
        onSelect={handleFormationYearSelect}
        onClose={() => setFormationYearModalVisible(false)}
        showSearch={true}
      />
    </SafeAreaView>
  );
}


