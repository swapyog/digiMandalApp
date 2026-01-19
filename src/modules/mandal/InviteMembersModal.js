import React, { useEffect, useMemo, useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles/appStyles';
// Import contacts module (autolinked native module)
import Contacts from 'react-native-contacts';

export default function InviteMembersModal({ visible, onClose, selectedMembers, onChangeSelected }) {
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    if (visible) {
      loadContacts();
    } else {
      setSearch('');
    }
  }, [visible]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      
      // Check if Contacts module is available
      if (!Contacts) {
        console.warn('Contacts module not available - using fallback');
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

      // Directly try to fetch contacts. On iOS this will trigger the system permission prompt.
      setHasPermission(true);

      const allContacts = await Contacts.getAll();

      if (!allContacts || allContacts.length === 0) {
        setContacts([]);
        setLoading(false);
        return;
      }

      // Transform contacts to our format
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

      // iOS / Android can throw 'denied' or similar when permission is not granted
      const message = typeof error === 'string' ? error : error?.message || '';
      if (message.toLowerCase().includes('denied') || message.toLowerCase().includes('permission')) {
        setHasPermission(false);
        setContacts([]);
        return;
      }

      setHasPermission(false);
      setContacts([]);
      Alert.alert('Error', `Failed to load contacts: ${message || 'Unknown error'}. Please try again.`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Retry', onPress: loadContacts },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = useMemo(() => {
    if (!search.trim()) {
      return contacts;
    }
    const lower = search.toLowerCase();
    return contacts.filter(
      c => c.name.toLowerCase().includes(lower) || c.phone.includes(search),
    );
  }, [search, contacts]);

  const toggleSelect = contact => {
    const exists = selectedMembers.find(m => m.id === contact.id);
    if (exists) {
      onChangeSelected(selectedMembers.filter(m => m.id !== contact.id));
    } else {
      onChangeSelected([...selectedMembers, contact]);
    }
  };

  const removeSelected = contactId => {
    onChangeSelected(selectedMembers.filter(m => m.id !== contactId));
  };

  const initialsFor = name => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const minMembers = 5;
  const canAdd = selectedMembers.length >= minMembers;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.screenRoot}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBack} onPress={onClose}>
            <Text style={styles.headerBackText}>{'‹'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Invite Members</Text>
        </View>

        <View style={styles.screenBody}>
          <View style={styles.inviteSearchContainer}>
            <TextInput
              style={styles.inviteSearchInput}
              placeholder="Search"
              placeholderTextColor="#9ca3af"
              value={search}
              onChangeText={setSearch}
            />
            <Text style={styles.inviteSearchIcon}>🔍</Text>
          </View>

          {selectedMembers.length > 0 && (
            <View style={styles.inviteSelectedWrapper}>
              <Text style={styles.inviteSelectedCount}>
                {selectedMembers.length} Members Selected
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.inviteSelectedScroll}
              >
                {selectedMembers.map(member => (
                  <View key={member.id} style={styles.inviteSelectedChip}>
                    <View style={styles.inviteSelectedAvatar}>
                      <Text style={styles.inviteSelectedAvatarText}>
                        {initialsFor(member.name)}
                      </Text>
                    </View>
                    <Text style={styles.inviteSelectedName} numberOfLines={1}>
                      {member.name}
                    </Text>
                    <TouchableOpacity
                      style={styles.inviteSelectedRemove}
                      onPress={() => removeSelected(member.id)}
                    >
                      <Text style={styles.inviteSelectedRemoveText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {loading ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={styles.inviteAllContactsLabel}>Loading contacts...</Text>
            </View>
          ) : !hasPermission ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={[styles.inviteAllContactsLabel, { textAlign: 'center', marginBottom: 8 }]}>
                Contacts permission is required
              </Text>
              <Text style={[styles.inviteAllContactsLabel, { fontSize: 14, color: '#6b7280', textAlign: 'center', marginBottom: 16 }]}>
                Please grant contacts permission to invite members. If you've previously denied it, you can enable it in your device settings.
              </Text>
              <TouchableOpacity
                style={[styles.inviteFooterButton, { marginTop: 8 }]}
                onPress={loadContacts}
              >
                <Text style={styles.inviteFooterButtonText}>Grant Permission</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.inviteAllContactsLabel}>
                All {contacts.length} contacts
              </Text>

              <ScrollView
                style={styles.inviteContactsList}
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
              >
                {filteredContacts.map(contact => {
                  const isSelected = !!selectedMembers.find(m => m.id === contact.id);
                  return (
                    <TouchableOpacity
                      key={contact.id}
                      style={[
                        styles.inviteContactRow,
                        isSelected && styles.inviteContactRowSelected,
                      ]}
                      onPress={() => toggleSelect(contact)}
                    >
                      <View style={styles.inviteContactAvatar}>
                        <Text style={styles.inviteContactAvatarText}>
                          {initialsFor(contact.name)}
                        </Text>
                      </View>
                      <View style={styles.inviteContactInfo}>
                        <Text style={styles.inviteContactName}>{contact.name}</Text>
                        <Text style={styles.inviteContactNumber}>{contact.phone}</Text>
                      </View>
                      {isSelected && <Text style={styles.inviteContactCheck}>✓</Text>}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </>
          )}
        </View>

        <View style={styles.inviteFooter}>
          <TouchableOpacity
            style={[
              styles.inviteFooterButton,
              !canAdd && styles.inviteFooterButtonDisabled,
            ]}
            disabled={!canAdd}
            onPress={onClose}
          >
            <Text style={styles.inviteFooterButtonText}>Add Members</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}


