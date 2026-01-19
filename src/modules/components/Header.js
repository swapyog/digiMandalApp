import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { homeStyles } from '../../styles/homeStyles';

export default function Header() {
  return (
    <View style={homeStyles.homeHeader}>
      <View style={homeStyles.homeHeaderLeft}>
        <View style={homeStyles.homeLogo}>
          <Image
            source={require('../../public/images/logo.png')}
            style={homeStyles.homeLogoImage}
            resizeMode="contain"
          />
        </View>
        <Text style={homeStyles.homeLogoText}>DigiMandal</Text>
      </View>
      <View style={homeStyles.homeHeaderRight}>
        <TouchableOpacity style={homeStyles.homeHeaderIcon}>
          <Icon name="notifications-none" size={26} color="#0E0E12" />
        </TouchableOpacity>
        <TouchableOpacity style={homeStyles.homeHeaderIcon}>
          <Icon name="menu" size={26} color="#0E0E12" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

