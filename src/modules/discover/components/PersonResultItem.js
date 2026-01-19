import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { homeStyles } from '../../../styles/homeStyles';

export default function PersonResultItem({ item }) {
  return (
    <TouchableOpacity style={homeStyles.mandalResultItem}>
      <View style={homeStyles.mandalResultAvatar}>
        {item.avatarUrl ? (
          <Image
            source={{ uri: item.avatarUrl }}
            style={homeStyles.mandalResultAvatarImage}
            resizeMode="cover"
          />
        ) : (
          <View style={homeStyles.mandalResultAvatarPlaceholder}>
            <Text style={homeStyles.mandalResultAvatarText}>
              {item.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>
      <View style={homeStyles.mandalResultInfo}>
        <Text style={homeStyles.mandalResultName}>{item.name}</Text>
        <Text style={homeStyles.mandalResultLocation}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );
}

