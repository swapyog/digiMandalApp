import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PURPLE = '#7b3cff';

export default function ContactsList({
  loading,
  hasPermission,
  contacts,
  filteredContacts,
  selectedMembers,
  onGrantPermission,
  onToggleSelect,
  onOpenFilters,
}) {
  const initialsFor = name => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (loading) {
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: '#6b7280' }}>Loading contacts...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: '#111827', textAlign: 'center', marginBottom: 8 }}>
          Contacts permission is required
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#6b7280',
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          Please grant contacts permission to invite members.
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: PURPLE,
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 8,
          }}
          onPress={onGrantPermission}
        >
          <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600' }}>
            Grant Permission
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>
          All {contacts.length} contacts
        </Text>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={onOpenFilters}
        >
          <Text style={{ fontSize: 14, color: PURPLE, fontWeight: '500', marginRight: 4 }}>
            Filter
          </Text>
          <Icon name="filter-list" size={20} color={PURPLE} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredContacts.map(contact => {
          const isSelected = !!selectedMembers.find(m => m.id === contact.id);
          return (
            <TouchableOpacity
              key={contact.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#e5e7eb',
              }}
              onPress={() => onToggleSelect(contact)}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#e3d8f7',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: '600', color: PURPLE }}>
                  {initialsFor(contact.name)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>
                  {contact.name}
                </Text>
                <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 2 }}>
                  {contact.phone}
                </Text>
              </View>
              {isSelected && (
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: '#e3d8f7',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name="check" size={16} color={PURPLE} />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
}

