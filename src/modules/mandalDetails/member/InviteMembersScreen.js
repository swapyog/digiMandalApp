import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  Modal,
  ScrollView,
  View,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';
import { styles } from '../../../styles/appStyles';
import Contacts from 'react-native-contacts';
import FiltersModal from '../components/FiltersModal';
import ContactsList from '../components/ContactsList';
import SelectedMembersChips from '../components/SelectedMembersChips';
import SearchInput from '../components/SearchInput';
import ScreenHeader from '../components/ScreenHeader';
import ActionButton from '../components/ActionButton';

export default function InviteMembersScreen({ visible, onClose, onSuccess }) {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const loadContacts = useCallback(async () => {
    try {
      setLoading(true);

      if (!Contacts) {
        console.warn('Contacts module not available');
        setHasPermission(false);
        setContacts([]);
        setLoading(false);
        Alert.alert(
          'Contacts Not Available',
          'The contacts module is not properly installed. Please rebuild the app after installing react-native-contacts.',
          [{ text: 'OK' }]
        );
        return;
      }

      let permissionStatus;
      try {
        permissionStatus = await Contacts.checkPermission();
      } catch (checkError) {
        console.warn('Error checking permission:', checkError);
        try {
          permissionStatus = await Contacts.requestPermission();
        } catch (requestError) {
          console.error('Error requesting permission:', requestError);
          setHasPermission(false);
          setContacts([]);
          setLoading(false);
          Alert.alert(
            'Permission Required',
            'Contacts permission is required to invite members.',
            [{ text: 'OK' }]
          );
          return;
        }
      }

      if (permissionStatus === 'undefined' || permissionStatus === 'denied') {
        try {
          permissionStatus = await Contacts.requestPermission();
        } catch (requestError) {
          console.error('Error requesting permission:', requestError);
          setHasPermission(false);
          setContacts([]);
          setLoading(false);
          Alert.alert(
            'Permission Required',
            'Contacts permission is required to invite members.',
            [{ text: 'OK' }]
          );
          return;
        }
      }

      if (permissionStatus !== 'authorized') {
        setHasPermission(false);
        setContacts([]);
        setLoading(false);
        Alert.alert(
          'Permission Required',
          'Contacts permission is required to invite members.',
          [{ text: 'OK' }]
        );
        return;
      }

      setHasPermission(true);
      const allContacts = await Contacts.getAll();

      if (!allContacts || allContacts.length === 0) {
        setContacts([]);
        setLoading(false);
        return;
      }

      const formattedContacts = allContacts
        .filter(contact => contact.phoneNumbers && contact.phoneNumbers.length > 0)
        .map((contact, index) => {
          const phoneNumber = contact.phoneNumbers[0]?.number || '';
          const cleanPhone = phoneNumber.replace(/[\s\-\(\)]/g, '');
          const displayName =
            contact.displayName ||
            contact.givenName ||
            contact.familyName ||
            `${contact.givenName || ''} ${contact.familyName || ''}`.trim() ||
            'Unknown';

          return {
            id: contact.recordID || contact.id || `contact-${index}-${Date.now()}`,
            name: displayName,
            phone: cleanPhone,
          };
        })
        .filter(contact => contact.phone.length > 0)
        .sort((a, b) => a.name.localeCompare(b.name));

      setContacts(formattedContacts);
    } catch (error) {
      console.error('Error loading contacts:', error);
      const message = typeof error === 'string' ? error : error?.message || '';
      if (message.toLowerCase().includes('denied') || message.toLowerCase().includes('permission')) {
        setHasPermission(false);
        setContacts([]);
        setLoading(false);
        Alert.alert(
          'Permission Denied',
          'Contacts permission is required to invite members.',
          [{ text: 'OK' }]
        );
        return;
      }

      setHasPermission(false);
      setContacts([]);
      setLoading(false);
      Alert.alert('Error', `Failed to load contacts: ${message || 'Unknown error'}.`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Retry', onPress: loadContacts },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      loadContacts();
    } else {
      setSearch('');
      setSelectedMembers([]);
      setSelectedFilter(null);
    }
  }, [visible, loadContacts]);

  const filteredContacts = useMemo(() => {
    let result = contacts;

    // Apply search filter with debounced value
    if (debouncedSearch.trim()) {
      const lower = debouncedSearch.toLowerCase();
      result = result.filter(
        c => c.name.toLowerCase().includes(lower) || c.phone.includes(debouncedSearch),
      );
    }

    // Apply sort filter
    if (selectedFilter) {
      switch (selectedFilter) {
        case 'az':
          result = [...result].sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'za':
          result = [...result].sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'latest':
          // For contacts, we'll keep original order (already sorted by name when loaded)
          // If you have timestamps, sort by that instead
          break;
        default:
          break;
      }
    } else {
      // Default: sort A-Z
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [debouncedSearch, contacts, selectedFilter]);

  const toggleSelect = contact => {
    const exists = selectedMembers.find(m => m.id === contact.id);
    if (exists) {
      setSelectedMembers(selectedMembers.filter(m => m.id !== contact.id));
    } else {
      setSelectedMembers([...selectedMembers, contact]);
    }
  };

  const removeSelected = contactId => {
    setSelectedMembers(selectedMembers.filter(m => m.id !== contactId));
  };

  const handleAddMembers = () => {
    if (selectedMembers.length === 0) {
      Alert.alert('No Members Selected', 'Please select at least one member to invite.');
      return;
    }
    if (onSuccess) {
      onSuccess();
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.screenRoot}>
        <ScreenHeader title="Invite Members" onBack={onClose} />

        <View style={styles.screenBody}>
          <SearchInput value={search} onChangeText={setSearch} />

          <SelectedMembersChips
            selectedMembers={selectedMembers}
            onRemoveMember={removeSelected}
          />

          <ContactsList
            loading={loading}
            hasPermission={hasPermission}
            contacts={contacts}
            filteredContacts={filteredContacts}
            selectedMembers={selectedMembers}
            onGrantPermission={loadContacts}
            onToggleSelect={toggleSelect}
            onOpenFilters={() => setFiltersVisible(true)}
          />
        </View>

        <ActionButton title="Add Members" onPress={handleAddMembers} />

        <FiltersModal
          visible={filtersVisible}
          onClose={() => setFiltersVisible(false)}
          onSelect={(filterId) => {
            setSelectedFilter(filterId);
            setFiltersVisible(false);
          }}
        />
      </SafeAreaView>
    </Modal>
  );
}

