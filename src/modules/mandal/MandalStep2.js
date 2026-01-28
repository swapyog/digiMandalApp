import React, { useState, useMemo } from 'react';
import { Alert, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../styles/appStyles';
import { PrimaryButton, FloatingLabelInput, SelectionModal } from '../../components';
import { apiHost, API_PATHS } from '../../constants';
import { StorageService } from '../../utils/storage';
import { getAuthHeaders } from '../../utils/common';
import { cityOptions, stateOptions } from '../../utils/mandalData';
import axios from 'axios';

export default function MandalStep2({ onNext, onBack }) {
  const [streetAddress1, setStreetAddress1] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [stateModalVisible, setStateModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // Dynamic location text: from address fields, or coordinates when set
  const displayLocation = useMemo(() => {
    if (latitude?.trim() && longitude?.trim()) {
      return `Latitude: ${latitude}, Longitude: ${longitude}`;
    }
    const parts = [streetAddress1?.trim(), landmark?.trim(), city?.trim(), state?.trim(), pincode?.trim()].filter(Boolean);
    return parts.length ? parts.join(', ') : null;
  }, [streetAddress1, landmark, city, state, pincode, latitude, longitude]);

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

  const handleLocationModalSave = () => {
    setLocationModalVisible(false);
  };

  const handleNext = async () => {
    if (!streetAddress1?.trim()) {
      Alert.alert('Required', 'Please enter Street Address 1');
      return;
    }
    if (!city) {
      Alert.alert('Required', 'Please select City');
      return;
    }
    if (!state) {
      Alert.alert('Required', 'Please select State');
      return;
    }
    if (!pincode?.trim() || pincode.length !== 6) {
      Alert.alert('Required', 'Please enter a valid 6-digit PIN code');
      return;
    }
    setSubmitting(true);
    try {
      const accessToken = (await StorageService.getAccessToken()) ?? '';
      const mandalId = await StorageService.getMandalId();
      if (!accessToken) {
        Alert.alert('Session expired', 'Please log in again.', [{ text: 'OK', onPress: () => onBack?.() }]);
        setSubmitting(false);
        return;
      }
      if (!mandalId) {
        Alert.alert('Error', 'Mandal not found. Please complete Step 1 first.', [{ text: 'OK', onPress: () => onBack?.() }]);
        setSubmitting(false);
        return;
      }
      const res = await axios.post(
        `${apiHost.baseURL}${API_PATHS.MANDAL}/${mandalId}/address`,
        {
          addressLine1: streetAddress1.trim(),
          addressLine2: landmark?.trim() || undefined,
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
          latitude: latitude?.trim() || '',
          longitude: longitude?.trim() || '',
        },
        { headers: getAuthHeaders(accessToken) }
      );
      const data = res.data;
      if (data && onNext) {
        onNext();
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      Alert.alert('Error', msg || 'Could not save address. Please try again.');
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
              <View style={styles.mapRoad1} />
              <View style={styles.mapRoad2} />
              <View style={styles.mapRoad3} />
              <View style={styles.mapMarker}>
                <View style={styles.mapMarkerPin} />
              </View>
            </View>
            <TouchableOpacity
              style={styles.editLocationButton}
              onPress={() => setLocationModalVisible(true)}
            >
              <Text style={styles.editLocationButtonText}>Edit Location</Text>
            </TouchableOpacity>
          </View>

          {displayLocation ? (
            <View style={styles.locationCard}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText} numberOfLines={3}>
                {displayLocation}
              </Text>
            </View>
          ) : (
            <View style={styles.locationCard}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={[styles.locationText, { color: '#9ca3af' }]} numberOfLines={2}>
                Fill address above, or tap Edit Location to enter coordinates
              </Text>
            </View>
          )}
        </View>

        <Modal
          visible={locationModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setLocationModalVisible(false)}
        >
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
            activeOpacity={1}
            onPress={() => setLocationModalVisible(false)}
          >
            <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()} style={{ backgroundColor: '#1f2937', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 24, paddingBottom: 32 }}>
              <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>Set Location</Text>
              <Text style={{ color: '#9ca3af', fontSize: 12, marginBottom: 12 }}>Enter coordinates (optional)</Text>
              <FloatingLabelInput
                label="Latitude"
                value={latitude}
                onChangeText={setLatitude}
                placeholder="e.g. 19.0760"
                keyboardType="decimal-pad"
              />
              <FloatingLabelInput
                label="Longitude"
                value={longitude}
                onChangeText={setLongitude}
                placeholder="e.g. 72.8777"
                keyboardType="decimal-pad"
                containerStyle={{ marginTop: 8 }}
              />
              <View style={{ flexDirection: 'row', marginTop: 20, gap: 12 }}>
                <TouchableOpacity
                  style={{ flex: 1, paddingVertical: 12, borderRadius: 8, backgroundColor: '#374151', alignItems: 'center' }}
                  onPress={() => setLocationModalVisible(false)}
                >
                  <Text style={{ color: '#fff' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 1, paddingVertical: 12, borderRadius: 8, backgroundColor: '#7c3aed', alignItems: 'center' }}
                  onPress={handleLocationModalSave}
                >
                  <Text style={{ color: '#fff', fontWeight: '600' }}>Done</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>

        <PrimaryButton
          title={submitting ? 'Saving…' : 'Next'}
          onPress={handleNext}
          disabled={submitting}
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


