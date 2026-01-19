import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../styles/appStyles';
import { PrimaryButton, FloatingLabelInput, SelectionModal } from '../../components';

export default function MandalStep2({ onNext, onBack }) {
  const [streetAddress1, setStreetAddress1] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(
    'Om Sai Krupa C.H.S., Khewra Circle Road, Gladys Alwis Marg, Pokharan Road No.2, Thane west'
  );
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [stateModalVisible, setStateModalVisible] = useState(false);

  // Indian cities list
  const cityOptions = [
    { label: 'Mumbai', value: 'mumbai' },
    { label: 'Delhi', value: 'delhi' },
    { label: 'Bangalore', value: 'bangalore' },
    { label: 'Hyderabad', value: 'hyderabad' },
    { label: 'Chennai', value: 'chennai' },
    { label: 'Kolkata', value: 'kolkata' },
    { label: 'Pune', value: 'pune' },
    { label: 'Ahmedabad', value: 'ahmedabad' },
    { label: 'Jaipur', value: 'jaipur' },
    { label: 'Surat', value: 'surat' },
    { label: 'Lucknow', value: 'lucknow' },
    { label: 'Kanpur', value: 'kanpur' },
    { label: 'Nagpur', value: 'nagpur' },
    { label: 'Indore', value: 'indore' },
    { label: 'Thane', value: 'thane' },
    { label: 'Bhopal', value: 'bhopal' },
    { label: 'Visakhapatnam', value: 'visakhapatnam' },
    { label: 'Patna', value: 'patna' },
    { label: 'Vadodara', value: 'vadodara' },
    { label: 'Ghaziabad', value: 'ghaziabad' },
  ];

  // Indian states list
  const stateOptions = [
    { label: 'Andhra Pradesh', value: 'andhra-pradesh' },
    { label: 'Arunachal Pradesh', value: 'arunachal-pradesh' },
    { label: 'Assam', value: 'assam' },
    { label: 'Bihar', value: 'bihar' },
    { label: 'Chhattisgarh', value: 'chhattisgarh' },
    { label: 'Goa', value: 'goa' },
    { label: 'Gujarat', value: 'gujarat' },
    { label: 'Haryana', value: 'haryana' },
    { label: 'Himachal Pradesh', value: 'himachal-pradesh' },
    { label: 'Jharkhand', value: 'jharkhand' },
    { label: 'Karnataka', value: 'karnataka' },
    { label: 'Kerala', value: 'kerala' },
    { label: 'Madhya Pradesh', value: 'madhya-pradesh' },
    { label: 'Maharashtra', value: 'maharashtra' },
    { label: 'Manipur', value: 'manipur' },
    { label: 'Meghalaya', value: 'meghalaya' },
    { label: 'Mizoram', value: 'mizoram' },
    { label: 'Nagaland', value: 'nagaland' },
    { label: 'Odisha', value: 'odisha' },
    { label: 'Punjab', value: 'punjab' },
    { label: 'Rajasthan', value: 'rajasthan' },
    { label: 'Sikkim', value: 'sikkim' },
    { label: 'Tamil Nadu', value: 'tamil-nadu' },
    { label: 'Telangana', value: 'telangana' },
    { label: 'Tripura', value: 'tripura' },
    { label: 'Uttar Pradesh', value: 'uttar-pradesh' },
    { label: 'Uttarakhand', value: 'uttarakhand' },
    { label: 'West Bengal', value: 'west-bengal' },
  ];

  const handleCitySelect = value => {
    const selectedOption = cityOptions.find(opt => opt.value === value);
    if (selectedOption) {
      setCity(selectedOption.label);
    }
  };

  const handleStateSelect = value => {
    const selectedOption = stateOptions.find(opt => opt.value === value);
    if (selectedOption) {
      setState(selectedOption.label);
    }
  };

  const getSelectedCityValue = () => {
    const selectedOption = cityOptions.find(opt => opt.label === city);
    return selectedOption ? selectedOption.value : null;
  };

  const getSelectedStateValue = () => {
    const selectedOption = stateOptions.find(opt => opt.label === state);
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
          <Icon name="check" size={18} color="#7b3cff" style={[styles.stepTabText, styles.stepTabTextActive]} />
          <View style={styles.stepTabUnderline} />
        </View>
        <View style={styles.stepTab}>
          <Text style={[styles.stepTabText, styles.stepTabTextActive]}>2</Text>
          <View style={[styles.stepTabUnderline, styles.stepTabUnderlineActive]} />
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
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={true}
        alwaysBounceVertical={false}
        nestedScrollEnabled={true}
      >
        <Text style={styles.sectionTitle}>Mandal Address</Text>

        <FloatingLabelInput
          label="Street Address 1"
          value={streetAddress1}
          onChangeText={setStreetAddress1}
          placeholder="Enter mandal's street address 1"
        />

        <FloatingLabelInput
          label="Landmark"
          value={landmark}
          onChangeText={setLandmark}
          placeholder="Enter nearby landmark"
        // containerStyle={{ marginTop: 16 }}
        />

        <FloatingLabelInput
          label="PIN code"
          value={pincode}
          onChangeText={text => setPincode(text.replace(/[^0-9]/g, ''))}
          placeholder="Enter pincode"
          keyboardType="number-pad"
          maxLength={6}
        // containerStyle={{ marginTop: 16 }}
        />

        <TouchableOpacity
          onPress={() => setStateModalVisible(true)}
        // style={{ marginTop: 16 }}
        >
          <FloatingLabelInput
            label="State"
            value={state}
            onChangeText={() => { }}
            placeholder="Select State"
            editable={false}
            rightIcon="▼"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCityModalVisible(true)}
        // style={{ marginTop: 16 }}
        >
          <FloatingLabelInput
            label="City"
            value={city}
            onChangeText={() => { }}
            placeholder="Select city"
            editable={false}
            rightIcon="▼"
          />
        </TouchableOpacity>



        <View>
          <Text style={styles.inputLabel}>Location</Text>
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              {/* Map placeholder - in real app, this would be a MapView component */}
              {/* Simulated map roads */}
              <View style={styles.mapRoad1} />
              <View style={styles.mapRoad2} />
              <View style={styles.mapRoad3} />
              {/* Location marker */}
              <View style={styles.mapMarker}>
                <View style={styles.mapMarkerPin} />
              </View>
            </View>
            <TouchableOpacity
              style={styles.editLocationButton}
              onPress={() => {
                // Handle edit location - could open a map picker modal
                console.log('Edit location pressed');
              }}
            >
              <Text style={styles.editLocationButtonText}>Edit Location</Text>
            </TouchableOpacity>
          </View>

          {selectedLocation && (
            <View style={styles.locationCard}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText} numberOfLines={2}>
                {selectedLocation}
              </Text>
            </View>
          )}
        </View>

        <PrimaryButton
          title="Next"
          onPress={onNext}
          style={{ marginTop: 24 }}
        />
      </ScrollView>

      <SelectionModal
        visible={cityModalVisible}
        title="Select City"
        options={cityOptions}
        selectedValue={getSelectedCityValue()}
        onSelect={handleCitySelect}
        onClose={() => setCityModalVisible(false)}
        showSearch={true}
      />

      <SelectionModal
        visible={stateModalVisible}
        title="Select State"
        options={stateOptions}
        selectedValue={getSelectedStateValue()}
        onSelect={handleStateSelect}
        onClose={() => setStateModalVisible(false)}
        showSearch={true}
      />
    </SafeAreaView>
  );
}


