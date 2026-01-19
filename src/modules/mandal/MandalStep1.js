import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../styles/appStyles';
import {
  FloatingLabelInput,
  ToggleButton,
  PrimaryButton,
  SelectionModal,
} from '../../components';

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

  const sizeOptions = [
    { label: '1-20', value: '1-20' },
    { label: '21-50', value: '21-50' },
    { label: '51-200', value: '51-200' },
    { label: '201-500', value: '201-500' },
    { label: '501-2000', value: '501-2000' },
    { label: 'More than 2000', value: 'more-than-2000' },
  ];

  const categoryOptions = [
    { label: 'Cultural', value: 'cultural' },
    { label: 'Education', value: 'education' },
    { label: 'Entertainment', value: 'entertainment' },
    { label: 'Design', value: 'design' },
    { label: 'Welfare Association', value: 'welfare-association' },
    { label: 'Sports Association', value: 'sports-association' },
    { label: 'Religious', value: 'religious' },
    { label: 'Social', value: 'social' },
    { label: 'Charity', value: 'charity' },
    { label: 'Youth', value: 'youth' },
  ];

  const categorySections = [
    {
      title: 'Popular',
      options: categoryOptions.slice(0, 6),
    },
    {
      title: 'All Categories',
      options: categoryOptions,
    },
  ];

  // Generate years from 2025 down to 1950
  const generateYearOptions = () => {
    const years = [];
    for (let year = 2025; year >= 1950; year--) {
      years.push({ label: String(year), value: String(year) });
    }
    return years;
  };

  const yearOptions = generateYearOptions();

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

        <PrimaryButton title="Next" onPress={onNext} />
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


