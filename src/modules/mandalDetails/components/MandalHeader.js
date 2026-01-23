import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { adminDashboardStyles } from '../../../styles/adminDashboardStyles';

export default function MandalHeader({ mandalData, onBack }) {
  return (
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
          <Text style={adminDashboardStyles.mandalName} numberOfLines={3}>
            {mandalData.name}
          </Text>
          <Text style={adminDashboardStyles.mandalSubtitle}>
            {mandalData.subtitle}
          </Text>
        </View>
      </View>
    </View>
  );
}

