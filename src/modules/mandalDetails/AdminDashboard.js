import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { adminDashboardStyles } from '../../styles/adminDashboardStyles';

const PURPLE = '#7E48DC';

export default function AdminDashboard({ onBack }) {
  // Sample mandal data
  const mandalData = {
    logo: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp',
    name: 'Vasant Kunj Cultural Association, at Thane with very very long name',
    subtitle: 'Cultural & Festival Mandal',
    isPublic: true,
    about: 'We celebrate our culture, unity, and creativity with passion and pride—ensuring every member feels connected, involved, and celebrated.',
  };

  // Sample members data
  const members = [
    { id: '1', avatar: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg' },
    { id: '2', avatar: 'https://i.pinimg.com/736x/99/8c/70/998c7017bbe8f1f42a9d257abeea98e9.jpg' },
    { id: '3', avatar: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg' },
    { id: '4', avatar: 'https://i.pinimg.com/736x/99/8c/70/998c7017bbe8f1f42a9d257abeea98e9.jpg' },
    { id: '5', avatar: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg' },
    { id: '6', avatar: 'https://i.pinimg.com/736x/99/8c/70/998c7017bbe8f1f42a9d257abeea98e9.jpg' },
    { id: '7', avatar: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg' },
    { id: '8', avatar: 'https://i.pinimg.com/736x/99/8c/70/998c7017bbe8f1f42a9d257abeea98e9.jpg' },
    { id: '9', avatar: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg' },
    { id: '10', avatar: 'https://i.pinimg.com/736x/99/8c/70/998c7017bbe8f1f42a9d257abeea98e9.jpg' },
  ];
  const totalMembers = 1021;

  // Sample gallery images
  const galleryImages = [
    { id: '1', uri: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
    { id: '2', uri: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
    { id: '3', uri: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
    { id: '4', uri: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
    { id: '5', uri: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
    { id: '6', uri: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
    { id: '7', uri: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
    { id: '8', uri: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
  ];
  const totalPhotos = 214;

  // Donations data
  const donations = {
    total: '1,00,000',
    today: '5000',
    totalDonors: '1000',
  };

  // Services data
  const services = [
    { id: '1', title: 'Create Event', icon: 'event', color: '#E8D5FF' },
    { id: '2', title: 'Volunteer', icon: 'handshake', color: '#FFE5F0' },
    { id: '3', title: 'Member Ma...', icon: 'people', color: '#E5F5E8' },
    { id: '4', title: 'Notice board', icon: 'dashboard', color: '#FFF5E5' },
  ];

  const renderMember = ({ item }) => (
    <View style={adminDashboardStyles.memberAvatarContainer}>
      <Image
        source={{ uri: item.avatar }}
        style={adminDashboardStyles.memberAvatar}
      />
    </View>
  );

  const renderGalleryImage = ({ item }) => (
    <TouchableOpacity style={adminDashboardStyles.galleryImageContainer}>
      <Image
        source={{ uri: item.uri }}
        style={adminDashboardStyles.galleryImage}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={adminDashboardStyles.container}>
      {/* Custom Header */}
      <View style={adminDashboardStyles.header}>
        <View style={adminDashboardStyles.headerTop}>
          <TouchableOpacity onPress={onBack} style={adminDashboardStyles.backButton}>
            <Icon name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={adminDashboardStyles.shareButton}>
            <Icon name="share" size={24} color="#ffffff" />
          </TouchableOpacity>
          {mandalData.isPublic && (
            <Text style={adminDashboardStyles.publicText}>Public</Text>
          )}
        </View>

        {/* Mandal Info Section */}
        <View style={adminDashboardStyles.mandalInfoSection}>
          <Image
            source={{ uri: mandalData.logo }}
            style={adminDashboardStyles.mandalLogo}
          />
          <View style={adminDashboardStyles.mandalInfo}>
            <Text style={adminDashboardStyles.mandalName} numberOfLines={2}>
              {mandalData.name}
            </Text>
            <Text style={adminDashboardStyles.mandalSubtitle}>
              {mandalData.subtitle}
            </Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        style={adminDashboardStyles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Members Section */}
        <View style={adminDashboardStyles.section}>
          <View style={adminDashboardStyles.sectionTitleRow}>
            <Text style={adminDashboardStyles.sectionTitleWithCount}>Members</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={adminDashboardStyles.sectionCountText}>
                +{totalMembers}
              </Text>
              <Icon name="chevron-right" size={16} color={PURPLE} />
            </TouchableOpacity>
          </View>
          <View style={adminDashboardStyles.membersContainer}>
            <FlatList
              data={members}
              renderItem={renderMember}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={adminDashboardStyles.membersList}
              initialNumToRender={8}
              removeClippedSubviews={false}
            />
          </View>
        </View>

        {/* About Section */}
        <View style={adminDashboardStyles.section}>
          <Text style={adminDashboardStyles.sectionTitle}>About</Text>
          <Text style={adminDashboardStyles.aboutText}>{mandalData.about}</Text>
        </View>

        {/* Photo Gallery Section */}
        <View style={adminDashboardStyles.section}>
          <View style={adminDashboardStyles.sectionTitleRow}>
            <Text style={adminDashboardStyles.sectionTitleWithCount}>Photo Gallery</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={adminDashboardStyles.sectionCountText}>
                {totalPhotos}
              </Text>
              <Icon name="chevron-right" size={16} color={PURPLE} />
            </TouchableOpacity>
          </View>
          <View style={adminDashboardStyles.galleryContainer}>
            <FlatList
              data={galleryImages}
              renderItem={renderGalleryImage}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={adminDashboardStyles.galleryList}
              initialNumToRender={4}
              scrollEnabled={true}
              nestedScrollEnabled={true}
            />
          </View>
        </View>

        {/* Donations Section */}
        <View style={adminDashboardStyles.section}>
          <Text style={adminDashboardStyles.sectionTitle}>Donations</Text>
          <View style={adminDashboardStyles.donationsContainer}>
            <View style={adminDashboardStyles.donationCard}>
              <Text style={adminDashboardStyles.donationLabel}>Total Donation</Text>
              <Text style={adminDashboardStyles.donationAmount}>₹ {donations.total}</Text>
            </View>
            <View style={adminDashboardStyles.donationCard}>
              <Text style={adminDashboardStyles.donationLabel}>Donation Today</Text>
              <Text style={adminDashboardStyles.donationAmount}>₹ {donations.today}</Text>
            </View>
            <View style={adminDashboardStyles.donationCard}>
              <Text style={adminDashboardStyles.donationLabel}>Total Donor</Text>
              <Text style={adminDashboardStyles.donationAmount}>{donations.totalDonors}</Text>
            </View>
          </View>
        </View>

        {/* Services Section */}
        <View style={adminDashboardStyles.section}>
          <Text style={adminDashboardStyles.sectionTitle}>Services</Text>
          <View style={adminDashboardStyles.servicesContainer}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[
                  adminDashboardStyles.serviceCard,
                  { backgroundColor: service.color },
                ]}
              >
                <Icon name={service.icon} size={32} color={PURPLE} />
                <Text style={adminDashboardStyles.serviceTitle}>{service.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

