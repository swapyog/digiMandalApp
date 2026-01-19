import React from 'react';
import { View, Text, Image } from 'react-native';
import { homeStyles } from '../../../styles/homeStyles';

export default function MandalProfileCard({ item }) {
  return (
    <View style={homeStyles.mandalProfileCard}>
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
    </View>
  );
}

