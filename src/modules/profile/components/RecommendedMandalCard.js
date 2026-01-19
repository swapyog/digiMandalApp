import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { profileStyles } from '../../../styles/profileStyles';
import { JoinButton } from '../../../components';

export default function RecommendedMandalCard({ mandal }) {
  return (
    <View style={profileStyles.recommendedMandalCard}>
      <Image
        source={{ uri: mandal.imageUrl }}
        style={profileStyles.recommendedMandalAvatar}
      />
      <View style={profileStyles.recommendedMandalInfo}>
        <Text style={profileStyles.recommendedMandalName}>{mandal.name}</Text>
        <Text style={profileStyles.recommendedMandalDetails}>
          {mandal.category} • {mandal.members} Members
        </Text>
        <Text style={profileStyles.recommendedMandalLocation}>{mandal.location}</Text>
      </View>
      <JoinButton />
    </View>
  );
}

