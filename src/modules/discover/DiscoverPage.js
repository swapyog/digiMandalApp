import React, { useState, useMemo, useEffect } from 'react';
import { ScrollView, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Modal, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Layout from '../components/Layout';
import { homeStyles } from '../../styles/homeStyles';
import { DiscoverListItem, DiscoverFeaturedBanner, MandalResultItem, PersonResultItem } from './components';
import { PostCard } from '../home/components';
import { ViewAllLink } from '../../components';
import { useDebounce } from '../../hooks/useDebounce';

const PURPLE = '#7E48DC';

export default function DiscoverPage({ selectedTab, onTabChange }) {
  // Filter options - can be dynamically loaded from API or config
  const filterOptions = ['Mandals', 'People', 'Posts', 'Academies', 'Vendors', 'NGOs'];
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [isLoading, setIsLoading] = useState(false);
  
  // Advanced filter state - supports different filter types for different categories
  const [advancedFilters, setAdvancedFilters] = useState({
    location: null,
    size: null,
    category: null,
    date: null, // For posts
  });
  
  // Search Filters Modal state
  const [showSearchFiltersModal, setShowSearchFiltersModal] = useState(false);
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  // Location suggestions based on search
  const locationSuggestions = useMemo(() => {
    const allLocations = [
      'Vasant Vihar, Thane',
      'Vasai, Mumbai',
      'Vasant Kunj, Thane',
      'Vasmai Baug, Dombivli',
      'Lok Puram, Thane',
      'Vartak Nagar, Thane',
      'Sasani Vihar, Thane',
    ];
    
    if (!locationSearchQuery.trim()) {
      return allLocations;
    }
    
    const query = locationSearchQuery.toLowerCase();
    return allLocations.filter(loc => 
      loc.toLowerCase().includes(query)
    );
  }, [locationSearchQuery]);
  
  const sortOptions = ['A - Z', 'Z - A', 'Nearest First'];
  const categoryOptions = ['Sports', 'Music', 'Cultural'];

  // Featured event for the big banner card
  const featuredEvent = {
    id: 'featured',
    title: '2025 Vasant Vihar Navratri Fest',
    subtitle: 'Upcoming Event 25th Aug 2025',
    announcement:
      'Lalbaugh cha raja Visarjan road map is out! Check out to get visarjan darshan',
    imageUrl:
      'https://www.tripsavvy.com/thmb/Xv9pcv_c4lHQvMHrdsknjKI3sKQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1026012330-2ac53c0ab0d1442d89f10728241f58d6.jpg',
  };

  // Ganesh Visarjan event post (bottom of list)
  const ganeshEventPost = {
    id: 'ganesh-event',
    mandalName: 'Mandal Name',
    timeAgo: '5 hrs ago',
    text: 'Lalbaugh cha raja Visarjan road map is out! Check out to get visarjan darshan.',
    eventTag: 'Upcoming Event on 25th Aug 2025',
    hasMedia: true,
    mediaType: 'event',
    likes: null,
    dislikes: null,
    comments: null,
    avatarUrl:
      'https://img.freepik.com/free-vector/hinduism-vedic-mantra-om-symbol-design_1017-60812.jpg?semt=ais_hybrid&w=740&q=80',
  };

  // Dummy data for all categories
  const allMandals = [
    {
      id: '1',
      name: 'Ekta Mandal Name',
      location: 'Vasant Vihar, Thane',
      avatarUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp',
      size: 'Large',
      category: 'Cultural',
      registered: true,
    },
    {
      id: '2',
      name: 'Parivar Mitra Mandal',
      location: 'Lok Puram, Thane',
      avatarUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp',
      size: 'Medium',
      category: 'Cultural',
      registered: true,
    },
    {
      id: '3',
      name: 'Shourya Mitra Mandal',
      location: 'Vartak Nagar, Thane',
      avatarUrl: 'https://www.marathidesigns.com/storage/ganpati-logo-design-psd-1.webp',
      size: 'Small',
      category: 'Religious',
      registered: false,
    },
    {
      id: '4',
      name: 'Shourya Mitra Mandal',
      location: 'Vartak Nagar, Thane',
      size: 'Large',
      category: 'Cultural',
      registered: true,
    },
    {
      id: '5',
      name: 'Navratri Mandal',
      location: 'Sasani Vihar, Thane',
      size: 'Medium',
      category: 'Cultural',
      registered: false,
    },
    {
      id: '6',
      name: 'Ganesh Mandal',
      location: 'Lok Puram, Thane',
      size: 'Small',
      category: 'Religious',
      registered: true,
    },
  ];

  const allPeople = [
    {
      id: '1',
      name: 'Ekta Mandal Name',
      location: 'Vasant Vihar, Thane',
      avatarUrl: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg',
    },
    {
      id: '2',
      name: 'Parivar Mitra Mandal',
      location: 'Lok Puram, Thane',
      avatarUrl: 'https://i.pinimg.com/736x/99/8c/70/998c7017bbe8f1f42a9d257abeea98e9.jpg',
    },
    {
      id: '3',
      name: 'Shourya Mitra Mandal',
      location: 'Vartak Nagar, Thane',
      avatarUrl: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg',
    },
  ];

  const allPosts = [
    {
      id: '1',
      category: 'Mandals',
      title: 'Ekta Mandal celebrates Ganesh Chaturthi with grand festivities',
      description: 'Join us for the annual Ganesh Chaturthi celebration at Ekta Mandal. We have organized various cultural programs and events.',
      isVideo: false,
    },
    {
      id: '2',
      category: 'Academies',
      title: 'Parivar Mitra Mandal organizes community gathering',
      description: 'Parivar Mitra Mandal is hosting a community gathering this weekend. All members are invited to participate.',
      imageUrl: 'https://images.pexels.com/photos/2108874/pexels-photo-2108874.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVideo: true,
    },
    {
      id: '3',
      category: 'Mandals',
      title: 'Shourya Mitra Mandal announces new membership drive',
      description: 'Shourya Mitra Mandal is welcoming new members. Come join our community and be part of our cultural activities.',
      imageUrl: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVideo: false,
    },
    {
      id: '4',
      category: 'Vendors',
      title: 'Mitra Mandal vendor showcase event coming soon',
      description: 'Discover local vendors and their products at our upcoming showcase event organized by Mitra Mandal.',
      isVideo: false,
    },
    {
      id: '5',
      category: 'Mandals',
      title: 'Vasant Vihar Mandal organizes Navratri celebrations',
      description: 'Join Vasant Vihar Mandal for nine days of Navratri celebrations with dance, music, and traditional rituals.',
      imageUrl: 'https://images.pexels.com/photos/16012855/pexels-photo-16012855/free-photo-of-people-celebrating-navratri-festival.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVideo: false,
    },
    {
      id: '6',
      category: 'People',
      title: 'Community leaders from Lok Puram Mandal share their vision',
      description: 'Meet the community leaders who are working towards building a stronger and more connected neighborhood.',
      isVideo: true,
    },
    {
      id: '7',
      category: 'Academies',
      title: 'Music Academy announces new classes',
      description: 'Join our music academy for classical and modern music training sessions.',
      isVideo: false,
    },
    {
      id: '8',
      category: 'NGOs',
      title: 'Community NGO organizes charity event',
      description: 'Join us for a charity event organized by our local NGO to support the community.',
      imageUrl: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVideo: false,
    },
  ];

  // Feed posts for Discover (compact rows under banner) - shown when not searching
  const discoverPosts = [
    {
      id: '1',
      category: 'Mandals',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl: 'https://images.pexels.com/photos/16012855/pexels-photo-16012855/free-photo-of-people-celebrating-navratri-festival.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVideo: false,
    },
    {
      id: '2',
      category: 'Academies',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl: 'https://images.pexels.com/photos/2108874/pexels-photo-2108874.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVideo: true,
    },
    {
      id: '3',
      category: 'Vendors',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVideo: false,
    },
    {
      id: '4',
      category: 'Mandals',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isVideo: false,
    },
  ];

  // Reset advanced filters when filter selection changes
  useEffect(() => {
    setAdvancedFilters({
      location: null,
      size: null,
      category: null,
      date: null,
    });
    // Reset modal filters when filter changes
    setSelectedLocations([]);
    setSelectedSort(null);
    setSelectedCategories([]);
    setLocationSearchQuery('');
  }, [selectedFilter]);
  
  // Update modal filters when modal opens to reflect current advanced filters
  useEffect(() => {
    if (showSearchFiltersModal && advancedFilters.location) {
      if (!selectedLocations.includes(advancedFilters.location)) {
        setSelectedLocations([advancedFilters.location]);
      }
    }
  }, [showSearchFiltersModal]);

  // Simulate API call with debounced search
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    } else {
      setIsLoading(false);
    }
  }, [debouncedSearchQuery]);

  // Filter data based on search query
  const filteredMandals = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return [];
    const query = debouncedSearchQuery.toLowerCase();
    let filtered = allMandals.filter(mandal =>
      (mandal.name && mandal.name.toLowerCase().includes(query)) ||
      (mandal.location && mandal.location.toLowerCase().includes(query))
    );
    
    // Apply advanced filters if Mandals filter is selected
    if (selectedFilter === 'Mandals') {
      // Advanced filters applied via modal
    }
    
    return filtered;
  }, [debouncedSearchQuery, selectedFilter, advancedFilters]);

  const filteredPeople = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return [];
    const query = debouncedSearchQuery.toLowerCase();
    let filtered = allPeople.filter(person =>
      (person.name && person.name.toLowerCase().includes(query)) ||
      (person.location && person.location.toLowerCase().includes(query))
    );
    
    // Apply advanced filters if People filter is selected
    if (selectedFilter === 'People') {
      // Add People-specific filters if needed
    }
    
    return filtered;
  }, [debouncedSearchQuery, selectedFilter, advancedFilters]);

  const filteredPosts = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      // When not searching, filter by selected category
      if (selectedFilter && selectedFilter !== 'Mandals' && selectedFilter !== 'People' && selectedFilter !== 'Posts') {
        return discoverPosts.filter(item => item.category === selectedFilter);
      }
      return discoverPosts;
    }
    // When searching, filter posts
    const query = debouncedSearchQuery.toLowerCase();
    let filtered = allPosts.filter(post =>
      (post.title && post.title.toLowerCase().includes(query)) ||
      (post.description && post.description.toLowerCase().includes(query))
    );
    
    // Apply advanced filters if Posts filter is selected
    if (selectedFilter === 'Posts') {
      // Advanced filters applied via modal
    }
    
    return filtered;
  }, [debouncedSearchQuery, selectedFilter, advancedFilters]);

  // Filter Academies (which are posts with category 'Academies')
  const filteredAcademies = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return [];
    const query = debouncedSearchQuery.toLowerCase();
    let filtered = allPosts.filter(post =>
      post.category === 'Academies' &&
      ((post.title && post.title.toLowerCase().includes(query)) ||
      (post.description && post.description.toLowerCase().includes(query)))
    );
    
    // Apply advanced filters if Academies filter is selected
    if (selectedFilter === 'Academies') {
      // Advanced filters applied via modal
    }
    
    return filtered;
  }, [debouncedSearchQuery, selectedFilter, advancedFilters]);

  // Filter Vendors (which are posts with category 'Vendors')
  const filteredVendors = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return [];
    const query = debouncedSearchQuery.toLowerCase();
    let filtered = allPosts.filter(post =>
      post.category === 'Vendors' &&
      ((post.title && post.title.toLowerCase().includes(query)) ||
      (post.description && post.description.toLowerCase().includes(query)))
    );
    
    // Apply advanced filters if Vendors filter is selected
    if (selectedFilter === 'Vendors') {
      // Advanced filters applied via modal
    }
    
    return filtered;
  }, [debouncedSearchQuery, selectedFilter, advancedFilters]);

  // Filter NGOs (which are posts with category 'NGOs')
  const filteredNGOs = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return [];
    const query = debouncedSearchQuery.toLowerCase();
    let filtered = allPosts.filter(post =>
      post.category === 'NGOs' &&
      ((post.title && post.title.toLowerCase().includes(query)) ||
      (post.description && post.description.toLowerCase().includes(query)))
    );
    
    // Apply advanced filters if NGOs filter is selected
    if (selectedFilter === 'NGOs') {
      // Advanced filters applied via modal
    }
    
    return filtered;
  }, [debouncedSearchQuery, selectedFilter, advancedFilters]);

  const showSearchResults = debouncedSearchQuery.trim().length > 0;
  const showFilteredFeed = !showSearchResults && selectedFilter;

  const renderDiscoverPost = ({ item }) => <DiscoverListItem item={item} />;
  
  // Helper function to render advanced filters based on selected filter type
  const renderAdvancedFilters = () => {
    // No advanced filter chips to show - all filters are in the modal
    return null;
  };

  return (
    <Layout
      selectedTab={selectedTab}
      onTabChange={onTabChange}
      usePurpleHeader={true}
      headerTitle="Discover"
    >
      <ScrollView
        style={homeStyles.homeContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={homeStyles.discoverContainer}>
          {/* Search & filters */}
          <View style={homeStyles.discoverSearchContainer}>
            <View style={homeStyles.discoverSearchBox}>
              <TextInput
                placeholder="Search"
                placeholderTextColor="#9ca3af"
                style={homeStyles.discoverSearchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Icon name="search" size={24} color="#6b7280" />
            </View>

            <View style={homeStyles.discoverFiltersRow}>
              <TouchableOpacity 
                style={homeStyles.discoverFilterTuneButton}
                onPress={() => setShowSearchFiltersModal(true)}
              >
                <Icon name="tune" size={20} color="#6b7280" />
              </TouchableOpacity>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center' }}
                style={{ flex: 1 }}
              >
              {filterOptions.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    homeStyles.discoverFilterChip,
                      selectedFilter === filter && homeStyles.discoverFilterChipActive,
                  ]}
                    onPress={() => setSelectedFilter(selectedFilter === filter ? null : filter)}
                >
                  <Text
                    style={
                      selectedFilter === filter
                        ? homeStyles.discoverFilterTextActive
                        : homeStyles.discoverFilterText
                    }
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
              </ScrollView>
            </View>
          </View>

          {showSearchResults ? (
            // Search Results View
            <View>
              {isLoading ? (
                <View style={{ padding: 20, alignItems: 'center' }}>
                  <ActivityIndicator size="small" color={PURPLE} />
                  <Text style={{ marginTop: 8, color: '#6b7280', fontSize: 12 }}>
                    Searching...
                  </Text>
                </View>
              ) : (
                <>
                  {/* Advanced Filter UI - Show when any filter is selected and searching */}
                  {selectedFilter && (
                    <View style={homeStyles.advancedFiltersContainer}>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
                      >
                        {renderAdvancedFilters()}
                      </ScrollView>
                    </View>
                  )}

                  {/* Show only selected category when filter is active, otherwise show all */}
                  {selectedFilter === 'Mandals' ? (
                    // Only show Mandals list when Mandals filter is selected
                    <View style={homeStyles.searchResultsSection}>
                      <View style={homeStyles.searchResultsHeader}>
                        <Text style={homeStyles.searchResultsTitle}>
                          {filteredMandals.length > 0 ? 'All Mandal Results' : 'Mandals'}
                        </Text>
                      </View>
                      {filteredMandals.length > 0 ? (
                        filteredMandals.map((mandal) => (
                          <MandalResultItem key={mandal.id} item={mandal} />
                        ))
                      ) : (
                        <View style={{ padding: 40, alignItems: 'center' }}>
                          <Text style={{ color: '#6b7280', fontSize: 14 }}>No mandals found</Text>
                        </View>
                      )}
                    </View>
                  ) : selectedFilter === 'People' ? (
                    // Only show People list when People filter is selected
                    <View style={homeStyles.searchResultsSection}>
                      <View style={homeStyles.searchResultsHeader}>
                        <Text style={homeStyles.searchResultsTitle}>
                          {filteredPeople.length > 0 ? 'All People Results' : 'People'}
                        </Text>
                      </View>
                      {filteredPeople.length > 0 ? (
                        filteredPeople.map((person) => (
                          <PersonResultItem key={person.id} item={person} />
                        ))
                      ) : (
                        <View style={{ padding: 40, alignItems: 'center' }}>
                          <Text style={{ color: '#6b7280', fontSize: 14 }}>No people found</Text>
                        </View>
                      )}
                    </View>
                  ) : selectedFilter === 'Posts' ? (
                    // Only show Posts list when Posts filter is selected
                    <View style={homeStyles.searchResultsSection}>
                      <View style={homeStyles.searchResultsHeader}>
                        <Text style={homeStyles.searchResultsTitle}>
                          {filteredPosts.length > 0 ? 'All Post Results' : 'Posts'}
                        </Text>
                      </View>
                      {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                          <DiscoverListItem key={post.id} item={post} />
                        ))
                      ) : (
                        <View style={{ padding: 40, alignItems: 'center' }}>
                          <Text style={{ color: '#6b7280', fontSize: 14 }}>No posts found</Text>
                        </View>
                      )}
                    </View>
                  ) : selectedFilter === 'Academies' ? (
                    // Only show Academies list when Academies filter is selected
                    <View style={homeStyles.searchResultsSection}>
                      <View style={homeStyles.searchResultsHeader}>
                        <Text style={homeStyles.searchResultsTitle}>
                          {filteredAcademies.length > 0 ? 'All Academy Results' : 'Academies'}
                        </Text>
                      </View>
                      {filteredAcademies.length > 0 ? (
                        filteredAcademies.map((academy) => (
                          <DiscoverListItem key={academy.id} item={academy} />
                        ))
                      ) : (
                        <View style={{ padding: 40, alignItems: 'center' }}>
                          <Text style={{ color: '#6b7280', fontSize: 14 }}>No academies found</Text>
                        </View>
                      )}
                    </View>
                  ) : selectedFilter === 'Vendors' ? (
                    // Only show Vendors list when Vendors filter is selected
                    <View style={homeStyles.searchResultsSection}>
                      <View style={homeStyles.searchResultsHeader}>
                        <Text style={homeStyles.searchResultsTitle}>
                          {filteredVendors.length > 0 ? 'All Vendor Results' : 'Vendors'}
                        </Text>
                      </View>
                      {filteredVendors.length > 0 ? (
                        filteredVendors.map((vendor) => (
                          <DiscoverListItem key={vendor.id} item={vendor} />
                        ))
                      ) : (
                        <View style={{ padding: 40, alignItems: 'center' }}>
                          <Text style={{ color: '#6b7280', fontSize: 14 }}>No vendors found</Text>
                        </View>
                      )}
                    </View>
                  ) : selectedFilter === 'NGOs' ? (
                    // Only show NGOs list when NGOs filter is selected
                    <View style={homeStyles.searchResultsSection}>
                      <View style={homeStyles.searchResultsHeader}>
                        <Text style={homeStyles.searchResultsTitle}>
                          {filteredNGOs.length > 0 ? 'All NGO Results' : 'NGOs'}
                        </Text>
                      </View>
                      {filteredNGOs.length > 0 ? (
                        filteredNGOs.map((ngo) => (
                          <DiscoverListItem key={ngo.id} item={ngo} />
                        ))
                      ) : (
                        <View style={{ padding: 40, alignItems: 'center' }}>
                          <Text style={{ color: '#6b7280', fontSize: 14 }}>No NGOs found</Text>
                        </View>
                      )}
                    </View>
                  ) : (
                    <>
                      {/* Mandals Section */}
                      {filteredMandals.length > 0 && (
                        <View style={homeStyles.searchResultsSection}>
                          <View style={homeStyles.searchResultsHeader}>
                            <Text style={homeStyles.searchResultsTitle}>Mandals</Text>
                            <TouchableOpacity style={homeStyles.showAllButton}>
                              <Text style={homeStyles.showAllButtonText}>Show all Mandal Results</Text>
                            </TouchableOpacity>
                          </View>
                          {filteredMandals.slice(0, 3).map((mandal) => (
                            <MandalResultItem key={mandal.id} item={mandal} />
                          ))}
                        </View>
                      )}

                      {/* People Section */}
                      {filteredPeople.length > 0 && (
                        <View style={homeStyles.searchResultsSection}>
                          <View style={homeStyles.searchResultsHeader}>
                            <Text style={homeStyles.searchResultsTitle}>People</Text>
                            <TouchableOpacity style={homeStyles.showAllButton}>
                              <Text style={homeStyles.showAllButtonText}>Show all People Results</Text>
                            </TouchableOpacity>
                          </View>
                          {filteredPeople.slice(0, 3).map((person) => (
                            <PersonResultItem key={person.id} item={person} />
                          ))}
                        </View>
                      )}

                      {/* Posts Section */}
                      {filteredPosts.length > 0 && (
                        <View style={homeStyles.searchResultsSection}>
                          <View style={homeStyles.searchResultsHeader}>
                            <Text style={homeStyles.searchResultsTitle}>Posts</Text>
                            <TouchableOpacity style={homeStyles.showAllButton}>
                              <Text style={homeStyles.showAllButtonText}>Show all Post Results</Text>
                            </TouchableOpacity>
                          </View>
                          {filteredPosts.slice(0, 3).map((post) => (
                            <DiscoverListItem key={post.id} item={post} />
                          ))}
                        </View>
                      )}
                    </>
                  )}

                  {/* Loading more indicator - only show when no specific filter is selected */}
                  {!selectedFilter && (filteredMandals.length > 3 || filteredPeople.length > 3 || filteredPosts.length > 3) && (
                    <View style={homeStyles.loadingMoreText}>
                      <ActivityIndicator size="small" color="#6b7280" />
                      <Text style={homeStyles.loadingMoreTextContent}>Getting more results....</Text>
                    </View>
                  )}

                  {/* No results - only show when no specific filter is selected */}
                  {!selectedFilter && filteredMandals.length === 0 && filteredPeople.length === 0 && filteredPosts.length === 0 && (
                    <View style={{ padding: 40, alignItems: 'center' }}>
                      <Text style={{ color: '#6b7280', fontSize: 14 }}>No results found</Text>
                    </View>
                  )}
                </>
              )}
            </View>
          ) : (
            // Normal Discover Feed View
            <>
          {/* Top announcement */}
          <View style={homeStyles.discoverAnnouncement}>
            <Text style={homeStyles.discoverAnnouncementTitle}>
              {featuredEvent.announcement}
            </Text>
            <View style={homeStyles.eventTag}>
              <Text style={homeStyles.eventTagText}>{featuredEvent.subtitle}</Text>
            </View>
          </View>

          {/* Featured festival banner */}
          <DiscoverFeaturedBanner featuredEvent={featuredEvent} />

          {/* Discover feed list */}
              {(showFilteredFeed || !selectedFilter) && (
          <View style={homeStyles.discoverFeedSection}>
            <FlatList
              data={filteredPosts}
              renderItem={renderDiscoverPost}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
              )}
          {/* Ganesh Visarjan event card at the bottom */}
              {!selectedFilter && (
          <PostCard item={ganeshEventPost} hideHeader={true} hideJoinButton={true} hideActions={true} />
              )}
            </>
          )}
        </View>
      </ScrollView>
      
      {/* Search Filters Modal */}
      <Modal
        visible={showSearchFiltersModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSearchFiltersModal(false)}
      >
        <View style={homeStyles.searchFiltersModalOverlay}>
          <TouchableOpacity 
            style={homeStyles.searchFiltersModalBackdrop}
            activeOpacity={1}
            onPress={() => setShowSearchFiltersModal(false)}
          />
          <View style={homeStyles.searchFiltersModalContent}>
            <Text style={homeStyles.searchFiltersModalTitle}>Search Filters</Text>
            
            <ScrollView 
              style={homeStyles.searchFiltersScrollView}
              showsVerticalScrollIndicator={false}
            >
              {/* Location Section */}
              <View style={homeStyles.searchFiltersSection}>
                <Text style={homeStyles.searchFiltersSectionTitle}>Location</Text>
                
                <View style={homeStyles.searchFiltersLocationInputContainer}>
                  <TextInput
                    style={homeStyles.searchFiltersLocationInput}
                    placeholder="Search Location"
                    placeholderTextColor="#9ca3af"
                    value={locationSearchQuery}
                    onChangeText={setLocationSearchQuery}
                  />
                  <Icon name="search" size={20} color="#6b7280" />
                </View>
                
                <TouchableOpacity 
                  style={homeStyles.currentLocationButton}
                  onPress={() => {
                    const currentLocation = 'Your Current Location';
                    if (!selectedLocations.includes(currentLocation)) {
                      setSelectedLocations(prev => [...prev, currentLocation]);
                    }
                  }}
                >
                  <Icon name="my-location" size={20} color={PURPLE} />
                  <Text style={homeStyles.currentLocationButtonText}>Your Current Location</Text>
                </TouchableOpacity>
                
                {/* Selected Locations Tags */}
                {selectedLocations.length > 0 && (
                  <View style={homeStyles.selectedLocationsContainer}>
                    {selectedLocations.map((location, index) => (
                      <View key={index} style={homeStyles.selectedLocationTag}>
                        <Text style={homeStyles.selectedLocationTagText}>{location}</Text>
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedLocations(prev => prev.filter((_, i) => i !== index));
                          }}
                        >
                          <Icon name="close" size={16} color="#ffffff" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
                
                {/* Location Suggestions */}
                {locationSearchQuery.trim() && locationSuggestions.length > 0 && (
                  <View style={homeStyles.locationSuggestionsContainer}>
                    {locationSuggestions.map((location, index) => (
                      <TouchableOpacity
                        key={index}
                        style={homeStyles.locationSuggestionItem}
                        onPress={() => {
                          if (!selectedLocations.includes(location)) {
                            setSelectedLocations(prev => [...prev, location]);
                            setLocationSearchQuery('');
                          }
                        }}
                      >
                        <Text style={homeStyles.locationSuggestionText}>{location}</Text>
                        <Icon name="keyboard-arrow-right" size={20} color="#6b7280" />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              
              {/* Sort Section */}
              <View style={homeStyles.searchFiltersSection}>
                <Text style={homeStyles.searchFiltersSectionTitle}>Sort</Text>
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={homeStyles.searchFilterOption}
                    onPress={() => setSelectedSort(selectedSort === option ? null : option)}
                  >
                    <Text style={homeStyles.searchFilterOptionText}>{option}</Text>
                    <View style={homeStyles.radioButton}>
                      {selectedSort === option && <View style={homeStyles.radioButtonSelected} />}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              
              {/* Categories Section */}
              <View style={homeStyles.searchFiltersSection}>
                <Text style={homeStyles.searchFiltersSectionTitle}>Categories</Text>
                {categoryOptions.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={homeStyles.searchFilterOption}
                    onPress={() => {
                      setSelectedCategories(prev => 
                        prev.includes(category) 
                          ? prev.filter(c => c !== category)
                          : [...prev, category]
                      );
                    }}
                  >
                    <Text style={homeStyles.searchFilterOptionText}>{category}</Text>
                    <View style={homeStyles.radioButton}>
                      {selectedCategories.includes(category) && <View style={homeStyles.radioButtonSelected} />}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            
            {/* Modal Actions */}
            <View style={homeStyles.searchFiltersModalActions}>
              <TouchableOpacity
                style={homeStyles.searchFiltersCancelButton}
                onPress={() => setShowSearchFiltersModal(false)}
              >
                <Text style={homeStyles.searchFiltersCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={homeStyles.searchFiltersApplyButton}
                onPress={() => {
                  // Apply filters - update advancedFilters state
                  if (selectedLocations.length > 0) {
                    // Extract actual location names (remove "Your Current Location" if present)
                    const actualLocations = selectedLocations.filter(loc => loc !== 'Your Current Location');
                    setAdvancedFilters(prev => ({
                      ...prev,
                      location: actualLocations.length > 0 ? actualLocations[0] : null,
                      // Store all locations if needed for future use
                    }));
                  } else {
                    setAdvancedFilters(prev => ({
                      ...prev,
                      location: null,
                    }));
                  }
                  
                  // Apply sort and categories if needed
                  // You can extend this based on your filtering logic
                  
                  setShowSearchFiltersModal(false);
                }}
              >
                <Text style={homeStyles.searchFiltersApplyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Layout>
  );
}
