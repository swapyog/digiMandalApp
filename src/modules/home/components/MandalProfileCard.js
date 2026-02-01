import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { homeStyles } from '../../../styles/homeStyles';

export default function MandalProfileCard({ item, onPress }) {
  return (
    <TouchableOpacity 
      style={homeStyles.mandalProfileCard} 
      onPress={() => onPress && onPress(item)}
      activeOpacity={0.7}
    >
      <View style={homeStyles.mandalProfileImageContainer}>
        <View
          style={[
            homeStyles.mandalProfileImage,
            item.members
              ? homeStyles.mandalProfileImageWithMembers
              : homeStyles.mandalProfileImageWithoutMembers,
          ]}
        >
          {item.imageUrl ? (
            <Image
              source={{ uri: item.imageUrl }}
              style={homeStyles.mandalProfileImageContent}
              resizeMode="cover"
            />
          ) : (
            <Text style={homeStyles.mandalProfileEmoji}>{item.image}</Text>
          )}
        </View>
        {item.members && (
          <View style={homeStyles.mandalProfileBadge}>
            <Text style={homeStyles.mandalProfileBadgeText}>{item.members}</Text>
          </View>
        )}
      </View>
      <Text style={homeStyles.mandalProfileName} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

