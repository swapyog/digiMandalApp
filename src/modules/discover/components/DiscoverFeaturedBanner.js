import React from 'react';
import { View, Text, Image } from 'react-native';
import { homeStyles } from '../../../styles/homeStyles';

export default function DiscoverFeaturedBanner({ featuredEvent }) {
  return (
    <View style={homeStyles.discoverFeaturedCard}>
      <View style={homeStyles.discoverFeaturedImageWrapper}>
        <Image
          source={{ uri: featuredEvent.imageUrl }}
          style={homeStyles.discoverFeaturedImage}
        />
        <View style={homeStyles.discoverFeaturedOverlay}>
          <Text style={homeStyles.discoverFeaturedYear}>2025</Text>
          <Text style={homeStyles.discoverFeaturedTitle}>
            VASANT VIHAR NAVRATRI FEST
          </Text>
        </View>
      </View>
    </View>
  );
}


