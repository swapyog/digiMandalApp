import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { homeStyles } from '../../styles/homeStyles';

const bottomNavItems = [
  { id: 'home', iconName: 'home', label: 'Home' },
  { id: 'discover', iconName: 'search', label: 'Discover' },
  { id: 'create', iconName: 'add-circle', label: 'Create' },
  { id: 'events', iconName: 'event', label: 'Events' },
  { id: 'profile', iconName: 'person-outline', label: 'Profile' },
];

export default function BottomNavigation({ selectedTab, onTabChange }) {
  return (
    <View style={homeStyles.bottomNav}>
      {bottomNavItems.map(item => (
        <TouchableOpacity
          key={item.id}
          style={homeStyles.bottomNavItem}
          onPress={() => onTabChange(item.id)}
        >
          <Icon
            name={item.iconName}
            size={24}
            color={selectedTab === item.id ? '#7E48DC' : '#6b7280'}
            style={homeStyles.bottomNavIcon}
          />
          <Text
            style={[
              homeStyles.bottomNavLabel,
              selectedTab === item.id && homeStyles.bottomNavLabelActive,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

