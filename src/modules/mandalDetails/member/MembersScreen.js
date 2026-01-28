import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../../styles/appStyles';
import InviteMembersScreen from './InviteMembersScreen';
import RemoveMembersScreen from './RemoveMembersScreen';
import FiltersModal from '../components/FiltersModal';
import SearchInput from '../components/SearchInput';
import ScreenHeader from '../components/ScreenHeader';

const PURPLE = '#7b3cff';

export default function MembersScreen({ onBack, associationName = 'Vasant Kunj Cultural Association' }) {
  const [inviteVisible, setInviteVisible] = useState(false);
  const [removeVisible, setRemoveVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  const [requests] = useState([
    { id: '1', name: 'Sarvadnya Shinde', avatar: null },
    { id: '2', name: 'Aarav Patel', avatar: null },
    { id: '3', name: 'Priya Desai', avatar: null },
    { id: '4', name: 'Kavya Reddy', avatar: null },
    { id: '5', name: 'Rohan Verma', avatar: null },
  ]);

  const [members] = useState([
    { id: '1', name: 'Sarita Nair', designation: 'Chairman', avatar: null },
    { id: '2', name: 'Priya Sharma', designation: null, avatar: null },
    { id: '3', name: 'Arjun Reddy', designation: null, avatar: null },
    { id: '4', name: 'Divya Patel', designation: null, avatar: null },
    { id: '5', name: 'Amit Kapoor', designation: null, avatar: null },
    { id: '6', name: 'Anika Joshi', designation: 'President', avatar: null },
    { id: '7', name: 'Vikram Singh', designation: null, avatar: null },
    { id: '8', name: 'Deepa Menon', designation: 'Treasurer', avatar: null },
    { id: '9', name: 'Sneha Desai', designation: null, avatar: null },
    { id: '10', name: 'Rahul Khanna', designation: null, avatar: null },
  ]);

  const handleAcceptRequest = (requestId) => {
    Alert.alert('Success', 'Member request accepted successfully');
  };

  const handleDeclineRequest = (requestId) => {
    Alert.alert('Success', 'Member request declined');
  };

  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRequests = requests.filter(request =>
    request.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.screenRoot}>
      <ScreenHeader
        title="Members"
        onBack={onBack}
        showMenu={true}
        onMenuPress={() => setMenuVisible(!menuVisible)}
      />

      {menuVisible && (
        <>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'transparent',
            }}
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
          />
          <View
            style={{
              position: 'absolute',
              top: 60,
              right: 16,
              backgroundColor: '#ffffff',
              borderRadius: 8,
              paddingVertical: 8,
              minWidth: 180,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              zIndex: 1000,
            }}
          >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
            onPress={() => {
              setMenuVisible(false);
              setInviteVisible(true);
            }}
          >
            <Icon name="add" size={20} color={PURPLE} style={{ marginRight: 12 }} />
            <Text style={{ fontSize: 16, color: '#111827' }}>Add Members</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
            onPress={() => {
              setMenuVisible(false);
              setRemoveVisible(true);
            }}
          >
            <Icon name="close" size={20} color={PURPLE} style={{ marginRight: 12 }} />
            <Text style={{ fontSize: 16, color: '#111827' }}>Remove Members</Text>
          </TouchableOpacity>
        </View>
        </>
      )}

      <ScrollView
        style={styles.screenBody}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 12 }}>
          {associationName}
        </Text>

        <SearchInput value={searchQuery} onChangeText={setSearchQuery} />

        {/* Requests Section */}
        {requests.length > 0 && (
          <View style={{ marginBottom: 24 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>
                {requests.length} Requests
              </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 14, color: PURPLE, fontWeight: '500' }}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            {filteredRequests.slice(0, 5).map(request => (
              <View
                key={request.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: '#e5e7eb',
                }}
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
                    {getInitials(request.name)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>
                    {request.name}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: PURPLE,
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                    borderRadius: 8,
                    marginRight: 8,
                  }}
                  onPress={() => handleAcceptRequest(request.id)}
                >
                  <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '600' }}>
                    Accept
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeclineRequest(request.id)}
                  style={{ padding: 4 }}
                >
                  <Icon name="close" size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Members Section */}
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>
              {members.length} Members
            </Text>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => setFiltersVisible(true)}
            >
              <Text style={{ fontSize: 14, color: PURPLE, fontWeight: '500', marginRight: 4 }}>
                Filter
              </Text>
              <Icon name="filter-list" size={20} color={PURPLE} />
            </TouchableOpacity>
          </View>

          {filteredMembers.map(member => (
            <View
              key={member.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#e5e7eb',
              }}
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
                  {getInitials(member.name)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>
                  {member.name}
                </Text>
                {member.designation && (
                  <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 2 }}>
                    {member.designation}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <InviteMembersScreen
        visible={inviteVisible}
        onClose={() => setInviteVisible(false)}
        onSuccess={() => {
          setInviteVisible(false);
          Alert.alert(
            'Success',
            'You have invited a member. They will be added once they accept the request from DigiMandal App.'
          );
        }}
      />

      <RemoveMembersScreen
        visible={removeVisible}
        onClose={() => setRemoveVisible(false)}
        associationName={associationName}
      />

      <FiltersModal
        visible={filtersVisible}
        onClose={() => setFiltersVisible(false)}
      />
    </SafeAreaView>
  );
}

