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
import Layout from '../components/Layout';
import { homeStyles } from '../../styles/homeStyles';
import { profileStyles } from '../../styles/profileStyles';
import { MandalProfileCard, PostCard } from '../home/components';
import { RecommendedMandalCard } from './components';
import { ViewAllLink } from '../../components';

const PURPLE = '#7E48DC';

export default function ProfilePage({ selectedTab, onTabChange }) {
  // Sample user data
  const userProfile = {
    name: 'Swapnil Srivastava',
    location: 'Thane',
    isVerified: true,
    occupation: 'Graphic Designer',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    stats: {
      posts: 24,
      comments: 12,
      tagged: 45,
      reactions: 5,
    },
    avatarUrl: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg',
  };

  // Sample mandals data
  const myMandals = [
    { id: '1', name: 'Mandal Name', members: '103', imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp' },
    { id: '2', name: 'Mandal Name', members: '3', imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp' },
    { id: '3', name: 'Mandal Name', imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp' },
    { id: '4', name: 'Mandal Name', imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp' },
    { id: '5', name: 'Mandal Name', imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp' },
    { id: '6', name: 'Mandal Name', imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp' },
  ];

  // Sample posts data
  const myPosts = [
    {
      id: '1',
      mandalName: 'Area/ Mandal Name',
      timeAgo: '3 hrs ago',
      userName: 'User Name',
      isTopVoice: true,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam',
      hasMedia: true,
      mediaType: 'image',
      likes: null,
      dislikes: null,
      comments: null,
      avatarUrl: 'https://i.pinimg.com/736x/99/8c/70/998c7017bbe8f1f42a9d257abeea98e9.jpg',
    },
    {
      id: '2',
      mandalName: 'Area/ Mandal Name',
      timeAgo: '3 hrs ago',
      userName: 'User Name',
      isTopVoice: true,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam',
      hasMedia: true,
      mediaType: 'image',
      likes: '3.3K',
      dislikes: '433',
      comments: '594',
      avatarUrl: 'https://i.pinimg.com/736x/99/8c/70/998c7017bbe8f1f42a9d257abeea98e9.jpg',
    },
  ];

  // Recommended mandals
  const recommendedMandals = [
    {
      id: '1',
      name: 'Mandal Name',
      category: 'Cultural',
      members: '7k',
      location: 'Sasani Vihar, Thane',
      imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp',
    },
    {
      id: '2',
      name: 'Mandal Name',
      category: 'Cultural',
      members: '7k',
      location: 'Sasani Vihar, Thane',
      imageUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp',
    },
  ];

  // Recommended events
  const recommendedEvents = [
    {
      id: '1',
      mandalName: 'Mandal Name',
      timeAgo: '3 hrs ago',
      text: 'Lalbaugh cha raja Visarjan road map is out! Check out to get visarjan darshan.',
      eventTag: 'Upcoming Event on 29th Aug 2025',
      hasMedia: true,
      mediaType: 'event',
      likes: null,
      dislikes: null,
      comments: null,
      avatarUrl: 'https://img.freepik.com/free-vector/hinduism-vedic-mantra-om-symbol-design_1017-60812.jpg?semt=ais_hybrid&w=740&q=80',
    },
  ];

  const renderMandal = ({ item }) => <MandalProfileCard item={item} />;
  const renderPost = ({ item }) => <PostCard item={item} />;

  return (
    <Layout selectedTab={selectedTab} onTabChange={onTabChange} usePurpleHeader={true} headerTitle="Profile">
      <ScrollView style={homeStyles.homeContent} showsVerticalScrollIndicator={false}>
        {/* User Profile Section */}
        <View style={profileStyles.profileSection}>
          <View style={profileStyles.profileHeader}>
            <Image
              source={{ uri: userProfile.avatarUrl }}
              style={profileStyles.profileAvatar}
            />
            <View style={profileStyles.profileInfo}>
              <Text style={profileStyles.profileName}>{userProfile.name}</Text>
              <Text style={profileStyles.profileLocation}>{userProfile.location}</Text>
              {userProfile.isVerified && (
                <View style={profileStyles.verifiedBadge}>
                  <Text style={profileStyles.verifiedText}>Aadhar Verified</Text>
                  <Icon name="check-circle" size={16} color="#ffffff" />
                </View>
              )}
              
            </View>
          </View>
          <Text style={profileStyles.profileOccupation}>{userProfile.occupation}</Text>
          <Text style={profileStyles.profileBio}>{userProfile.bio}</Text>

          <View style={profileStyles.profileButtonsRow}>
            <TouchableOpacity style={profileStyles.profileButton}>
              <Icon name="star" size={16} style={{color: '#FF8A5F'}} />
              <Text style={profileStyles.profileButtonText}>Top Voice</Text>
            </TouchableOpacity>
            <TouchableOpacity style={profileStyles.profileButton}>
              <Icon name="notifications" size={16} style={{color: '#0093E1'}} />
              <Text style={profileStyles.influencialButtonText}>Most Influencial</Text>
            </TouchableOpacity>
          </View>

          <View style={profileStyles.statsRow}>
            <View style={profileStyles.statItem}>
              <Text style={profileStyles.statNumber}>{userProfile.stats.posts}</Text>
              <Text style={profileStyles.statLabel}>Posts</Text>
            </View>
            <View style={profileStyles.statItem}>
              <Text style={profileStyles.statNumber}>{userProfile.stats.comments}</Text>
              <Text style={profileStyles.statLabel}>Comments</Text>
            </View>
            <View style={profileStyles.statItem}>
              <Text style={profileStyles.statNumber}>{userProfile.stats.tagged}</Text>
              <Text style={profileStyles.statLabel}>Tagged</Text>
            </View>
            <View style={profileStyles.statItem}>
              <Text style={profileStyles.statNumber}>{userProfile.stats.reactions}</Text>
              <Text style={profileStyles.statLabel}>Reactions</Text>
            </View>
          </View>

          <View style={profileStyles.profileActionsRow}>
            <TouchableOpacity style={profileStyles.actionButton}>
              <Text style={profileStyles.actionButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={profileStyles.actionButton}>
              <Text style={profileStyles.actionButtonText}>Share Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* My Mandals Section */}
        <View style={profileStyles.section}>
          <View style={profileStyles.sectionHeader}>
            <Text style={profileStyles.sectionTitle}>My Mandals</Text>
            {myMandals.length > 0 && (
              <TouchableOpacity>
                <Text style={profileStyles.sectionLink}>
                  <Text style={profileStyles.sectionLinkText}>2 Updates •</Text> <Text color={PURPLE} style={{fontWeight: '600'}}>33 <Icon name="chevron-right" size={16} color={PURPLE} /></Text>
                </Text>
              </TouchableOpacity>
            )}
            {myMandals.length === 0 && (
              <TouchableOpacity>
                <Text style={profileStyles.sectionLink}>
                  <Text style={profileStyles.sectionLinkText}>0</Text> <Icon name="chevron-right" size={16} color={PURPLE} />
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {myMandals.length === 0 ? (
            <View style={profileStyles.exploreCard}>
              <View style={profileStyles.exploreCardContent}>
                <Text style={profileStyles.exploreCardTitle}>Explore & Join Mandals</Text>
                <Text style={profileStyles.exploreCardDescription}>
                  Join Mandals, get hyper local updates and more...
                </Text>
                <TouchableOpacity style={profileStyles.exploreNowButton}>
                  <Text style={profileStyles.exploreNowButtonText}>Explore Now</Text>
                </TouchableOpacity>
              </View>
              <View style={profileStyles.exploreCardGraphic}>
                <Image source={require('../../public/images/explorenow.png')} style={profileStyles.exploreCardGraphicImage} />
              </View>
            </View>
          ) : (
            <View style={profileStyles.mandalsList}>
              <FlatList
                data={myMandals}
                renderItem={renderMandal}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={homeStyles.mandalProfilesList}
              />
            </View>
          )}
        </View>

        {/* My Posts Section */}
        <View style={profileStyles.section}>
          <View style={profileStyles.sectionHeader}>
            <Text style={profileStyles.sectionTitle}>My Posts</Text>
            {myPosts.length > 0 && (
              <ViewAllLink />
            )}
          </View>
          {myPosts.length === 0 ? (
            <TouchableOpacity style={profileStyles.emptyPostCard}>
              <View style={profileStyles.emptyPostIconsRow}>
                <View>
                  <Icon name="videocam" size={20} color="#7E48DC" />
                </View>
                <View>
                  <Icon name="picture-as-pdf" size={20} color="#7E48DC" />
                </View>
                <View>
                  <Icon name="image" size={20} color="#7E48DC" />
                </View>
                <View>
                  <Icon name="audiotrack" size={20} color="#7E48DC" />
                </View>
              </View>
              <Text style={profileStyles.emptyPostText}>+ Add your first post</Text>
            </TouchableOpacity>
          ) : (
            <View style={profileStyles.postsFeedsection}>
              <FlatList
                data={myPosts}
                renderItem={renderPost}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </View>
          )}
        </View>

        {/* You might like Section */}
        <View style={profileStyles.section}>
          <View style={profileStyles.sectionHeader}>
            <Text style={profileStyles.sectionTitle}>You might like</Text>
            <ViewAllLink />
          </View>
          {recommendedMandals.map(mandal => (
            <RecommendedMandalCard key={mandal.id} mandal={mandal} />
          ))}
        </View>

        {/* Recommended Events Section */}
        <View style={profileStyles.section}>
          <View style={profileStyles.sectionHeader}>
            <Text style={profileStyles.sectionTitle}>Recommended Events</Text>
            <ViewAllLink />
          </View>
          <View style={profileStyles.postsFeedsection}>
            <FlatList
              data={recommendedEvents}
              renderItem={renderPost}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
