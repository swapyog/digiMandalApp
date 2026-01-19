import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { homeStyles } from '../../../styles/homeStyles';

export default function DiscoverListItem({ item }) {
  const hasImage = !!item.imageUrl;

  return (
    <View style={homeStyles.discoverListItem}>
      <View style={homeStyles.discoverListText}>
        <Text style={homeStyles.discoverListTitle}>{item.title}</Text>
        <Text style={homeStyles.discoverListDescription} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
      {hasImage && (
        <View style={homeStyles.discoverListImageWrapper}>
          <Image
            source={{ uri: item.imageUrl }}
            style={homeStyles.discoverListImage}
          />
          {item.isVideo && (
            <View style={homeStyles.discoverListPlayIcon}>
              <Icon name="play-arrow" size={20} color="#ffffff" />
            </View>
          )}
        </View>
      )}
    </View>
  );
}


