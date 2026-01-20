import React from 'react';
import { ScrollView, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { homeStyles } from '../../styles/homeStyles';
import Layout from '../components/Layout';
import { MandalProfileCard, PostCard } from './components';

export default function HomePage({ selectedTab, onTabChange, onNavigateToAdminDashboard }) {

  // Sample Mandal profiles datanpx react-native start --reset-cache

  const mandalProfiles = [
    { id: '1', name: 'Mandal Name', members: '12', imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp' },
    { id: '2', name: 'Mandal Name', members: '3', imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp' },
    { id: '3', name: 'बालगणेश', imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp' },
    { id: '4', name: 'Mandal Name', imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp' },
    { id: '5', name: 'Mandal Name', imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp' },
    { id: '6', name: 'Mandal Name', imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp' },
    { id: '7', name: 'Mandal Name', imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp' },
    { id: '8', name: 'Mandal Name', imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp' },
    { id: '9', name: 'Mandal Name', imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp' },
    { id: '10', name: 'Mandal Name', imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp' },
  ];

  // Sample posts data
  const posts = [
    {
      id: '1',
      mandalName: 'Area/ Mandal Name',
      timeAgo: '5 hrs ago',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      userName: 'User Name',
      isTopVoice: true,
      hasMedia: true,
      mediaType: 'image',
      avatarUrl: 'https://img.freepik.com/free-vector/colorful-mandala-illustration-with-geometric-floral-design_779267-3035.jpg?semt=ais_hybrid&w=740&q=80',
      likes: null,
      dislikes: null,
      comments: null,
    },
    {
      id: '2',
      mandalName: 'Area/ Mandal Name',
      timeAgo: '5 hrs ago',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...',
      userName: 'User Name',
      isTopVoice: true,
      avatarUrl: 'https://i.pinimg.com/736x/99/8c/70/998c7017bbe8f1f42a9d257abeea98e9.jpg',
      likes: '3.5K',
      dislikes: '433',
      comments: '934',
    },
    {
      id: '3',
      mandalName: 'Mandal Name',
      timeAgo: '5 hrs ago',
      text: 'Lalbaugh cha raja Visarjan road map is out! Check out to get visarjan darshan.',
      eventTag: 'Upcoming Event 25th Aug 2025',
      hasMedia: true,
      mediaType: 'event',
      avatarUrl: 'https://img.freepik.com/free-vector/hinduism-vedic-mantra-om-symbol-design_1017-60812.jpg?semt=ais_hybrid&w=740&q=80',
      likes: null,
      dislikes: null,
      comments: null,
    },
  ];

  const renderMandalProfile = ({ item }) => <MandalProfileCard item={item} />;

  const renderPost = ({ item }) => <PostCard item={item} />;

  return (
    <Layout selectedTab={selectedTab} onTabChange={onTabChange}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* Mandal Profiles Section */}
        <View style={homeStyles.mandalProfilesSection}>
          <FlatList
            data={mandalProfiles}
            renderItem={renderMandalProfile}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            // contentContainerStyle={homeStyles.mandalProfilesList}
          />
        </View>
        
        <View>
          <TouchableOpacity
            onPress={() => {
              if (onNavigateToAdminDashboard) {
                onNavigateToAdminDashboard();
              }
            }}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827', paddingHorizontal: 16, paddingVertical: 12 }}>
              Latest Events
            </Text>
          </TouchableOpacity>
        </View>

        {/* Posts Feed */}
        <View style={homeStyles.postsFeed}>
          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </Layout>
  );
}

